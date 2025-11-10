import { Request, Response, NextFunction } from 'express';
import { settingsService } from '../services/settings.service';

export class SettingsController {
  async getSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const result = await settingsService.getSettings(userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const result = await settingsService.updateSettings(userId, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const settingsController = new SettingsController();
