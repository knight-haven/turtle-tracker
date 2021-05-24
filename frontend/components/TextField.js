import React from 'react';
import { OutlinedTextField } from 'rn-material-ui-textfield';

/*
    OutlinedTextField with a custom style.
*/
export default function TextField(props) {
  const { reference, label } = props;
  return (
    <OutlinedTextField
      {...props}
      ref={reference}
      fontSize={20}
      labelFontSize={16}
      tintColor='rgb(34,139,34)'
      placeholder={label}
    />
  );
}

/*
    Util function to set the value of an OutlinedTextField via Ref
*/
export function setFieldValue(ref, value) {
  let { current: field } = ref;
  if (value != null) {
    field.setValue(value);
  }
}
