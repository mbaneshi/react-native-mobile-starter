import { prisma } from '../config/database';
import { AppError } from '../utils/errors';
import * as admin from 'firebase-admin';
import { config } from '../config';

// Initialize Firebase Admin
if (config.firebase.projectId) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: config.firebase.projectId,
      privateKey: config.firebase.privateKey,
      clientEmail: config.firebase.clientEmail,
    }),
  });
}

class NotificationService {
  async getNotifications(userId: string, limit: number = 50, offset: number = 0) {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    const total = await prisma.notification.count({
      where: { userId },
    });

    const unreadCount = await prisma.notification.count({
      where: { userId, read: false },
    });

    return {
      notifications,
      total,
      unreadCount,
    };
  }

  async markAsRead(userId: string, notificationId: string) {
    const notification = await prisma.notification.findFirst({
      where: { id: notificationId, userId },
    });

    if (!notification) {
      throw new AppError('Notification not found', 404);
    }

    await prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });

    return { message: 'Notification marked as read' };
  }

  async markAllAsRead(userId: string) {
    await prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });

    return { message: 'All notifications marked as read' };
  }

  async registerDeviceToken(userId: string, token: string, platform: 'ios' | 'android') {
    // Deactivate any existing tokens for this device
    await prisma.deviceToken.updateMany({
      where: { token },
      data: { active: false },
    });

    // Create or update device token
    const deviceToken = await prisma.deviceToken.upsert({
      where: { token },
      create: {
        userId,
        token,
        platform,
        active: true,
      },
      update: {
        userId,
        active: true,
      },
    });

    return { message: 'Device token registered successfully' };
  }

  async sendPushNotification(
    userId: string,
    title: string,
    body: string,
    data?: any
  ) {
    // Store notification in database
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        body,
        data,
      },
    });

    // Get user's active device tokens
    const deviceTokens = await prisma.deviceToken.findMany({
      where: { userId, active: true },
    });

    // Send push notifications via FCM
    const promises = deviceTokens.map(async (deviceToken) => {
      try {
        await admin.messaging().send({
          token: deviceToken.token,
          notification: {
            title,
            body,
          },
          data: {
            notificationId: notification.id,
            ...(data && { ...data }),
          },
        });
      } catch (error: any) {
        // If token is invalid, deactivate it
        if (error.code === 'messaging/invalid-registration-token' ||
            error.code === 'messaging/registration-token-not-registered') {
          await prisma.deviceToken.update({
            where: { id: deviceToken.id },
            data: { active: false },
          });
        }
      }
    });

    await Promise.all(promises);

    return { notification };
  }

  async getPreferences(userId: string) {
    const settings = await prisma.userSettings.findUnique({
      where: { userId },
    });

    if (!settings) {
      throw new AppError('Settings not found', 404);
    }

    return {
      preferences: {
        emailNotifications: settings.emailNotifications,
        pushNotifications: settings.pushNotifications,
        smsNotifications: settings.smsNotifications,
        quietHoursStart: settings.quietHoursStart,
        quietHoursEnd: settings.quietHoursEnd,
      },
    };
  }

  async updatePreferences(userId: string, preferences: {
    emailNotifications?: boolean;
    pushNotifications?: boolean;
    smsNotifications?: boolean;
    quietHoursStart?: string;
    quietHoursEnd?: string;
  }) {
    const settings = await prisma.userSettings.update({
      where: { userId },
      data: preferences,
    });

    return {
      preferences: {
        emailNotifications: settings.emailNotifications,
        pushNotifications: settings.pushNotifications,
        smsNotifications: settings.smsNotifications,
        quietHoursStart: settings.quietHoursStart,
        quietHoursEnd: settings.quietHoursEnd,
      },
    };
  }
}

export const notificationService = new NotificationService();
