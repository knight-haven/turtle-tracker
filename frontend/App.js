import React from 'react';
import { createAppContainer } from 'react-navigation';
import MainNavigator from './AppNavigator';

const AppContainer = createAppContainer(MainNavigator);

export default function App() {
  return <AppContainer />;
}
