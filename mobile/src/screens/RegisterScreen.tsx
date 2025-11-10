import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppDispatch, RootState } from '../store';
import { register, clearError } from '../store/slices/authSlice';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { SCREEN_NAMES, EMAIL_REGEX, PASSWORD_REGEX } from '../constants/config';
import Input from '../components/Input';
import Button from '../components/Button';
import { useTheme } from 'react-native-paper';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const validateName = (value: string) => {
    if (!value) {
      return 'Name is required';
    }
    if (value.length < 2) {
      return 'Name must be at least 2 characters';
    }
    return '';
  };

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
    if (!PASSWORD_REGEX.test(value)) {
      return 'Password must be at least 8 characters with uppercase, lowercase, and number';
    }
    return '';
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) {
      return 'Please confirm your password';
    }
    if (value !== password) {
      return 'Passwords do not match';
    }
    return '';
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (touched.name) {
      setNameError(validateName(value));
    }
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
    if (touched.confirmPassword && confirmPassword) {
      setConfirmPasswordError(value !== confirmPassword ? 'Passwords do not match' : '');
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (touched.confirmPassword) {
      setConfirmPasswordError(validateConfirmPassword(value));
    }
  };

  const handleRegister = async () => {
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const confirmPasswordErr = validateConfirmPassword(confirmPassword);

    setNameError(nameErr);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setConfirmPasswordError(confirmPasswordErr);
    setTouched({ name: true, email: true, password: true, confirmPassword: true });

    if (nameErr || emailErr || passwordErr || confirmPasswordErr) {
      return;
    }

    try {
      await dispatch(register({ email, password, name })).unwrap();
      Alert.alert(
        'Registration Successful',
        'Please check your email to verify your account.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate(SCREEN_NAMES.LOGIN),
          },
        ]
      );
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
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Sign up to get started
          </Text>

          {error && (
            <View style={[styles.errorContainer, { backgroundColor: theme.colors.errorContainer }]}>
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {error.error || 'Registration failed. Please try again.'}
              </Text>
            </View>
          )}

          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={handleNameChange}
            onBlur={() => {
              setTouched({ ...touched, name: true });
              setNameError(validateName(name));
            }}
            autoCapitalize="words"
            leftIcon="account"
            error={nameError}
            touched={touched.name}
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={handleEmailChange}
            onBlur={() => {
              setTouched({ ...touched, email: true });
              setEmailError(validateEmail(email));
            }}
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
            onBlur={() => {
              setTouched({ ...touched, password: true });
              setPasswordError(validatePassword(password));
            }}
            secureTextEntry
            autoCapitalize="none"
            leftIcon="lock"
            error={passwordError}
            touched={touched.password}
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            onBlur={() => {
              setTouched({ ...touched, confirmPassword: true });
              setConfirmPasswordError(validateConfirmPassword(confirmPassword));
            }}
            secureTextEntry
            autoCapitalize="none"
            leftIcon="lock-check"
            error={confirmPasswordError}
            touched={touched.confirmPassword}
          />

          <Button
            title="Sign Up"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
            fullWidth
            style={styles.registerButton}
          />

          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: theme.colors.onSurfaceVariant }]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate(SCREEN_NAMES.LOGIN)}>
              <Text style={[styles.loginLink, { color: theme.colors.primary }]}>Sign In</Text>
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
  registerButton: {
    marginBottom: 24,
    marginTop: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default RegisterScreen;
