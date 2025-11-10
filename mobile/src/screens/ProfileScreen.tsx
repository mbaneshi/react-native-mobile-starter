import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppDispatch, RootState } from '../store';
import { fetchProfile } from '../store/slices/userSlice';
import { logout } from '../store/slices/authSlice';
import { MainStackParamList } from '../navigation/MainNavigator';
import { SCREEN_NAMES } from '../constants/config';
import { useTheme } from 'react-native-paper';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';

type ProfileScreenNavigationProp = StackNavigationProp<MainStackParamList>;

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const theme = useTheme();
  const { user } = useSelector((state: RootState) => state.auth);
  const { profile, loading } = useSelector((state: RootState) => state.user);

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchProfile());
    setRefreshing(false);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => dispatch(logout()),
      },
    ]);
  };

  const currentUser = profile || user;

  if (loading && !currentUser) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={theme.colors.primary}
        />
      }
    >
      <Card style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          {currentUser?.avatarUrl ? (
            <Image source={{ uri: currentUser.avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: theme.colors.primary }]}>
              <Icon name="account" size={60} color="#fff" />
            </View>
          )}
          <TouchableOpacity
            style={[styles.editAvatarButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => navigation.navigate(SCREEN_NAMES.EDIT_PROFILE)}
          >
            <Icon name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={[styles.name, { color: theme.colors.onSurface }]}>
          {currentUser?.name || 'User'}
        </Text>
        <Text style={[styles.email, { color: theme.colors.onSurfaceVariant }]}>
          {currentUser?.email}
        </Text>

        {currentUser?.emailVerified ? (
          <View style={[styles.verifiedBadge, { backgroundColor: theme.colors.secondaryContainer }]}>
            <Icon name="check-circle" size={16} color={theme.colors.secondary} />
            <Text style={[styles.verifiedText, { color: theme.colors.secondary }]}>
              Verified
            </Text>
          </View>
        ) : (
          <View style={[styles.verifiedBadge, { backgroundColor: theme.colors.errorContainer }]}>
            <Icon name="alert-circle" size={16} color={theme.colors.error} />
            <Text style={[styles.verifiedText, { color: theme.colors.error }]}>
              Not Verified
            </Text>
          </View>
        )}
      </Card>

      <Card style={styles.infoCard}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
          Account Information
        </Text>

        <View style={styles.infoRow}>
          <Icon name="calendar" size={20} color={theme.colors.onSurfaceVariant} />
          <View style={styles.infoContent}>
            <Text style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
              Member Since
            </Text>
            <Text style={[styles.infoValue, { color: theme.colors.onSurface }]}>
              {currentUser?.createdAt
                ? format(new Date(currentUser.createdAt), 'MMMM d, yyyy')
                : '-'}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Icon name="update" size={20} color={theme.colors.onSurfaceVariant} />
          <View style={styles.infoContent}>
            <Text style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>
              Last Updated
            </Text>
            <Text style={[styles.infoValue, { color: theme.colors.onSurface }]}>
              {currentUser?.updatedAt
                ? format(new Date(currentUser.updatedAt), 'MMMM d, yyyy')
                : '-'}
            </Text>
          </View>
        </View>
      </Card>

      <Card style={styles.actionsCard}>
        <TouchableOpacity
          style={styles.actionItem}
          onPress={() => navigation.navigate(SCREEN_NAMES.EDIT_PROFILE)}
        >
          <Icon name="account-edit" size={24} color={theme.colors.primary} />
          <Text style={[styles.actionText, { color: theme.colors.onSurface }]}>
            Edit Profile
          </Text>
          <Icon name="chevron-right" size={24} color={theme.colors.onSurfaceVariant} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionItem}
          onPress={() => navigation.navigate(SCREEN_NAMES.CHANGE_PASSWORD)}
        >
          <Icon name="lock-reset" size={24} color={theme.colors.primary} />
          <Text style={[styles.actionText, { color: theme.colors.onSurface }]}>
            Change Password
          </Text>
          <Icon name="chevron-right" size={24} color={theme.colors.onSurfaceVariant} />
        </TouchableOpacity>
      </Card>

      <Button
        title="Logout"
        onPress={handleLogout}
        variant="outline"
        fullWidth
        style={styles.logoutButton}
      />
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
  profileCard: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 12,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  infoCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  actionsCard: {
    marginBottom: 16,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  logoutButton: {
    marginBottom: 32,
  },
});

export default ProfileScreen;
