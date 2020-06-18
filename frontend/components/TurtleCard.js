import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment';
import TurtleText from './TurtleText';
import Divider from './Divider';
import s from './Styles';


export default function TurtleCard({turtle, originalDate, recentDate, recentLength, markerList, images}) {

    return (
        <View>
            <View style={[s.card, s.shadow]}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Turtle #{turtle.turtle_number}</Text>
                <View style={styles.rowContainer}>
                    <TurtleText titleText='Mark' baseText={turtle.mark} />
                    <Divider/>
                    <TurtleText titleText='Sex' baseText={turtle.sex[0].toUpperCase() + turtle.sex.slice(1)} />
                </View>
                <View style={styles.rowContainer}>
                    <TurtleText titleText='Date Found' baseText={moment(originalDate).format('l')} />
                    <Divider/>
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