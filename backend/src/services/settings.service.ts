import { prisma } from '../config/database';
import { AppError } from '../utils/errors';

class SettingsService {
  async getSettings(userId: string) {
    const settings = await prisma.userSettings.findUnique({
      where: { userId },
    });

    if (!settings) {
      throw new AppError('Settings not found', 404);
    }

    return { settings };
  }

  async updateSettings(userId: string, data: {
    darkMode?: boolean;
    language?: string;
    emailNotifications?: boolean;
    pushNotifications?: boolean;
    smsNotifications?: boolean;
    quietHoursStart?: string;
    quietHoursEnd?: string;
  }) {
    const settings = await prisma.userSettings.update({
      where: { userId },
      data,
    });

    return { settings };
  }
}

export const settingsService = new SettingsService();
