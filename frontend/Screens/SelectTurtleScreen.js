import React from 'react';
import { View } from 'react-native';
import HeaderButton from '../components/HeaderButton';
import TurtleList from '../components/TurtleList';

export default function SelectTurtleScreen({ navigation }) {
  return (
    <View style={{ justifyContent: 'center' }}>
      <TurtleList
        navigation={navigation}
        onPressPage="SightingEdit"
      />
    </View>
  );
}

SelectTurtleScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <HeaderButton
      onPress={() => navigation.goBack()}
      name={'navigate-before'}
    />
  )
})