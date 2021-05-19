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

const Stack = createStackNavigator();

const CommonScreens = () => {
  return (
    <Stack.Navigator>
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
      />
      <Stack.Screen
        name='TurtleView'
        component={TurtleViewScreen}
        options={({ route, navigation }) => ({
          title: route.turtle ? route.params.turtle.mark : '',
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
      />
      <Stack.Screen
        name='TurtleEdit'
        component={TurtleEditScreen}
        options={({ navigation }) => ({
          title:
            route.params.edit != undefined && route.params.edit
              ? 'Edit Turtle'
              : 'Add Turtle',
          headerLeft: () => (
            <HeaderButton
              onPress={() => navigation.goBack()}
              name={'navigate-before'}
            />
          ),
        })}
      />
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
      />
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
      />
      <Stack.Screen
        name='SightingView'
        component={SightingViewScreen}
        options={({ navigation }) => ({
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
      />
      <Stack.Screen
        name='SightingEdit'
        component={SightingEditScreen}
        options={({ route, navigation }) => ({
          title:
            route.params.edit != undefined && route.params.edit
              ? 'Edit Sighting'
              : 'Add Sighting',
          headerLeft: () => (
            <HeaderButton
              onPress={() => navigation.goBack()}
              name={'navigate-before'}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

// Stack of screens for the Map Tab.
export const MapStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Map' component={MapScreen} />
      <Stack.Screen name='MapCommon' component={CommonScreens} />
    </Stack.Navigator>
  );
};

// Stacks of Screens for the Turtles Lab
export const TurtleListStack = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='TurtleListCommon' component={CommonScreens} />
      {/* <Stack.Screen name='TurtleList' component={TurtleListScreen} />
      <Stack.Screen name='TurtleView' component={TurtleViewScreen} />
      <Stack.Screen name='TurtleEdit' component={TurtleEditScreen} />
      <Stack.Screen name='SelectTurtle' component={SelectTurtleScreen} />
      <Stack.Screen name='Settings' component={SettingsScreen} />
      <Stack.Screen name='SightingView' component={SightingViewScreen} />
      <Stack.Screen name='SightingEdit' component={SightingEditScreen} /> */}
    </Stack.Navigator>
  );
};

// Combine the two stacks together under their own tabs.
const Tab = createBottomTabNavigator();

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
