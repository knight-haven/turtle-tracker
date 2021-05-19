import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Button as B, Icon } from 'react-native-elements';
import s from './Styles';

// TODO: make this instead with haptics import that or not import anything
const isWeb = Platform.OS === 'web';

/*
    Basic button class with icon and haptic feedback.
*/
export default function Button(props) {
  let { iconName, title, bold, type, style, titleStyle, color } = props;
  title = title.toUpperCase();
  type = type ? type.toLowerCase() : 'outline';
  if (color == undefined) {
    color = 'green';
  }
  return (
    <B
      type={type}
      {...props}
      title={title}
      titleStyle={[
        type == 'solid' ? styles.raisedTitle : { color },
        bold ? styles.bold : {},
        titleStyle,
      ]}
      buttonStyle={[
        type == 'solid' ? [{ backgroundColor: color }, s.shadow] : {},
        { borderColor: color },
        style,
      ]}
      icon={
        iconName ? (
          <Icon
            name={iconName}
            type='material-community'
            color={color}
            containerStyle={styles.iconContainer}
          />
        ) : undefined
      }
      onPressIn={() => {
        !isWeb && Haptics.impactAsync('medium');
      }}
    />
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  raisedTitle: {
    color: 'white',
  },
  iconContainer: {
    paddingRight: 7,
    marginBottom: -5,
  },
});
