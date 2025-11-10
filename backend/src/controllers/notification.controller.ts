import { Request, Response, NextFunction } from 'express';
import { notificationService } from '../services/notification.service';

export class NotificationController {
  async getNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;

      const result = await notificationService.getNotifications(userId, limit, offset);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      const result = await notificationService.markAsRead(userId, id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async markAllAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const result = await notificationService.markAllAsRead(userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async registerDevice(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { deviceToken, platform } = req.body;

      const result = await notificationService.registerDeviceToken(
        userId,
        deviceToken,
        platform
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getPreferences(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const result = await notificationService.getPreferences(userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updatePreferences(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const result = await notificationService.updatePreferences(userId, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const notificationController = new NotificationController();
