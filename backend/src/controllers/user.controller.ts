import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import {
  updateProfileSchema,
  changePasswordSchema,
  deleteAccountSchema,
} from '../validators/user.validator';

export class UserController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const result = await userService.getProfile(userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const validatedData = updateProfileSchema.parse(req.body);
      const result = await userService.updateProfile(userId, validatedData);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const result = await userService.uploadAvatar(userId, file);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const validatedData = changePasswordSchema.parse(req.body);
      const result = await userService.changePassword(
        userId,
        validatedData.currentPassword,
        validatedData.newPassword
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const validatedData = deleteAccountSchema.parse(req.body);
      const result = await userService.deleteAccount(userId, validatedData.password);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
