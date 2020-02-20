import React from 'react';
import IconButton from './IconButton';

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