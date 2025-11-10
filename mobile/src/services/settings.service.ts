import { apiService } from './api.service';
import { UserSettings } from '../types';

class SettingsService {
  async getSettings(): Promise<{ settings: UserSettings }> {
    const response = await apiService.get<{ settings: UserSettings }>('/settings');
    return response.data;
  }

  async updateSettings(
    data: Partial<UserSettings>
  ): Promise<{ settings: UserSettings }> {
    const response = await apiService.patch<{ settings: UserSettings }>('/settings', data);
    return response.data;
  }
}

export const settingsService = new SettingsService();
