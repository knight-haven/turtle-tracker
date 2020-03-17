import React from 'react';
import IconButton from './IconButton';

/*
    Implements IconButton specifically to fit on headers of pages.
*/

export default function HeaderButton(props) {
    return (
        <IconButton
            {...props}
            size={20}
            containerStyle={{ paddingLeft: 7, paddingRight: 7 }}
        />
    )
}