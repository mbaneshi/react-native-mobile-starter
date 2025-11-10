import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState, AppDispatch } from '../store';
import { login, register, logout, clearError } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, loading, error, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  const loginUser = useCallback(
    async (email: string, password: string) => {
      try {
        await dispatch(login({ email, password })).unwrap();
        return { success: true };
      } catch (error: any) {
        return { success: false, error };
      }
    },
    [dispatch]
  );

  const registerUser = useCallback(
    async (email: string, password: string, name: string) => {
      try {
        await dispatch(register({ email, password, name })).unwrap();
        return { success: true };
      } catch (error: any) {
        return { success: false, error };
      }
    },
    [dispatch]
  );

  const logoutUser = useCallback(async () => {
    try {
      await dispatch(logout()).unwrap();
      return { success: true };
    } catch (error: any) {
      return { success: false, error };
    }
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    accessToken,
    loginUser,
    registerUser,
    logoutUser,
    clearAuthError,
  };
};
