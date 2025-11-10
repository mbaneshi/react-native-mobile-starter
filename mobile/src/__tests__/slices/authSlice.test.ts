import authReducer, { login, register, logout, clearError } from '../../store/slices/authSlice';
import { authService } from '../../services/auth.service';

jest.mock('../../services/auth.service');
jest.mock('@react-native-async-storage/async-storage');

describe('authSlice', () => {
  const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('login', () => {
    it('should handle login.pending', () => {
      const action = { type: login.pending.type };
      const state = authReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle login.fulfilled', () => {
      const mockPayload = {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        user: { id: '1', email: 'test@example.com', name: 'Test User' },
      };
      const action = { type: login.fulfilled.type, payload: mockPayload };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockPayload.user);
      expect(state.accessToken).toBe(mockPayload.accessToken);
      expect(state.refreshToken).toBe(mockPayload.refreshToken);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should handle login.rejected', () => {
      const mockError = { error: 'Invalid credentials' };
      const action = { type: login.rejected.type, payload: mockError };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toEqual(mockError);
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('register', () => {
    it('should handle register.pending', () => {
      const action = { type: register.pending.type };
      const state = authReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle register.fulfilled', () => {
      const action = { type: register.fulfilled.type };
      const state = authReducer(initialState, action);
      expect(state.loading).toBe(false);
    });

    it('should handle register.rejected', () => {
      const mockError = { error: 'Registration failed' };
      const action = { type: register.rejected.type, payload: mockError };
      const state = authReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toEqual(mockError);
    });
  });

  describe('logout', () => {
    it('should handle logout.fulfilled', () => {
      const loggedInState = {
        ...initialState,
        user: { id: '1', email: 'test@example.com', name: 'Test' } as any,
        accessToken: 'token',
        refreshToken: 'refresh',
        isAuthenticated: true,
      };
      const action = { type: logout.fulfilled.type };
      const state = authReducer(loggedInState, action);

      expect(state.user).toBe(null);
      expect(state.accessToken).toBe(null);
      expect(state.refreshToken).toBe(null);
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('clearError', () => {
    it('should clear error', () => {
      const stateWithError = {
        ...initialState,
        error: { error: 'Some error' },
      };
      const state = authReducer(stateWithError, clearError());
      expect(state.error).toBe(null);
    });
  });
});
