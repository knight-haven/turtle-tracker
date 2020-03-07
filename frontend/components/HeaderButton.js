import React from 'react';
import IconButton from './IconButton';

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
            containerStyle={{ paddingLeft: 7, paddingRight: 7 }}
        />
    )
}