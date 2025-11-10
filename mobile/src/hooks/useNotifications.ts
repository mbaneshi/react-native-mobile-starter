import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState, AppDispatch } from '../store';
import {
  fetchNotifications,
  markAsRead,
  markAllAsRead,
  registerDevice,
  fetchPreferences,
  updatePreferences,
  clearError,
  addNotification,
} from '../store/slices/notificationsSlice';
import { NotificationPreferences, Notification } from '../types';

export const useNotifications = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, unreadCount, total, preferences, loading, error, updating } = useSelector(
    (state: RootState) => state.notifications
  );

  const getNotifications = useCallback(
    async (limit = 50, offset = 0) => {
      try {
        await dispatch(fetchNotifications({ limit, offset })).unwrap();
        return { success: true };
      } catch (error: any) {
        return { success: false, error };
      }
    },
    [dispatch]
  );

  const markNotificationAsRead = useCallback(
    async (notificationId: string) => {
      try {
        await dispatch(markAsRead(notificationId)).unwrap();
        return { success: true };
      } catch (error: any) {
        return { success: false, error };
      }
    },
    [dispatch]
  );

  const markAllNotificationsAsRead = useCallback(async () => {
    try {
      await dispatch(markAllAsRead()).unwrap();
      return { success: true };
    } catch (error: any) {
      return { success: false, error };
    }
  }, [dispatch]);

  const registerDeviceForNotifications = useCallback(
    async (deviceToken: string, platform: 'ios' | 'android') => {
      try {
        await dispatch(registerDevice({ deviceToken, platform })).unwrap();
        return { success: true };
      } catch (error: any) {
        return { success: false, error };
      }
    },
    [dispatch]
  );

  const getNotificationPreferences = useCallback(async () => {
    try {
      await dispatch(fetchPreferences()).unwrap();
      return { success: true };
    } catch (error: any) {
      return { success: false, error };
    }
  }, [dispatch]);

  const updateNotificationPreferences = useCallback(
    async (prefs: Partial<NotificationPreferences>) => {
      try {
        await dispatch(updatePreferences(prefs)).unwrap();
        return { success: true };
      } catch (error: any) {
        return { success: false, error };
      }
    },
    [dispatch]
  );

  const addNewNotification = useCallback(
    (notification: Notification) => {
      dispatch(addNotification(notification));
    },
    [dispatch]
  );

  const clearNotificationError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    notifications,
    unreadCount,
    total,
    preferences,
    loading,
    error,
    updating,
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    registerDeviceForNotifications,
    getNotificationPreferences,
    updateNotificationPreferences,
    addNewNotification,
    clearNotificationError,
  };
};
