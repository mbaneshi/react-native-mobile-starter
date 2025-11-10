import { authService } from '../../services/auth.service';
import { apiService } from '../../services/api.service';

jest.mock('../../services/api.service');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should login successfully', async () => {
      const mockResponse = {
        data: {
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
          user: { id: '1', email: 'test@example.com', name: 'Test User' },
        },
      };
      (apiService.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authService.login('test@example.com', 'password');

      expect(apiService.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
        password: 'password',
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw error on login failure', async () => {
      const mockError = { response: { data: { error: 'Invalid credentials' } } };
      (apiService.post as jest.Mock).mockRejectedValue(mockError);

      await expect(authService.login('test@example.com', 'wrong')).rejects.toThrow();
    });
  });

  describe('register', () => {
    it('should register successfully', async () => {
      const mockResponse = {
        data: {
          message: 'Registration successful',
        },
      };
      (apiService.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authService.register('test@example.com', 'password', 'Test User');

      expect(apiService.post).toHaveBeenCalledWith('/auth/register', {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('logout', () => {
    it('should logout successfully', async () => {
      const mockResponse = { data: { message: 'Logged out' } };
      (apiService.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authService.logout('refresh-token');

      expect(apiService.post).toHaveBeenCalledWith('/auth/logout', {
        refreshToken: 'refresh-token',
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('forgotPassword', () => {
    it('should send password reset email', async () => {
      const mockResponse = { data: { message: 'Email sent' } };
      (apiService.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authService.forgotPassword('test@example.com');

      expect(apiService.post).toHaveBeenCalledWith('/auth/forgot-password', {
        email: 'test@example.com',
      });
      expect(result).toEqual(mockResponse.data);
    });
  });
});
