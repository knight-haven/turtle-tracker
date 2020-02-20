import React from 'react';
import { Platform } from 'react-native';
import IconButton from './IconButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

// TODO: Check how this looks on Android. Why a special button on Andoird??

export default function HeaderButton(props) {
    const {
        navigation,
    } = props;
    return (
        //react-native-platform chooses which button to load based off of device's OS
        Component = Platform.select({
            ios: <IconButton
                size={20}
                onPress={() => navigation.goBack()}
                name={'navigate-before'}
                styles={{ paddingLeft: 7 }}
            />,
            android: <Icon.Button
                size={20}
                onPress={() => navigation.goBack()}
                name={'navigate-before'}
                iconStyle={{ paddingLeft: 7 }}
                backgroundColor="green"
                color="white"
            />,
        })
    )
}