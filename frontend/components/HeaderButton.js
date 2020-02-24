import React from 'react';
import IconButton from './IconButton';

// TODO: Add prop for left and right side of header
// TODO: Add prop for onPress()

/*
    Implements IconButton specifically to fit on headers of pages.
*/

export default function HeaderButton(props) {
    const {
        navigation,
    } = props;
    return (
        <IconButton
            size={20}
            onPress={() => navigation.goBack()}
            name={'navigate-before'}
            containerStyle={{ paddingLeft: 7 }}
        />
    )
}