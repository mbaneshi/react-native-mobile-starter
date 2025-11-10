import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { loadStoredAuth } from '../store/slices/authSlice';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import LoadingSpinner from '../components/LoadingSpinner';
import { View, StyleSheet } from 'react-native';

const RootNavigator: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  const [isInitializing, setIsInitializing] = React.useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await dispatch(loadStoredAuth()).unwrap();
      } catch (error) {
        // User not logged in or token expired
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (isInitializing || loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default RootNavigator;
