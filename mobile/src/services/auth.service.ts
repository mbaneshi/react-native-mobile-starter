import { apiService } from './api.service';
import { AuthResponse } from '../types';

class AuthService {
  async register(email: string, password: string, name: string) {
    const response = await apiService.post('/auth/register', {
      email,
      password,
      name,
    });
    return response.data;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    return response.data;
  }

  async logout(refreshToken: string) {
    const response = await apiService.post('/auth/logout', {
      refreshToken,
    });
    return response.data;
  }

  async forgotPassword(email: string) {
    const response = await apiService.post('/auth/forgot-password', {
      email,
    });
    return response.data;
  }

  async resetPassword(token: string, newPassword: string) {
    const response = await apiService.post('/auth/reset-password', {
      token,
      newPassword,
    });
    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/refresh', {
      refreshToken,
    });
    return response.data;
  }
}

export const authService = new AuthService();
