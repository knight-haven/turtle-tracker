import React from 'react';
import { View } from 'react-native';

export default function Divider() {
  return (
    <View
      style={{
        borderLeftWidth: 1,
        borderColor: '#d3d3d3',
        height: '50%',
        top: '5%',
      }}
    />
  )
}