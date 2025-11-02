import express from 'express';
import {  deleteNotification, getNotifications } from '../controllers/notification.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

//protected routes
router.post('/', protectedRoute, getNotifications);
router.delete('/:notificationId', protectedRoute, deleteNotification);


export default router;