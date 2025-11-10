import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SCREEN_NAMES } from '../constants/config';
import { useTheme } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export type MainStackParamList = {
  MainTabs: undefined;
  [SCREEN_NAMES.EDIT_PROFILE]: undefined;
  [SCREEN_NAMES.CHANGE_PASSWORD]: undefined;
};

export type MainTabParamList = {
  [SCREEN_NAMES.HOME]: undefined;
  [SCREEN_NAMES.NOTIFICATIONS]: undefined;
  [SCREEN_NAMES.PROFILE]: undefined;
  [SCREEN_NAMES.SETTINGS]: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs: React.FC = () => {
  const theme = useTheme();
  const unreadCount = useSelector((state: RootState) => state.notifications.unreadCount);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceDisabled,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
        },
      }}
    >
      <Tab.Screen
        name={SCREEN_NAMES.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.NOTIFICATIONS}
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.SETTINGS}
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.EDIT_PROFILE}
        component={EditProfileScreen}
        options={{ title: 'Edit Profile' }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.CHANGE_PASSWORD}
        component={ChangePasswordScreen}
        options={{ title: 'Change Password' }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
