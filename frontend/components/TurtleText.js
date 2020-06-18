import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

/*
    TurtleText is a component to format text with a bold title and
        then the values.
    Props:
        viewStyle: styleSheet,
        titleStyle: the title's styleSheet,
        baseStyle: the value's styleSheet,
        titleText: title string
        baseText: value string
*/
export default class TurtleText extends Component {
  render() {
    const {
      viewStyle,
      titleStyle,
      baseStyle,
      titleText,
      baseText
    } = this.props;
    return (
      <View style={[styles.container, viewStyle]}>
        <Text style={[styles.titleText, titleStyle]}>{titleText}</Text>
        <Text style={[styles.baseText, baseStyle]} numberOfLines={2}>{baseText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 4,
    display: 'flex',
    flexWrap: 'wrap',
    // borderBottomWidth:0.5,
    // borderColor:'#c2c2c2'
  },
  baseText: {
    fontSize: 20,
    fontWeight: '500',
    width: '100%',
    textAlign: 'center',
  },
  titleText: {
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
  },
});