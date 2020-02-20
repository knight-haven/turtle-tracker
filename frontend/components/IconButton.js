import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import s from './Styles';

// define styles
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flexDirection: 'row',
    },
    icon: {
        color: "white",
    },
    opacity: {
        backgroundColor: "green",
        borderRadius: 100,
        padding: 5,
        shadowOpacity: 0.3,
    },
})

/*
    IconButton is a customized button component.
    It will take a onPress function, the icon name,
    and additional styles.
*/
export default function IconButton(props) {
    return (
        <View style={[styles.container, props.styles]}>
            <TouchableOpacity
                disabled={props.disabled}
                onPress={props.onPress}
                style={[s.shadow, styles.opacity]}
                borderRadius={'100%'}
                onPressIn={() => Haptics.impactAsync('medium')}>
                <Icon name={props.name} style={styles.icon} size={props.size} />
            </TouchableOpacity>
        </View>
    )
}