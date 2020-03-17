import * as Haptics from 'expo-haptics';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as B, Icon } from 'react-native-elements';
import s from './Styles';

/*
    Basic button class with icon and haptic feedback.
*/
export default function Button(props) {
    let {
        iconName,
        title,
        bold,
        type,
        style,
    } = props;
    title = title.toUpperCase()
    type = type ? type.toLowerCase() : "outline"
    return (
        <B
            type={type}
            {...props}
            title={title}
            titleStyle={[type == 'solid' ? styles.raisedTitle : styles.title, bold ? styles.bold : {}]}
            buttonStyle={[type == 'solid' ? [styles.raised, s.shadow] : {}, styles.button, style]}
            icon={iconName ? 
                <Icon
                    name={iconName}
                    type='material-community'
                    color='green'
                    containerStyle={styles.iconContainer}
                />
                :
                undefined
            }
            onPressIn={() => Haptics.impactAsync('medium')}
        />
    )
}

const styles = StyleSheet.create({
    title: {
        color: 'green',
    },
    bold: {
        fontWeight: 'bold',
    },
    raisedTitle: {
        color: 'white',
    },
    raised: {
        backgroundColor: 'green',  
    },
    button: {
        borderColor: 'green',
    },
    iconContainer: {
        paddingRight: 7,
        marginBottom: -5
    },
});