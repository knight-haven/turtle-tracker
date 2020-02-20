import React from 'react';
import { View } from 'react-native';
import TurtleList from '../components/TurtleList';
import HeaderButton from '../components/HeaderButton';

export default function SelectTurtleScreen( {navigation} ) {
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
        <HeaderButton navigation={navigation} />
    )
})