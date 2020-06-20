import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SightingText({ titleStyle, baseStyle, containerStyle, titleText, baseText }) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.titleText, titleStyle]}>{titleText}</Text>
      <Text style={[styles.baseText, baseStyle]}>{baseText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 4,
    display: 'flex',
    maxWidth: '100%',
    flexDirection: 'row',
  },
  baseText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'left',
  },
});