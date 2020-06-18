import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Divider from './Divider';
import s from './Styles';
import TurtleText from './TurtleText';


export default function TurtleCard({ turtle, originalDate, recentDate, recentLength, markerList, images }) {

  return (
    <View>
      <View style={[s.card, s.shadow]}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Turtle #{turtle.turtle_number}</Text>
        <View style={styles.rowContainer}>
          <TurtleText titleText='Mark' baseText={turtle.mark} />
          <Divider />
          <TurtleText titleText='Sex' baseText={turtle.sex} />
        </View>
        <View style={styles.rowContainer}>
          <TurtleText titleText='Date Found' baseText={moment(originalDate).format('l')} />
          <Divider />
          <TurtleText titleText='Date Last Seen' baseText={moment(recentDate).format('l')} />
        </View>
        <View style={styles.rowContainer}>
          <TurtleText titleText='Carapace Length' baseText={`${recentLength} mm`} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 5,
  }
})