import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { SCREEN_NAMES, EMAIL_REGEX } from '../constants/config';
import Input from '../components/Input';
import Button from '../components/Button';
import { useTheme } from 'react-native-paper';
import { authService } from '../services/auth.service';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'ForgotPassword'
>;

interface Props {
  navigation: ForgotPasswordScreenNavigationProp;
}

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (value: string) => {
    if (!value) {
      return 'Email is required';
    }
    if (!EMAIL_REGEX.test(value)) {
      return 'Invalid email address';
    }
    return '';
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (touched) {
      setEmailError(validateEmail(value));
    }
  };

  const handleEmailBlur = () => {
    setTouched(true);
    setEmailError(validateEmail(email));
  };

  const handleResetPassword = async () => {
    const emailErr = validateEmail(email);
    setEmailError(emailErr);
    setTouched(true);

    if (emailErr) {
      return;
    }

    setLoading(true);
    try {
      await authService.forgotPassword(email);
      Alert.alert(
        'Email Sent',
        'Password reset instructions have been sent to your email.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate(SCREEN_NAMES.LOGIN),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data?.error || 'Failed to send reset email. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Forgot Password</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Enter your email address and we'll send you instructions to reset your password.
          </Text>

          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={handleEmailChange}
            onBlur={handleEmailBlur}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            leftIcon="email"
            error={emailError}
            touched={touched}
          />

          <Button
            title="Send Reset Link"
            onPress={handleResetPassword}
            loading={loading}
            disabled={loading}
            fullWidth
            style={styles.resetButton}
          />

          <Button
            title="Back to Login"
            onPress={() => navigation.navigate(SCREEN_NAMES.LOGIN)}
            variant="text"
            fullWidth
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    lineHeight: 24,
  },
  resetButton: {
    marginBottom: 16,
  },
});

export default ForgotPasswordScreen;
