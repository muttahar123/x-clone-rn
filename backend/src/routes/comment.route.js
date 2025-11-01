import express from 'express';
import { createComment, deleteComment, getComments } from '../controllers/comment.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

//public routes
router.get('/post/:postId', getComments);

//protected routes
router.post('/post/:postId', protectedRoute, createComment);
router.delete('/:commentId', protectedRoute, deleteComment);

export default router;