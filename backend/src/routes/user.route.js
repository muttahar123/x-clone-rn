import express from 'express';
import { getUserProfile, syncUser, updateProfile } from '../controllers/user.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get("/profile/:username", getUserProfile);
router.post("/sync", protectedRoute, syncUser);
router.post("/me", protectedRoute, getCurrentUser);
router.put("/profile", protectedRoute, updateProfile);

export default router;