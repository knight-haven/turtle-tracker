import React from 'react';
import IconButton from './IconButton';

// TODO: Add prop for left and right side of header
// TODO: Add prop for onPress()

/*
    Implements IconButton specifically to fit on headers of pages.
*/

export default function HeaderButton(props) {
    const {
        onPress,
        name,
    } = props;
    return (
        <IconButton
            size={20}
            onPress={onPress}
            name={name}
            containerStyle={{ paddingLeft: 7 }}
        />
    )
}