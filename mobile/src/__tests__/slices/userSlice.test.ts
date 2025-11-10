import userReducer, {
  fetchProfile,
  updateProfile,
  clearError,
  setProfile,
  clearProfile,
} from '../../store/slices/userSlice';

describe('userSlice', () => {
  const initialState = {
    profile: null,
    loading: false,
    error: null,
    updating: false,
  };

  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchProfile', () => {
    it('should handle fetchProfile.pending', () => {
      const action = { type: fetchProfile.pending.type };
      const state = userReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle fetchProfile.fulfilled', () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        emailVerified: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      };
      const action = { type: fetchProfile.fulfilled.type, payload: mockUser };
      const state = userReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.profile).toEqual(mockUser);
    });

    it('should handle fetchProfile.rejected', () => {
      const mockError = { error: 'Failed to fetch profile' };
      const action = { type: fetchProfile.rejected.type, payload: mockError };
      const state = userReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toEqual(mockError);
    });
  });

  describe('updateProfile', () => {
    it('should handle updateProfile.pending', () => {
      const action = { type: updateProfile.pending.type };
      const state = userReducer(initialState, action);
      expect(state.updating).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle updateProfile.fulfilled', () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Updated Name',
        emailVerified: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-02',
      };
      const action = { type: updateProfile.fulfilled.type, payload: mockUser };
      const state = userReducer(initialState, action);

      expect(state.updating).toBe(false);
      expect(state.profile).toEqual(mockUser);
    });
  });

  describe('actions', () => {
    it('should clear error', () => {
      const stateWithError = {
        ...initialState,
        error: { error: 'Some error' },
      };
      const state = userReducer(stateWithError, clearError());
      expect(state.error).toBe(null);
    });

    it('should set profile', () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        emailVerified: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      };
      const state = userReducer(initialState, setProfile(mockUser));
      expect(state.profile).toEqual(mockUser);
    });

    it('should clear profile', () => {
      const stateWithProfile = {
        ...initialState,
        profile: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User',
          emailVerified: true,
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
      };
      const state = userReducer(stateWithProfile, clearProfile());
      expect(state.profile).toBe(null);
    });
  });
});
