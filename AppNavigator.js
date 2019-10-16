import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// Import Screens
import TurtleListScreen from './Screens/TurtleListScreen';
import TurtleProfileScreen from './Screens/TurtleProfileScreen';
import TurtleEditProfileScreen from './Screens/TurtleEditProfileScreen';
import TurtleAddProfileScreen from './Screens/TurtleAddProfileScreen';
import SettingsScreen from './Screens/SettingsScreen';
import MapScreen from './Screens/MapScreen';

const MapStack = createStackNavigator(
    {
      Map: {
        screen: MapScreen,
        navigationOptions: { title: 'Turtle Tracker' }
      },
    }
  );

const TurtleListStack = createStackNavigator(
    {
        TurtleList: {
          screen: TurtleListScreen,
          navigationOptions: { title: 'Turtle Tracker' }
        },
        TurtleProfile: {
          screen: TurtleProfileScreen,
          navigationOptions: { title: 'Turtle Tracker' }
        },
        TurtleEditProfile: {
          screen: TurtleEditProfileScreen,
          navigationOptions: { title: 'Turtle Tracker' }
        },
        TurtleAddProfile: {
          screen: TurtleAddProfileScreen,
          navigationOptions: { title: 'Turtle Tracker' }
        },
        Settings: {
          screen: SettingsScreen,
          navigationOptions: { title: 'Turtle Tracker' }
        }
      }
);

const MainNavigator = createBottomTabNavigator({
    MapTab: {
      navigationOptions: {
        tabBarLabel: 'Map',
      },
      screen: MapStack,
    },
    TurtleTab: {
        navigationOptions: {
            tabBarLabel: 'Turtle List',
        },
        screen: TurtleListStack,
    }
  }
);

// const AppNavigator = createStackNavigator(
//     {
//         Map: {screen: MapScreen},
//         TurtleList: TurtleListScreen,
//     },
//     {
//         initialRouteName: 'Map',
//     }
// );

export default createAppContainer(MainNavigator);