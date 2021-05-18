/*
  AppNavigator.js handles the basic tab and stack navigation for the app.
*/

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
//  import screens
import AlternateLoginScreen from './Screens/AlternateLoginScreen';
import LandingScreen from './Screens/LandingScreen';
import LoginScreen from './Screens/LoginScreen';
import MapScreen from './Screens/MapScreen';
import SettingsScreen from './Screens/SettingsScreen';
import SightingEditScreen from './Screens/Sightings/SightingEditScreen';
import SightingViewScreen from './Screens/Sightings/SightingViewScreen';
import TurtleEditScreen from './Screens/Turtle/TurtleEditScreen';
import TurtleViewScreen from './Screens/Turtle/TurtleViewScreen';
import TurtleListScreen from './Screens/TurtleListScreen';

const Stack = createStackNavigator();

// Stack of screens for the Map Tab.
export const MapStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Map' component={MapScreen} />
    </Stack.Navigator>
  );
};

// Stacks of Screens for the Turtles Lab
export const TurtleListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='TurtleList' component={TurtleListScreen} />
      <Stack.Screen name='TurtleView' component={TurtleViewScreen} />
      <Stack.Screen name='TurtleEdit' component={TurtleEditScreen} />
      <Stack.Screen name='Settings' component={SettingsScreen} />
      <Stack.Screen name='SightingView' component={SightingViewScreen} />
      <Stack.Screen name='SightingEdit' component={SightingEditScreen} />
    </Stack.Navigator>
  );
};

// Combine the two stacks together under their own tabs.
const Tab = createBottomTabNavigator();

export const TabNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='MapTab' component={MapStack} />
      <Tab.Screen name='TurtleTab' component={TurtleListStack} />
    </Tab.Navigator>
  );
};

// Stack for the landing page and login.
export const LandingNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Landing' component={LandingScreen} />
      <Stack.Screen name='ADLogin' component={LoginScreen} />
      <Stack.Screen name='AltLogin' component={AlternateLoginScreen} />
    </Stack.Navigator>
  );
};

export const AuthContext = React.createContext();

// Combine all of the screens into one navigation
const MainNavigator = () => {
  const [userSignedIn, setUserSignedIn] = React.useState(false);

  return (
    <AuthContext.Provider value={{ userSignedIn, setUserSignedIn }}>
      <Stack.Navigator>
        {userSignedIn ? (
          <Stack.Screen name='TabScreens' component={TabNav} />
        ) : (
          <Stack.Screen name='LandingScreens' component={LandingNav} />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
};

export default MainNavigator;
