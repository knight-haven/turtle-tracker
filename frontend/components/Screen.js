import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import s from './Styles';

/*
    Basic Screen wrapper for all screens.
    TODO: Allow for content to remove margin. See Turtle List View.
*/
export default function Screen(props) {
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView
        style={styles.background}
        refreshControl={props.refreshControl}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={[styles.content, s.shadow, props.contentStyle]}>
          {props.children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const isWeb = Platform.OS === 'web';

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#F5F5F5',
    height: isWeb ? '80vh' : '100%',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 7,
    marginTop: 7,
    marginBottom: 7,
    flex: 1,
  },
});
