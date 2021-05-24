import { NavigationContainer } from '@react-navigation/native';
import LogRocket from 'logrocket';
import React from 'react';
import MainNavigator from './AppNavigator';

LogRocket.init('pgsseg/turtle-tracker');

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
