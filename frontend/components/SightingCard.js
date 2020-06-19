import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment';
import SightingText from './SightingText';
import BottomDivider from './BottomDivider';
import TurtleMapView from './TurtleMapView';
import Button from './Button';
import s from './Styles';

export default function SightingCard({navigation, sighting}) {

    return (
        <View style={[styles.container, s.shadow]}>
            <View>
                <SightingText titleText={"Date"} baseText={moment(new Date(Date.parse(sighting.time_seen))).format('l')} containerStyle={{marginTop: 15}}/>
                <BottomDivider containerStyle={styles.divider}/>
                <SightingText titleText={"Location"} baseText={sighting.turtle_location}/>
                <BottomDivider containerStyle={styles.divider}/>
                <SightingText titleText={"Length"} baseText={sighting.carapace_length === null ? "" : `${sighting.carapace_length} mm`}/>
                <BottomDivider containerStyle={styles.divider}/>
                <SightingText titleText={"Notes"} baseText={sighting.notes} containerStyle={{marginBottom: 15}}/>
                <Button 
                    bold={true}
                    type="solid"
                    style={styles.button}
                    title="View Sighting"
                    onPress={() => navigation.navigate('SightingView', {turtleId: sighting.turtle_id, sightingId: sighting.id })}
                    />
            </View>
            {/* <TurtleMapView 
                markers={[{
                    "coordinate": {
                        "latitude": sighting.latitude,
                        "longitude": sighting.longitude
                    },
                    "cost": "a",
                }]}
                pointerEvents="none"
                latitude={sighting.latitude}
                longitude={sighting.longitude}
                height={150}
            /> */}
            {/* <Text style={styles.notes}>{sighting.notes}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 7,
        marginTop: 7,
        marginBottom: 7,
        justifyContent: 'space-evenly',
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    notes: {
        fontSize: 14,
        textAlign: 'center',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    button: {

    },
    divider: {
        marginTop: 15,
        marginBottom: 15,
    },
})