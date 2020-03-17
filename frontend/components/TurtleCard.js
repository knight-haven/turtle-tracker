import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment';
import TurtleText from './TurtleText';
import Divider from './Divider';


export default function TurtleCard({turtle, originalDate, recentDate, recentLength, markerList, images}) {

    return (
        <View>
            <View style={styles.container}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Turtle #{turtle.turtle_number}</Text>
                <View style={styles.rowContainer}>
                    <TurtleText titleText='Mark' baseText={turtle.mark} />
                    <Divider/>
                    <TurtleText titleText='Sex' baseText={turtle.sex} />
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
    container: { 
        flex: 1, 
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 7,
        marginTop: 2,
        marginBottom: 7,
        justifyContent: 'space-evenly',

        // TODO? Maybe remove this UI feature.
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 5,
    }
})