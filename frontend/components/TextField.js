import React from 'react';
import { OutlinedTextField } from 'react-native-material-textfield';

/*
    OutlinedTextField with a custom style.
*/
export default function TextField(props) {
    const {
        label,
        onChangeText,
        value,
        reference,
    } = props;
    return (
        <OutlinedTextField
            ref={reference}
            label={label}
            onChangeText={onChangeText}
            value={value}
            fontSize={20}
            labelFontSize={16}
            tintColor="rgb(34,139,34)"
        />
    )
}