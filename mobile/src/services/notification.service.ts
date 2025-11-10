import { apiService } from './api.service';
import { Notification, NotificationPreferences } from '../types';

class NotificationService {
  async getNotifications(limit = 50, offset = 0): Promise<{
    notifications: Notification[];
    total: number;
    unreadCount: number;
  }> {
    const response = await apiService.get('/notifications', {
      params: { limit, offset },
    });
    return response.data;
  }

  async markAsRead(notificationId: string) {
    const response = await apiService.patch(`/notifications/${notificationId}/read`);
    return response.data;
  }

  async markAllAsRead() {
    const response = await apiService.post('/notifications/mark-all-read');
    return response.data;
  }

  async registerDevice(deviceToken: string, platform: 'ios' | 'android') {
    const response = await apiService.post('/notifications/register', {
      deviceToken,
      platform,
    });
    return response.data;
  }

  async getPreferences(): Promise<{ preferences: NotificationPreferences }> {
    const response = await apiService.get<{ preferences: NotificationPreferences }>(
      '/notifications/preferences'
    );
    return response.data;
  }

  async updatePreferences(
    preferences: Partial<NotificationPreferences>
  ): Promise<{ preferences: NotificationPreferences }> {
    const response = await apiService.patch<{ preferences: NotificationPreferences }>(
      '/notifications/preferences',
      preferences
    );
    return response.data;
  }
}

export const notificationService = new NotificationService();
