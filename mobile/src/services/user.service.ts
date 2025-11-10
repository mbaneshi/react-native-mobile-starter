import { apiService } from './api.service';
import { User } from '../types';

class UserService {
  async getProfile(): Promise<{ user: User }> {
    const response = await apiService.get<{ user: User }>('/users/me');
    return response.data;
  }

  async updateProfile(data: { name?: string; avatarUrl?: string }): Promise<{ user: User }> {
    const response = await apiService.patch<{ user: User }>('/users/me', data);
    return response.data;
  }

  async uploadAvatar(file: FormData): Promise<{ avatarUrl: string }> {
    const response = await apiService.post<{ avatarUrl: string }>(
      '/users/avatar',
      file,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  async changePassword(currentPassword: string, newPassword: string) {
    const response = await apiService.post('/users/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  }

  async deleteAccount(password: string) {
    const response = await apiService.delete('/users/me', {
      data: { password },
    });
    return response.data;
  }
}

export const userService = new UserService();
