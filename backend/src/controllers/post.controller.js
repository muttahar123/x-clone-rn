import asynchandler from "express-async-handler";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { getAuth } from "@clerk/express";
import cloudinary from "../config/cloudinary.js";

export const getPosts = asynchandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilepicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username firstName lastName profilepicture",
      },
    });
  res.status(200).json({ posts });
});

export const getPost = asynchandler(async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId)
    .populate("user", "username firstName lastName profilepicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username firstName lastName profilepicture",
      },
    });
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.status(200).json({ post });
});

export const getUserPosts = asynchandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found" });

  const posts = await Post.find({ user: user._id })
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilepicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username firstName lastName profilepicture",
      },
    });
  res.status(200).json({ posts });
});

export const createPost = asynchandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { content } = req.body;
  const imageFile = req.file;

  if (!content && !imageFile) {
    return res
      .status(400)
      .json({ message: "Post content or image is required" });
  }
  const user = await User.findOne({ clerkId: userId });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  let imageUrl = "";
  if (imageFile) {
    //upload image to cloudinary
    try {
      //convert buffer to base64 for cloudinary upload
      const base64Image = `data:${
        imageFile.mimetype
      };base64,${imageFile.buffer.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "social_media_posts",
        resource_type: "image",
        transformation: [
          { width: 800, height: 800, crop: "limit" },
          { quality: "auto" },
          { format: "auto" },
        ],
      });
      imageUrl = uploadResponse.secure_url;
    } catch (uploadError) {
      console.error("Error uploading image to Cloudinary:", uploadError);
      return res.status(500).json({ message: "Failed to upload image" });
    }
  }
    const post = await Post.create({
    user: user._id,
    content: content || "",
    image: imageUrl,
  });
  res.status(201).json({ message: "Post created successfully", post });
});

export const likePost = asynchandler(async (req, res) => {
  const { postId } = req.params;
  const { userId } = getAuth(req);

  const user = await User.findOne({ clerkId: userId });
  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ message: "Post not found" });

  // Check if user has already liked the post
  if (!user || !post) {
    return res.status(400).json({ message: "user or post not found" });
  }

  const isLiked = post.likes.includes(user._id);
  if (isLiked) {
    // Unlike the post
   await Post.findByIdAndUpdate(postId, {
      $pull: { likes: user._id },
    });
  } else {
    // Like the post
   await Post.findByIdAndUpdate(postId, {
      $push: { likes: user._id },
    });

    // create notification if not liking own post
    if (post.user.toString() !== user._id.toString()) {
      await Notification.create({
        from: user._id,
        to: post.user,
        type: "like",
        post: post._id,
      });
    }
  }

  res.status(200).json({ message: isLiked ? "Post unliked successfully" : "Post liked successfully", post });
});
