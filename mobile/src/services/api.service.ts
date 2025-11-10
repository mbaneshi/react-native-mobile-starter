import axios, { AxiosInstance, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_TIMEOUT, STORAGE_KEYS } from '../constants/config';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

            if (!refreshToken) {
              throw new Error('No refresh token available');
            }

            const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
              refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } = response.data;

            await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
            await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return this.api(originalRequest);
          } catch (refreshError) {
            // Clear tokens and redirect to login
            await AsyncStorage.multiRemove([
              STORAGE_KEYS.ACCESS_TOKEN,
              STORAGE_KEYS.REFRESH_TOKEN,
              STORAGE_KEYS.USER,
            ]);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public get<T>(url: string, config = {}) {
    return this.api.get<T>(url, config);
  }

  public post<T>(url: string, data?: any, config = {}) {
    return this.api.post<T>(url, data, config);
  }

  public patch<T>(url: string, data?: any, config = {}) {
    return this.api.patch<T>(url, data, config);
  }

  public delete<T>(url: string, config = {}) {
    return this.api.delete<T>(url, config);
  }
}

export const apiService = new ApiService();
