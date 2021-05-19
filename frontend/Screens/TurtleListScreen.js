import React from 'react';
import { View } from 'react-native';
import TurtleList from '../components/TurtleList';

/*
    TurtleListScreen displays the list of the turtles.
*/
export default function TurtleListScreen({ navigation }) {
  return (
    <View>
      <TurtleList navigation={navigation} onPressPage='TurtleView' />
    </View>
  );
}
