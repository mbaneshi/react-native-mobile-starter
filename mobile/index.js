import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

// Disable all console logs in production
if (!__DEV__) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

AppRegistry.registerComponent(appName, () => App);
