import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppDispatch, RootState } from '../store';
import { login, clearError } from '../store/slices/authSlice';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { SCREEN_NAMES, EMAIL_REGEX } from '../constants/config';
import Input from '../components/Input';
import Button from '../components/Button';
import { useTheme } from 'react-native-paper';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const validateEmail = (value: string) => {
    if (!value) {
      return 'Email is required';
    }
    if (!EMAIL_REGEX.test(value)) {
      return 'Invalid email address';
    }
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) {
      return 'Password is required';
    }
    if (value.length < 8) {
      return 'Password must be at least 8 characters';
    }
    return '';
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (touched.email) {
      setEmailError(validateEmail(value));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (touched.password) {
      setPasswordError(validatePassword(value));
    }
  };

  const handleEmailBlur = () => {
    setTouched({ ...touched, email: true });
    setEmailError(validateEmail(email));
  };

  const handlePasswordBlur = () => {
    setTouched({ ...touched, password: true });
    setPasswordError(validatePassword(password));
  };

  const handleLogin = async () => {
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setTouched({ email: true, password: true });

    if (emailErr || passwordErr) {
      return;
    }

    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (err) {
      // Error handled by Redux
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
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Welcome Back</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Sign in to continue
          </Text>

          {error && (
            <View style={[styles.errorContainer, { backgroundColor: theme.colors.errorContainer }]}>
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {error.error || 'Login failed. Please try again.'}
              </Text>
            </View>
          )}

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
            touched={touched.email}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={handlePasswordChange}
            onBlur={handlePasswordBlur}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password"
            leftIcon="lock"
            error={passwordError}
            touched={touched.password}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate(SCREEN_NAMES.FORGOT_PASSWORD)}
            style={styles.forgotPassword}
          >
            <Text style={[styles.forgotPasswordText, { color: theme.colors.primary }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <Button
            title="Login"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            fullWidth
            style={styles.loginButton}
          />

          <View style={styles.registerContainer}>
            <Text style={[styles.registerText, { color: theme.colors.onSurfaceVariant }]}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate(SCREEN_NAMES.REGISTER)}>
              <Text style={[styles.registerLink, { color: theme.colors.primary }]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
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
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    marginBottom: 24,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoginScreen;
