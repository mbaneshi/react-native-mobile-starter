import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { notificationService } from '../../services/notification.service';
import { Notification, NotificationPreferences, ApiError } from '../../types';

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  total: number;
  preferences: NotificationPreferences | null;
  loading: boolean;
  error: ApiError | null;
  updating: boolean;
}

const initialState: NotificationsState = {
  notifications: [],
  unreadCount: 0,
  total: 0,
  preferences: null,
  loading: false,
  error: null,
  updating: false,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetch',
  async ({ limit = 50, offset = 0 }: { limit?: number; offset?: number }, { rejectWithValue }) => {
    try {
      const response = await notificationService.getNotifications(limit, offset);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { error: 'Failed to fetch notifications' }
      );
    }
  }
);

export const markAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId: string, { rejectWithValue }) => {
    try {
      await notificationService.markAsRead(notificationId);
      return notificationId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { error: 'Failed to mark notification as read' }
      );
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try {
      await notificationService.markAllAsRead();
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { error: 'Failed to mark all notifications as read' }
      );
    }
  }
);

export const registerDevice = createAsyncThunk(
  'notifications/registerDevice',
  async (
    { deviceToken, platform }: { deviceToken: string; platform: 'ios' | 'android' },
    { rejectWithValue }
  ) => {
    try {
      await notificationService.registerDevice(deviceToken, platform);
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { error: 'Failed to register device' }
      );
    }
  }
);

export const fetchPreferences = createAsyncThunk(
  'notifications/fetchPreferences',
  async (_, { rejectWithValue }) => {
    try {
      const response = await notificationService.getPreferences();
      return response.preferences;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { error: 'Failed to fetch notification preferences' }
      );
    }
  }
);

export const updatePreferences = createAsyncThunk(
  'notifications/updatePreferences',
  async (preferences: Partial<NotificationPreferences>, { rejectWithValue }) => {
    try {
      const response = await notificationService.updatePreferences(preferences);
      return response.preferences;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { error: 'Failed to update notification preferences' }
      );
    }
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      state.total += 1;
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.notifications;
        state.total = action.payload.total;
        state.unreadCount = action.payload.unreadCount;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiError;
      })
      // Mark as read
      .addCase(markAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find((n) => n.id === action.payload);
        if (notification && !notification.read) {
          notification.read = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      .addCase(markAsRead.rejected, (state, action) => {
        state.error = action.payload as ApiError;
      })
      // Mark all as read
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications = state.notifications.map((n) => ({ ...n, read: true }));
        state.unreadCount = 0;
      })
      .addCase(markAllAsRead.rejected, (state, action) => {
        state.error = action.payload as ApiError;
      })
      // Register device
      .addCase(registerDevice.rejected, (state, action) => {
        state.error = action.payload as ApiError;
      })
      // Fetch preferences
      .addCase(fetchPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload;
      })
      .addCase(fetchPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiError;
      })
      // Update preferences
      .addCase(updatePreferences.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updatePreferences.fulfilled, (state, action) => {
        state.updating = false;
        state.preferences = action.payload;
      })
      .addCase(updatePreferences.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload as ApiError;
      });
  },
});

export const { clearError, addNotification, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
