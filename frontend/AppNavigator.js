/*
  AppNavigator.js handels the basic tab and stack navigation for the app.
*/

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { createAppContainer, createSwitchNavigator, NavigationActions, StackActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
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



// Screens shared across stacks.
const CommonScreens = {
  TurtleList: {
    screen: TurtleListScreen,
    navigationOptions: { title: 'Turtles' }
  },
  TurtleView: {
    screen: TurtleViewScreen,
  },
  TurtleEdit: {
    screen: TurtleEditScreen,
  },
  SelectTurtle: {
    screen: SelectTurtleScreen,
    navigationOptions: { title: 'Select Turtle' }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: { title: 'Settings' }
  },
  SightingView:
  {
    screen: SightingViewScreen
  },
  SightingEdit:
  {
    screen: SightingEditScreen
  },
}

// Stack of screens for the Map Tab.
const MapStack = createStackNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: {
        title: 'Tracker',
        headerStyle: {
          backgroundColor: 'white',
        }
      }
    },
    ...CommonScreens,
  },
);

// Stacks of Screens for the Turtles Lab
const TurtleListStack = createStackNavigator(
  {
    ...CommonScreens
  },

);

// Combine the two stacks together under their own tabs.
const TabNav = createBottomTabNavigator(
  {
    MapTab: {
      navigationOptions: {
        tabBarLabel: 'Tracker',
      },
      screen: MapStack,
    },
    TurtleTab: {
      navigationOptions: {
        tabBarLabel: 'Turtles',
      },
      screen: TurtleListStack,
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({ defaultHandler }) => {
        const { routeName } = navigation.state;

        // Move screens
        defaultHandler();

        // Then load the screen
        if (routeName === 'MapTab') {
          navigation.dispatch(StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'Map' })]
          }))
        }
        else if (routeName === 'TurtleTab') {
          navigation.dispatch(StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'TurtleList' })]
          }))
        }
      },

      // Icon for tab bar.
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'MapTab') {
          iconName = `ios-map`;
        } else if (routeName === 'TurtleTab') {
          iconName = `ios-list`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'green',
      inactiveTintColor: 'gray',
    },
  }
);

// Stack for the landing page and login.
const LandingNav = createStackNavigator({
  Landing: {
    screen: LandingScreen
  },
  ADLogin: {
    screen: LoginScreen
  },
  AltLogin: {
    screen: AlternateLoginScreen
  }
})

// Combine all of the screens into one navigation
const MainNavigator = createSwitchNavigator(
  {
    App: TabNav,
    Login: LandingNav,
  },
  {
    initialRouteName: 'Login',
  }
)

export default createAppContainer(MainNavigator);
