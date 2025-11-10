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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AppDispatch, RootState } from '../store';
import { changePassword } from '../store/slices/userSlice';
import { PASSWORD_REGEX } from '../constants/config';
import { useTheme } from 'react-native-paper';
import Input from '../components/Input';
import Button from '../components/Button';

const ChangePasswordScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const theme = useTheme();
  const { updating, error } = useSelector((state: RootState) => state.user);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [touched, setTouched] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const validateCurrentPassword = (value: string) => {
    if (!value) {
      return 'Current password is required';
    }
    return '';
  };

  const validateNewPassword = (value: string) => {
    if (!value) {
      return 'New password is required';
    }
    if (!PASSWORD_REGEX.test(value)) {
      return 'Password must be at least 8 characters with uppercase, lowercase, and number';
    }
    if (value === currentPassword) {
      return 'New password must be different from current password';
    }
    return '';
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) {
      return 'Please confirm your new password';
    }
    if (value !== newPassword) {
      return 'Passwords do not match';
    }
    return '';
  };

  const handleCurrentPasswordChange = (value: string) => {
    setCurrentPassword(value);
    if (touched.currentPassword) {
      setCurrentPasswordError(validateCurrentPassword(value));
    }
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    if (touched.newPassword) {
      setNewPasswordError(validateNewPassword(value));
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

  const handleChangePassword = async () => {
    const currentErr = validateCurrentPassword(currentPassword);
    const newErr = validateNewPassword(newPassword);
    const confirmErr = validateConfirmPassword(confirmPassword);

    setCurrentPasswordError(currentErr);
    setNewPasswordError(newErr);
    setConfirmPasswordError(confirmErr);
    setTouched({ currentPassword: true, newPassword: true, confirmPassword: true });

    if (currentErr || newErr || confirmErr) {
      return;
    }

    try {
      await dispatch(changePassword({ currentPassword, newPassword })).unwrap();
      Alert.alert('Success', 'Password changed successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.error || 'Failed to change password');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
          Your password must be at least 8 characters long and contain uppercase, lowercase, and
          numbers.
        </Text>

        {error && (
          <View style={[styles.errorContainer, { backgroundColor: theme.colors.errorContainer }]}>
            <Text style={[styles.errorText, { color: theme.colors.error }]}>
              {error.error || 'Failed to change password'}
            </Text>
          </View>
        )}

        <Input
          label="Current Password"
          placeholder="Enter current password"
          value={currentPassword}
          onChangeText={handleCurrentPasswordChange}
          onBlur={() => {
            setTouched({ ...touched, currentPassword: true });
            setCurrentPasswordError(validateCurrentPassword(currentPassword));
          }}
          secureTextEntry
          autoCapitalize="none"
          leftIcon="lock"
          error={currentPasswordError}
          touched={touched.currentPassword}
        />

        <Input
          label="New Password"
          placeholder="Enter new password"
          value={newPassword}
          onChangeText={handleNewPasswordChange}
          onBlur={() => {
            setTouched({ ...touched, newPassword: true });
            setNewPasswordError(validateNewPassword(newPassword));
          }}
          secureTextEntry
          autoCapitalize="none"
          leftIcon="lock-plus"
          error={newPasswordError}
          touched={touched.newPassword}
        />

        <Input
          label="Confirm New Password"
          placeholder="Confirm new password"
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
          title="Change Password"
          onPress={handleChangePassword}
          loading={updating}
          disabled={updating}
          fullWidth
          style={styles.submitButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
  },
  submitButton: {
    marginTop: 16,
  },
});

export default ChangePasswordScreen;
