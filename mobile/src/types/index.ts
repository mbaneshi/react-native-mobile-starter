export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  data?: any;
  read: boolean;
  createdAt: string;
}

export interface UserSettings {
  id: string;
  userId: string;
  darkMode: boolean;
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
}

export interface ApiError {
  error: string;
  details?: any;
}
