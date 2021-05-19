import React from 'react';
import { View } from 'react-native';
import TurtleList from '../components/TurtleList';

export default function SelectTurtleScreen({ navigation }) {
  return (
    <View style={{ justifyContent: 'center' }}>
      <TurtleList navigation={navigation} onPressPage='SightingEdit' />
    </View>
  );
}
