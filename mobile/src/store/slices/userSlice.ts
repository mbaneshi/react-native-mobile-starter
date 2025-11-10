import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { userService } from '../../services/user.service';
import { User, ApiError } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../constants/config';

interface UserState {
  profile: User | null;
  loading: boolean;
  error: ApiError | null;
  updating: boolean;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
  updating: false,
};

export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getProfile();
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      return response.user;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { error: 'Failed to fetch profile' }
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (
    data: { name?: string; avatarUrl?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await userService.updateProfile(data);
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      return response.user;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { error: 'Failed to update profile' }
      );
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  'user/uploadAvatar',
  async (file: FormData, { rejectWithValue, dispatch }) => {
    try {
      const response = await userService.uploadAvatar(file);
      // Update profile with new avatar URL
      await dispatch(updateProfile({ avatarUrl: response.avatarUrl }));
      return response.avatarUrl;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { error: 'Failed to upload avatar' }
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (
    { currentPassword, newPassword }: { currentPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      await userService.changePassword(currentPassword, newPassword);
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { error: 'Failed to change password' }
      );
    }
  }
);

export const deleteAccount = createAsyncThunk(
  'user/deleteAccount',
  async (password: string, { rejectWithValue }) => {
    try {
      await userService.deleteAccount(password);
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER,
      ]);
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { error: 'Failed to delete account' }
      );
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiError;
      })
      // Update profile
      .addCase(updateProfile.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updating = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload as ApiError;
      })
      // Upload avatar
      .addCase(uploadAvatar.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state) => {
        state.updating = false;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload as ApiError;
      })
      // Change password
      .addCase(changePassword.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.updating = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload as ApiError;
      })
      // Delete account
      .addCase(deleteAccount.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.updating = false;
        state.profile = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload as ApiError;
      });
  },
});

export const { clearError, setProfile, clearProfile } = userSlice.actions;
export default userSlice.reducer;
