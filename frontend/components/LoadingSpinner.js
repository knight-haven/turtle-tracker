import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

/*
    Loading Spin Wheel for making API calls
*/
export default function LoadingSpinner(props) {
  return (
    <ActivityIndicator
      animating={props.animating}
      size='large'
      color='green'
      style={[props.style, styles.activityIndicator]}
    />
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});
