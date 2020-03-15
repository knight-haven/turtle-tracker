import * as Haptics from 'expo-haptics';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as B, Icon } from 'react-native-elements';

/*
    Basic button class with icon and haptic feedback.
*/
export default function Button(props) {
    const {
        iconName,
        title,
    } = props;
    return (
        <B
            type={"outline"}
            {...props}
            title={title.toUpperCase()}
            titleStyle={styles.title}
            buttonStyle={styles.button}
            icon={
                <Icon
                    name={iconName}
                    type='material-community'
                    color='green'
                    containerStyle={styles.iconContainer}
                />
            }
            onPressIn={() => Haptics.impactAsync('medium')}
        />
    )
}

const styles = StyleSheet.create({
    title: {
        color: 'green',
    },
    button: {
        borderColor: 'green',
    },
    iconContainer: {
        paddingRight: 7,
        marginBottom: -5
    },
});