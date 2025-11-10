import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchSettings, updateSettings } from '../store/slices/settingsSlice';
import { deleteAccount } from '../store/slices/userSlice';
import { useTheme } from 'react-native-paper';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const { settings, loading, updating } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const handleToggleSetting = async (
    key: 'darkMode' | 'emailNotifications' | 'pushNotifications' | 'smsNotifications',
    value: boolean
  ) => {
    try {
      await dispatch(updateSettings({ [key]: value })).unwrap();
    } catch (error) {
      Alert.alert('Error', 'Failed to update setting');
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.prompt(
              'Confirm Password',
              'Please enter your password to confirm account deletion',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: async (password) => {
                    if (!password) {
                      Alert.alert('Error', 'Password is required');
                      return;
                    }
                    try {
                      await dispatch(deleteAccount(password)).unwrap();
                      Alert.alert('Account Deleted', 'Your account has been deleted');
                    } catch (error: any) {
                      Alert.alert('Error', error.error || 'Failed to delete account');
                    }
                  },
                },
              ],
              'secure-text'
            );
          },
        },
      ]
    );
  };

  if (loading && !settings) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={[styles.screenTitle, { color: theme.colors.onSurface }]}>Settings</Text>

      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Appearance</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Icon name="theme-light-dark" size={24} color={theme.colors.onSurface} />
            <View style={styles.settingText}>
              <Text style={[styles.settingLabel, { color: theme.colors.onSurface }]}>
                Dark Mode
              </Text>
              <Text style={[styles.settingDescription, { color: theme.colors.onSurfaceVariant }]}>
                Use dark theme
              </Text>
            </View>
          </View>
          <Switch
            value={settings?.darkMode || false}
            onValueChange={(value) => handleToggleSetting('darkMode', value)}
            disabled={updating}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor="#fff"
          />
        </View>
      </Card>

      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
          Notifications
        </Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Icon name="email" size={24} color={theme.colors.onSurface} />
            <View style={styles.settingText}>
              <Text style={[styles.settingLabel, { color: theme.colors.onSurface }]}>
                Email Notifications
              </Text>
              <Text style={[styles.settingDescription, { color: theme.colors.onSurfaceVariant }]}>
                Receive notifications via email
              </Text>
            </View>
          </View>
          <Switch
            value={settings?.emailNotifications || false}
            onValueChange={(value) => handleToggleSetting('emailNotifications', value)}
            disabled={updating}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Icon name="bell" size={24} color={theme.colors.onSurface} />
            <View style={styles.settingText}>
              <Text style={[styles.settingLabel, { color: theme.colors.onSurface }]}>
                Push Notifications
              </Text>
              <Text style={[styles.settingDescription, { color: theme.colors.onSurfaceVariant }]}>
                Receive push notifications
              </Text>
            </View>
          </View>
          <Switch
            value={settings?.pushNotifications || false}
            onValueChange={(value) => handleToggleSetting('pushNotifications', value)}
            disabled={updating}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Icon name="message" size={24} color={theme.colors.onSurface} />
            <View style={styles.settingText}>
              <Text style={[styles.settingLabel, { color: theme.colors.onSurface }]}>
                SMS Notifications
              </Text>
              <Text style={[styles.settingDescription, { color: theme.colors.onSurfaceVariant }]}>
                Receive notifications via SMS
              </Text>
            </View>
          </View>
          <Switch
            value={settings?.smsNotifications || false}
            onValueChange={(value) => handleToggleSetting('smsNotifications', value)}
            disabled={updating}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor="#fff"
          />
        </View>
      </Card>

      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Account</Text>

        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Icon name="translate" size={24} color={theme.colors.onSurface} />
            <View style={styles.settingText}>
              <Text style={[styles.settingLabel, { color: theme.colors.onSurface }]}>
                Language
              </Text>
              <Text style={[styles.settingDescription, { color: theme.colors.onSurfaceVariant }]}>
                {settings?.language || 'English'}
              </Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color={theme.colors.onSurfaceVariant} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Icon name="information" size={24} color={theme.colors.onSurface} />
            <View style={styles.settingText}>
              <Text style={[styles.settingLabel, { color: theme.colors.onSurface }]}>
                About
              </Text>
              <Text style={[styles.settingDescription, { color: theme.colors.onSurfaceVariant }]}>
                App version and info
              </Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color={theme.colors.onSurfaceVariant} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Icon name="shield-check" size={24} color={theme.colors.onSurface} />
            <View style={styles.settingText}>
              <Text style={[styles.settingLabel, { color: theme.colors.onSurface }]}>
                Privacy Policy
              </Text>
              <Text style={[styles.settingDescription, { color: theme.colors.onSurfaceVariant }]}>
                View our privacy policy
              </Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color={theme.colors.onSurfaceVariant} />
        </TouchableOpacity>
      </Card>

      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.error }]}>Danger Zone</Text>

        <Button
          title="Delete Account"
          onPress={handleDeleteAccount}
          variant="outline"
          fullWidth
          style={[styles.dangerButton, { borderColor: theme.colors.error }]}
          textStyle={{ color: theme.colors.error }}
        />
      </Card>

      <View style={styles.footer}>
        <Text style={[styles.version, { color: theme.colors.onSurfaceDisabled }]}>
          Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
  },
  dangerButton: {
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  version: {
    fontSize: 12,
  },
});

export default SettingsScreen;
