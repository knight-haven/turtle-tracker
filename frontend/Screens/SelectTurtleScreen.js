import React from 'react';
import { View } from 'react-native';
import TurtleList from '../components/TurtleList';
import HeaderButton from '../components/HeaderButton';

export default class SelectTurtleScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: () => (
            <HeaderButton navigation={navigation}/>
        )
    })

    render() {
        return (
            <View style={{ justifyContent: 'center' }}>
                <TurtleList
                    navigation={this.props.navigation}
                    onPressPage="SightingEdit"
                />
            </View>
        );
    }
}