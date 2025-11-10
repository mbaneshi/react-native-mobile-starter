import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREEN_NAMES } from '../constants/config';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

export type AuthStackParamList = {
  [SCREEN_NAMES.LOGIN]: undefined;
  [SCREEN_NAMES.REGISTER]: undefined;
  [SCREEN_NAMES.FORGOT_PASSWORD]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      <Stack.Screen name={SCREEN_NAMES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={SCREEN_NAMES.REGISTER} component={RegisterScreen} />
      <Stack.Screen
        name={SCREEN_NAMES.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
