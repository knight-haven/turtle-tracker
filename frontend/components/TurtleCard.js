import moment from 'moment';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import BottomDivider from './BottomDivider';
import Divider from './Divider';
import s from './Styles';
import TurtleText from './TurtleText';


export default function TurtleCard({ turtle, originalDate, recentDate, recentLength, markerList, images }) {

  return (
    <View>
      <View style={[s.card, s.shadow]}>
        <View style={styles.rowContainer}>
          <TurtleText titleText='Number' baseText={turtle.turtle_number} />
          <Divider />
          <TurtleText titleText='Mark' baseText={turtle.mark} />
        </View>
        <BottomDivider />
        <View style={styles.rowContainer}>
          <TurtleText titleText='Sex' baseText={turtle.sex == undefined ? "" : turtle.sex[0].toUpperCase() + turtle.sex.slice(1)} />
          <Divider />
          <TurtleText titleText='Carapace Length' baseText={recentLength === null ? "0 mm" : `${recentLength} mm`} />
        </View>
        <BottomDivider />
        <View style={styles.rowContainer}>
          <TurtleText titleText='Date Found' baseText={moment(originalDate).format('l')} />
          <Divider />
          <TurtleText titleText='Date Last Seen' baseText={moment(recentDate).format('l')} />
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