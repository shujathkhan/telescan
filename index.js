/**
 * @format
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

const Main = () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => Main);
