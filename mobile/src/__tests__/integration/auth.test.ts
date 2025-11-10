import { configureStore } from '@reduxjs/toolkit';
import authReducer, { login, register, logout } from '../../store/slices/authSlice';
import { authService } from '../../services/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('../../services/auth.service');
jest.mock('@react-native-async-storage/async-storage');

describe('Auth Integration Tests', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
    jest.clearAllMocks();
  });

  describe('Login Flow', () => {
    it('should complete full login flow', async () => {
      const mockResponse = {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User',
          emailVerified: true,
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
      };

      (authService.login as jest.Mock).mockResolvedValue(mockResponse);
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

      await store.dispatch(login({ email: 'test@example.com', password: 'password' }));

      const state = store.getState().auth;
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockResponse.user);
      expect(state.accessToken).toBe(mockResponse.accessToken);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);

      expect(AsyncStorage.setItem).toHaveBeenCalledTimes(3);
    });

    it('should handle login failure', async () => {
      const mockError = { error: 'Invalid credentials' };
      (authService.login as jest.Mock).mockRejectedValue({ response: { data: mockError } });

      await store.dispatch(login({ email: 'test@example.com', password: 'wrong' }));

      const state = store.getState().auth;
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBe(null);
      expect(state.error).toEqual(mockError);
    });
  });

  describe('Registration Flow', () => {
    it('should complete full registration flow', async () => {
      const mockResponse = { message: 'Registration successful' };
      (authService.register as jest.Mock).mockResolvedValue(mockResponse);

      await store.dispatch(
        register({ email: 'test@example.com', password: 'password', name: 'Test User' })
      );

      const state = store.getState().auth;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });
  });

  describe('Logout Flow', () => {
    it('should complete full logout flow', async () => {
      // Set up authenticated state
      store = configureStore({
        reducer: { auth: authReducer },
        preloadedState: {
          auth: {
            user: {
              id: '1',
              email: 'test@example.com',
              name: 'Test User',
              emailVerified: true,
              createdAt: '2024-01-01',
              updatedAt: '2024-01-01',
            },
            accessToken: 'token',
            refreshToken: 'refresh',
            isAuthenticated: true,
            loading: false,
            error: null,
          },
        },
      });

      (authService.logout as jest.Mock).mockResolvedValue({ message: 'Logged out' });
      (AsyncStorage.multiRemove as jest.Mock).mockResolvedValue(undefined);

      await store.dispatch(logout());

      const state = store.getState().auth;
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBe(null);
      expect(state.accessToken).toBe(null);
      expect(state.refreshToken).toBe(null);

      expect(AsyncStorage.multiRemove).toHaveBeenCalled();
    });
  });
});
