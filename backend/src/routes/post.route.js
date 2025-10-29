import express from "express";
import { createPost, getPost, getPosts, getUserPosts, likePost } from "../controllers/post.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

//public routes
router.get("/", getPosts);
router.get("/:postId", getPost);
router.get("/user/:username", getUserPosts);

//protected routes
router.post("/", protectedRoute, upload.single("image"), createPost);
router.post("/:postId/like", protectedRoute, likePost);


export default router;