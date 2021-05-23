/*
  AppNavigator.js handles the basic tab and stack navigation for the app.
*/
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HeaderButton from './components/HeaderButton';
import { AuthContext } from './context';
//  import screens
import AlternateLoginScreen from './Screens/AlternateLoginScreen';
import LandingScreen from './Screens/LandingScreen';
import LoginScreen from './Screens/LoginScreen';
import MapScreen from './Screens/MapScreen';
import SelectTurtleScreen from './Screens/SelectTurtleScreen';
import SettingsScreen from './Screens/SettingsScreen';
import SightingEditScreen from './Screens/Sightings/SightingEditScreen';
import SightingViewScreen from './Screens/Sightings/SightingViewScreen';
import TurtleEditScreen from './Screens/Turtle/TurtleEditScreen';
import TurtleViewScreen from './Screens/Turtle/TurtleViewScreen';
import TurtleListScreen from './Screens/TurtleListScreen';

// ref: https://github.com/react-navigation/react-navigation/issues/3790#issuecomment-688669597
const getCommon = (Stack) => {
  return [
    <Stack.Screen
      name='TurtleList'
      component={TurtleListScreen}
      options={({ navigation }) => ({
        headerRight: () => (
          <HeaderButton
            name={'add-location'}
            onPress={() => navigation.navigate('SelectTurtle')}
          />
        ),
        headerLeft: () => (
          <HeaderButton
            name={'settings'}
            onPress={() => navigation.navigate('Settings')}
          />
        ),
      })}
    />,
    <Stack.Screen
      name='TurtleView'
      component={TurtleViewScreen}
      options={({ route, navigation }) => ({
        title: route.params.turtle ? route.params.turtle.mark : 'turtle',
        headerRight: () => (
          <HeaderButton
            onPress={() =>
              navigation.navigate('TurtleEdit', {
                edit: 'true',
                turtle: route.params.turtle,
                originalDate: route.params.originalDate,
                recentDate: route.params.recentDate,
                recentLength: route.params.recentLength,
                refreshTurtleView: route.params.refreshTurtleView,
                refreshTurtleList: route.params.refreshTurtleList,
              })
            }
            name={'edit'}
          />
        ),
        headerLeft: () => (
          <HeaderButton
            onPress={() => navigation.goBack()}
            name={'navigate-before'}
          />
        ),
      })}
    />,
    <Stack.Screen
      name='TurtleEdit'
      component={TurtleEditScreen}
      options={({ route, navigation }) => ({
        title: route.params?.edit ? 'Edit Turtle' : 'Add Turtle',
        headerLeft: () => (
          <HeaderButton
            onPress={() => navigation.goBack()}
            name={'navigate-before'}
          />
        ),
      })}
    />,
    <Stack.Screen
      name='SelectTurtle'
      component={SelectTurtleScreen}
      options={({ navigation }) => ({
        headerLeft: () => (
          <HeaderButton
            onPress={() => navigation.goBack()}
            name={'navigate-before'}
          />
        ),
      })}
    />,
    <Stack.Screen
      name='Settings'
      component={SettingsScreen}
      options={({ navigation }) => ({
        headerLeft: () => (
          <HeaderButton
            onPress={() => navigation.goBack()}
            name={'navigate-before'}
          />
        ),
      })}
    />,
    <Stack.Screen
      name='SightingView'
      component={SightingViewScreen}
      options={({ route, navigation }) => ({
        title: 'Sighting',
        headerRight: () => (
          <HeaderButton
            onPress={() =>
              navigation.navigate('SightingEdit', {
                sighting: route.params.sighting,
                markerList: route.params.markerList,
                turtleId: route.params.turtleId,
                images: route.params.images,
                refreshSightingView: route.params.refreshSightingView,
                refreshTurtleView: route.params.refreshTurtleView,
                edit: true,
              })
            }
            name={'edit'}
          />
        ),
        headerLeft: () => (
          <HeaderButton
            onPress={() => {
              navigation.goBack();
              if (navigation.state.params.refreshTurtleView != undefined) {
                navigation.state.params.refreshTurtleView();
              }
            }}
            name={'navigate-before'}
          />
        ),
      })}
    />,
    <Stack.Screen
      name='SightingEdit'
      component={SightingEditScreen}
      options={({ route, navigation }) => ({
        title: route.params.edit ? 'Edit Sighting' : 'Add Sighting',
        headerLeft: () => (
          <HeaderButton
            onPress={() => navigation.goBack()}
            name={'navigate-before'}
          />
        ),
      })}
    />,
  ];
};

// Stack of screens for the Map Tab.
export const MapStack = () => {
  const Stack = createStackNavigator();
  const commonScreens = getCommon(Stack);
  return (
    <Stack.Navigator>
      <Stack.Screen name='Map' component={MapScreen} />
      {commonScreens}
    </Stack.Navigator>
  );
};

// Stacks of Screens for the Turtles Lab
export const TurtleListStack = () => {
  const Stack = createStackNavigator();
  const commonScreens = getCommon(Stack);
  return <Stack.Navigator>{commonScreens}</Stack.Navigator>;
};

// Combine the two stacks together under their own tabs.
const Tab = createBottomTabNavigator();

// TODO: does not refresh when you press the other screens.
export const TabNav = () => {
  return (
    <Tab.Navigator tabBarOptions={{ activeTintColor: 'green' }}>
      <Tab.Screen
        name='Tracker'
        component={MapStack}
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons name={'ios-map'} size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name='Turtles'
        component={TurtleListStack}
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons name={'ios-list'} size={25} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

// Stack for the landing page and login.
export const LandingNav = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name='Landing' component={LandingScreen} />
      <Stack.Screen name='ADLogin' component={LoginScreen} />
      <Stack.Screen name='AltLogin' component={AlternateLoginScreen} />
    </Stack.Navigator>
  );
};

// Combine all of the screens into one navigation
const MainNavigator = () => {
  const [userSignedIn, setUserSignedIn] = React.useState(false);
  const Stack = createStackNavigator();

  return (
    <AuthContext.Provider value={{ userSignedIn, setUserSignedIn }}>
      <Stack.Navigator headerMode='none'>
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
