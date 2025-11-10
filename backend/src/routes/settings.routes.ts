import { Router } from 'express';
import { settingsController } from '../controllers/settings.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// All settings routes require authentication
router.use(authenticate);

router.get('/', settingsController.getSettings);
router.patch('/', settingsController.updateSettings);

export default router;
