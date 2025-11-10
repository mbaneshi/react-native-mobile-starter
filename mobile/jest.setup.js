import '@testing-library/react-native/extend-expect';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  multiSet: jest.fn(),
  multiGet: jest.fn(),
  multiRemove: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
}));

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

// Mock react-native-image-picker
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
  launchCamera: jest.fn(),
}));

// Mock Firebase
jest.mock('@react-native-firebase/app', () => ({
  firebase: {
    initializeApp: jest.fn(),
  },
}));

jest.mock('@react-native-firebase/messaging', () => ({
  getToken: jest.fn(() => Promise.resolve('mock-token')),
  requestPermission: jest.fn(() => Promise.resolve(1)),
  onMessage: jest.fn(),
  onNotificationOpenedApp: jest.fn(),
}));

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock console methods in tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};
