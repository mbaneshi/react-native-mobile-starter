import { userService } from '../../services/user.service';
import { apiService } from '../../services/api.service';

jest.mock('../../services/api.service');

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProfile', () => {
    it('should fetch user profile successfully', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        emailVerified: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      };
      const mockResponse = { data: { user: mockUser } };
      (apiService.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await userService.getProfile();

      expect(apiService.get).toHaveBeenCalledWith('/users/me');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('updateProfile', () => {
    it('should update user profile successfully', async () => {
      const updateData = { name: 'Updated Name' };
      const mockResponse = {
        data: {
          user: { id: '1', email: 'test@example.com', name: 'Updated Name' },
        },
      };
      (apiService.patch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await userService.updateProfile(updateData);

      expect(apiService.patch).toHaveBeenCalledWith('/users/me', updateData);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      const mockResponse = { data: { message: 'Password changed' } };
      (apiService.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await userService.changePassword('oldPass', 'newPass');

      expect(apiService.post).toHaveBeenCalledWith('/users/change-password', {
        currentPassword: 'oldPass',
        newPassword: 'newPass',
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('deleteAccount', () => {
    it('should delete account successfully', async () => {
      const mockResponse = { data: { message: 'Account deleted' } };
      (apiService.delete as jest.Mock).mockResolvedValue(mockResponse);

      const result = await userService.deleteAccount('password');

      expect(apiService.delete).toHaveBeenCalledWith('/users/me', {
        data: { password: 'password' },
      });
      expect(result).toEqual(mockResponse.data);
    });
  });
});
