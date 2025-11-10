import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store, RootState } from './store';
import RootNavigator from './navigation';
import ErrorBoundary from './components/ErrorBoundary';
import { lightTheme, darkTheme } from './theme';

const AppContent: React.FC = () => {
  const { settings } = useSelector((state: RootState) => state.settings);
  const theme = settings?.darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    // Configure status bar based on theme
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle(settings?.darkMode ? 'light-content' : 'dark-content');
    }
  }, [settings?.darkMode]);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar
            barStyle={settings?.darkMode ? 'light-content' : 'dark-content'}
            backgroundColor={theme.colors.background}
          />
          <RootNavigator />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <AppContent />
      </ReduxProvider>
    </ErrorBoundary>
  );
};

export default App;
