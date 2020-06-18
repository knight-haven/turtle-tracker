import React from 'react';
import { View } from 'react-native';

export default function BottomDivider({ containerStyle }) {
    return (
        <View
            style={[{
                borderBottomWidth: 1,
                borderColor: '#d3d3d3',
                width: '100%',
                marginBottom: 5,
                marginTop: 5,
            }, containerStyle]}
        />
    )
}