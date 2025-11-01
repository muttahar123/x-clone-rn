import asynchandler from "express-async-handler";
import { getAuth } from "@clerk/express";
import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export const getComments = asynchandler(async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ post: postId })
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilepicture");
  res.status(200).json({ comments });
});

export const createComment = asynchandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { postId } = req.params;
  const { content } = req.body;

  if(!content || content.trim() === ""){
    return res.status(400).json({ message: "Content is required" });
  }

  const user = await User.findOne({ clerkId: userId });

    const post = await Post.findById(postId);
    if(!user || !post){
        return  res.status(404).json({ message: "User or Post not found" });
    }
    
    const comment = await Comment.create({
    user: user._id,
    post: post._id,
    content,
  }); 

//link the comment to the post
  await Post.findByIdAndUpdate(postId, {
    $push: { comments: comment._id },
  });

//create notification for post owner
    if(post.user.toString() !== user._id.toString()){
        await Notification.create({
            from: user._id,
            to: post.user,
            type: "comment",
            post: post.id,
            comment: comment._id,
        });
    }

  res.status(201).json({ comment });
});

export const deleteComment = asynchandler(async (req, res) => { 
    const { userId } = getAuth(req);    
    const { commentId } = req.params;

    const user = await User.findOne({ clerkId: userId });
    const comment = await Comment.findById(commentId);
    if(!user || !comment){
        return res.status(404).json({ message: "User or Comment not found" });
    }
    if(comment.user.toString() !== user._id.toString()){
        return res.status(403).json({ message: "You are not authorized to delete this comment" });
    }

    //remove comment from post's comments array
    await Post.findByIdAndUpdate(comment.post, {
        $pull: { comments: comment.id }
    });

    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Comment deleted successfully" });
});
