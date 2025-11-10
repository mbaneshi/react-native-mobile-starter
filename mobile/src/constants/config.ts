import { Platform } from 'react-native';

// In production, replace these with your actual environment variables
export const API_BASE_URL = __DEV__
  ? Platform.OS === 'ios'
    ? 'http://localhost:3000/api'
    : 'http://10.0.2.2:3000/api'
  : 'https://api.yourapp.com/api';

export const API_TIMEOUT = 10000;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: '@access_token',
  REFRESH_TOKEN: '@refresh_token',
  USER: '@user',
  SETTINGS: '@settings',
};

export const SCREEN_NAMES = {
  // Auth screens
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  RESET_PASSWORD: 'ResetPassword',

  // Main screens
  HOME: 'Home',
  PROFILE: 'Profile',
  EDIT_PROFILE: 'EditProfile',
  SETTINGS: 'Settings',
  NOTIFICATIONS: 'Notifications',
  CHANGE_PASSWORD: 'ChangePassword',
};

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
