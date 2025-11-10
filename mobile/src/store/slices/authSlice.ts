import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../../services/auth.service';
import { User, ApiError } from '../../types';
import { STORAGE_KEYS } from '../../constants/config';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: ApiError | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.login(
        credentials.email,
        credentials.password
      );

      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { error: 'Login failed' });
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    data: { email: string; password: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.register(data.email, data.password, data.name);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { error: 'Registration failed' });
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { getState }) => {
  const state = getState() as { auth: AuthState };
  const refreshToken = state.auth.refreshToken;

  if (refreshToken) {
    try {
      await authService.logout(refreshToken);
    } catch (error) {
      // Log error but continue with logout
      console.error('Logout error:', error);
    }
  }

  await AsyncStorage.multiRemove([
    STORAGE_KEYS.ACCESS_TOKEN,
    STORAGE_KEYS.REFRESH_TOKEN,
    STORAGE_KEYS.USER,
  ]);
});

export const loadStoredAuth = createAsyncThunk('auth/loadStored', async () => {
  const [accessToken, refreshToken, userStr] = await AsyncStorage.multiGet([
    STORAGE_KEYS.ACCESS_TOKEN,
    STORAGE_KEYS.REFRESH_TOKEN,
    STORAGE_KEYS.USER,
  ]);

  if (accessToken[1] && refreshToken[1] && userStr[1]) {
    return {
      accessToken: accessToken[1],
      refreshToken: refreshToken[1],
      user: JSON.parse(userStr[1]),
    };
  }

  throw new Error('No stored auth');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiError;
        state.isAuthenticated = false;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiError;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      })
      // Load stored auth
      .addCase(loadStoredAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(loadStoredAuth.rejected, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
