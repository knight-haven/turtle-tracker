import React from 'react';
import { View, } from 'react-native';
import TurtleList from '../components/TurtleList';
import HeaderButton from '../components/HeaderButton';

/*
    TurtleListScreen displays the list of the turtles.
*/
export default function TurtleListScreen({ navigation }) {
    return (
        <View>
            <TurtleList
                navigation={navigation}
                onPressPage="TurtleView"
            />
        </View>
    );
}

// Sets the navigation options.
TurtleListScreen.navigationOptions = ({ navigation }) => ({
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
})