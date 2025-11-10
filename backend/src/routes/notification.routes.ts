import { Router } from 'express';
import { notificationController } from '../controllers/notification.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// All notification routes require authentication
router.use(authenticate);

router.get('/', notificationController.getNotifications);
router.patch('/:id/read', notificationController.markAsRead);
router.post('/mark-all-read', notificationController.markAllAsRead);
router.post('/register', notificationController.registerDevice);
router.get('/preferences', notificationController.getPreferences);
router.patch('/preferences', notificationController.updatePreferences);

export default router;
