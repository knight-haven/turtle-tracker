import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import s from './Styles';

// define styles
const styles = StyleSheet.create({
    icon: {
        color: "white",
    },
    opacity: {
        backgroundColor: "green",
        borderRadius: 100,
        padding: 5,
    },
})

/*
    IconButton is a customized button component.
    It will take a onPress function, the icon name,
    and additional styles.
*/
export default function IconButton(props) {
    const {
        onPress,
        name,
        containerStyle,
        type,
        disabled
    } = props

    iconType = type == undefined ? 'materal' : type
    return (
        <View style={[containerStyle]}>
            <TouchableOpacity
                disabled={disabled}
                onPress={onPress}
                style={[s.shadow, styles.opacity]}
                borderRadius={'100%'}
                onPressIn={() => Haptics.impactAsync('medium')}>
                <Icon name={name} style={styles.icon} size={props.size} />
            </TouchableOpacity>
        </View>
    )
}