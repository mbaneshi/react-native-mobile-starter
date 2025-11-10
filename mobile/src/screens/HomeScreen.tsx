import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchProfile } from '../store/slices/userSlice';
import { fetchNotifications } from '../store/slices/notificationsSlice';
import { useTheme } from 'react-native-paper';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const { user } = useSelector((state: RootState) => state.auth);
  const { profile, loading: profileLoading } = useSelector((state: RootState) => state.user);
  const { notifications, unreadCount, loading: notificationsLoading } = useSelector(
    (state: RootState) => state.notifications
  );

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    dispatch(fetchProfile());
    dispatch(fetchNotifications({ limit: 5 }));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      dispatch(fetchProfile()),
      dispatch(fetchNotifications({ limit: 5 })),
    ]);
    setRefreshing(false);
  };

  const currentUser = profile || user;

  if (profileLoading && !currentUser) {
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
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: theme.colors.onSurface }]}>
          Hello, {currentUser?.name || 'User'}!
        </Text>
        <Text style={[styles.date, { color: theme.colors.onSurfaceVariant }]}>
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </Text>
      </View>

      <Card style={styles.statsCard}>
        <Text style={[styles.cardTitle, { color: theme.colors.onSurface }]}>Quick Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Icon name="bell" size={32} color={theme.colors.primary} />
            <Text style={[styles.statValue, { color: theme.colors.onSurface }]}>
              {unreadCount}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
              Unread Notifications
            </Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="check-circle" size={32} color={theme.colors.secondary} />
            <Text style={[styles.statValue, { color: theme.colors.onSurface }]}>
              {currentUser?.emailVerified ? 'Yes' : 'No'}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
              Email Verified
            </Text>
          </View>
        </View>
      </Card>

      <Card style={styles.notificationsCard}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
            Recent Notifications
          </Text>
          {notifications.length > 0 && (
            <TouchableOpacity>
              <Text style={[styles.viewAll, { color: theme.colors.primary }]}>View All</Text>
            </TouchableOpacity>
          )}
        </View>

        {notificationsLoading ? (
          <LoadingSpinner />
        ) : notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="bell-off" size={48} color={theme.colors.onSurfaceDisabled} />
            <Text style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
              No notifications yet
            </Text>
          </View>
        ) : (
          notifications.slice(0, 5).map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationItem,
                !notification.read && { backgroundColor: theme.colors.primaryContainer },
              ]}
            >
              <View style={styles.notificationContent}>
                <Text
                  style={[
                    styles.notificationTitle,
                    { color: theme.colors.onSurface },
                    !notification.read && styles.unreadTitle,
                  ]}
                >
                  {notification.title}
                </Text>
                <Text
                  style={[styles.notificationBody, { color: theme.colors.onSurfaceVariant }]}
                  numberOfLines={2}
                >
                  {notification.body}
                </Text>
                <Text style={[styles.notificationTime, { color: theme.colors.onSurfaceDisabled }]}>
                  {format(new Date(notification.createdAt), 'MMM d, h:mm a')}
                </Text>
              </View>
              {!notification.read && (
                <View style={[styles.unreadDot, { backgroundColor: theme.colors.primary }]} />
              )}
            </TouchableOpacity>
          ))
        )}
      </Card>

      <Card style={styles.actionsCard}>
        <Text style={[styles.cardTitle, { color: theme.colors.onSurface }]}>Quick Actions</Text>
        <TouchableOpacity style={styles.actionItem}>
          <Icon name="account-edit" size={24} color={theme.colors.primary} />
          <Text style={[styles.actionText, { color: theme.colors.onSurface }]}>
            Edit Profile
          </Text>
          <Icon name="chevron-right" size={24} color={theme.colors.onSurfaceVariant} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <Icon name="lock-reset" size={24} color={theme.colors.primary} />
          <Text style={[styles.actionText, { color: theme.colors.onSurface }]}>
            Change Password
          </Text>
          <Icon name="chevron-right" size={24} color={theme.colors.onSurfaceVariant} />
        </TouchableOpacity>
      </Card>
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
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
  },
  statsCard: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  notificationsCard: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 14,
    marginTop: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: '600',
  },
  notificationBody: {
    fontSize: 12,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 10,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
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
});

export default HomeScreen;
