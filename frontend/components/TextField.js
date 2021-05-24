import React from 'react';
import { Input } from 'react-native-elements';
/*
    OutlinedTextField with a custom style.
*/
export default function TextField(props) {
  const { label } = props;
  return (
    <Input
      {...props}
      fontSize={20}
      labelFontSize={16}
      tintColor='rgb(34,139,34)'
      placeholder={label}
    />
  );
}
