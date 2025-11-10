import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState, AppDispatch } from '../store';
import {
  fetchProfile,
  updateProfile,
  uploadAvatar,
  changePassword,
  deleteAccount,
  clearError,
} from '../store/slices/userSlice';

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error, updating } = useSelector((state: RootState) => state.user);

  const getProfile = useCallback(async () => {
    try {
      await dispatch(fetchProfile()).unwrap();
      return { success: true };
    } catch (error: any) {
      return { success: false, error };
    }
  }, [dispatch]);

  const updateUserProfile = useCallback(
    async (data: { name?: string; avatarUrl?: string }) => {
      try {
        await dispatch(updateProfile(data)).unwrap();
        return { success: true };
      } catch (error: any) {
        return { success: false, error };
      }
    },
    [dispatch]
  );

  const uploadUserAvatar = useCallback(
    async (file: FormData) => {
      try {
        await dispatch(uploadAvatar(file)).unwrap();
        return { success: true };
      } catch (error: any) {
        return { success: false, error };
      }
    },
    [dispatch]
  );

  const changeUserPassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      try {
        await dispatch(changePassword({ currentPassword, newPassword })).unwrap();
        return { success: true };
      } catch (error: any) {
        return { success: false, error };
      }
    },
    [dispatch]
  );

  const deleteUserAccount = useCallback(
    async (password: string) => {
      try {
        await dispatch(deleteAccount(password)).unwrap();
        return { success: true };
      } catch (error: any) {
        return { success: false, error };
      }
    },
    [dispatch]
  );

  const clearUserError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    profile,
    loading,
    error,
    updating,
    getProfile,
    updateUserProfile,
    uploadUserAvatar,
    changeUserPassword,
    deleteUserAccount,
    clearUserError,
  };
};
