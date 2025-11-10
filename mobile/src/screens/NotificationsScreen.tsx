import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
  fetchNotifications,
  markAsRead,
  markAllAsRead,
} from '../store/slices/notificationsSlice';
import { useTheme } from 'react-native-paper';
import { Notification } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';

const NotificationsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const { notifications, unreadCount, loading } = useSelector(
    (state: RootState) => state.notifications
  );

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchNotifications({ limit: 50 }));
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchNotifications({ limit: 50 }));
    setRefreshing(false);
  };

  const handleNotificationPress = (notification: Notification) => {
    if (!notification.read) {
      dispatch(markAsRead(notification.id));
    }
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity onPress={() => handleNotificationPress(item)}>
      <Card
        style={[
          styles.notificationCard,
          !item.read ? { backgroundColor: theme.colors.primaryContainer } : undefined,
        ]}
      >
        <View style={styles.notificationHeader}>
          <View style={styles.notificationTitleContainer}>
            <Text
              style={[
                styles.notificationTitle,
                { color: theme.colors.onSurface },
                !item.read && styles.unreadTitle,
              ]}
            >
              {item.title}
            </Text>
            {!item.read && (
              <View style={[styles.unreadDot, { backgroundColor: theme.colors.primary }]} />
            )}
          </View>
          <Text style={[styles.notificationTime, { color: theme.colors.onSurfaceDisabled }]}>
            {format(new Date(item.createdAt), 'MMM d, h:mm a')}
          </Text>
        </View>
        <Text style={[styles.notificationBody, { color: theme.colors.onSurfaceVariant }]}>
          {item.body}
        </Text>
      </Card>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Icon name="bell-off-outline" size={64} color={theme.colors.onSurfaceDisabled} />
      <Text style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
        No notifications yet
      </Text>
      <Text style={[styles.emptySubtext, { color: theme.colors.onSurfaceDisabled }]}>
        When you receive notifications, they'll appear here
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>Notifications</Text>
      {unreadCount > 0 && (
        <Button
          title="Mark All as Read"
          onPress={handleMarkAllAsRead}
          variant="text"
          size="small"
        />
      )}
    </View>
  );

  if (loading && notifications.length === 0) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={notifications.length === 0 ? styles.emptyList : styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
  emptyList: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationCard: {
    marginBottom: 12,
  },
  notificationHeader: {
    marginBottom: 8,
  },
  notificationTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  unreadTitle: {
    fontWeight: '700',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  notificationTime: {
    fontSize: 12,
  },
  notificationBody: {
    fontSize: 14,
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default NotificationsScreen;
