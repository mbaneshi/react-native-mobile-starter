import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { settingsService } from '../../services/settings.service';
import { UserSettings, ApiError } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../constants/config';

interface SettingsState {
  settings: UserSettings | null;
  loading: boolean;
  error: ApiError | null;
  updating: boolean;
}

const initialState: SettingsState = {
  settings: null,
  loading: false,
  error: null,
  updating: false,
};

export const fetchSettings = createAsyncThunk(
  'settings/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await settingsService.getSettings();
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(response.settings));
      return response.settings;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { error: 'Failed to fetch settings' }
      );
    }
  }
);

export const updateSettings = createAsyncThunk(
  'settings/update',
  async (data: Partial<UserSettings>, { rejectWithValue }) => {
    try {
      const response = await settingsService.updateSettings(data);
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(response.settings));
      return response.settings;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { error: 'Failed to update settings' }
      );
    }
  }
);

export const loadStoredSettings = createAsyncThunk(
  'settings/loadStored',
  async () => {
    const settingsStr = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (settingsStr) {
      return JSON.parse(settingsStr) as UserSettings;
    }
    throw new Error('No stored settings');
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSettings: (state, action: PayloadAction<UserSettings>) => {
      state.settings = action.payload;
    },
    clearSettings: (state) => {
      state.settings = null;
    },
    toggleDarkMode: (state) => {
      if (state.settings) {
        state.settings.darkMode = !state.settings.darkMode;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch settings
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ApiError;
      })
      // Update settings
      .addCase(updateSettings.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.updating = false;
        state.settings = action.payload;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload as ApiError;
      })
      // Load stored settings
      .addCase(loadStoredSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
      })
      .addCase(loadStoredSettings.rejected, () => {
        // Silently fail if no stored settings
      });
  },
});

export const { clearError, setSettings, clearSettings, toggleDarkMode } = settingsSlice.actions;
export default settingsSlice.reducer;
