import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import notificationRoutes from './notification.routes';
import settingsRoutes from './settings.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/notifications', notificationRoutes);
router.use('/settings', settingsRoutes);

export default router;
