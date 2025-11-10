import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';

const router = Router();

// All user routes require authentication
router.use(authenticate);

router.get('/me', userController.getProfile);
router.patch('/me', userController.updateProfile);
router.post('/avatar', upload.single('avatar'), userController.uploadAvatar);
router.post('/change-password', userController.changePassword);
router.delete('/me', userController.deleteAccount);

export default router;
