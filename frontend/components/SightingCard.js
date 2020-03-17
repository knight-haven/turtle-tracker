import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment';
import TurtleText from './TurtleText';
import Divider from './Divider';
import TurtleMapView from './TurtleMapView';
import IconButton from './IconButton'

export default function SightingCard({navigation, sighting}) {

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 5}}>
                <IconButton 
                    styles={styles.infoButton}
                    onPress={() => navigation.navigate('SightingView', {turtleId: sighting.turtle_id, sightingId: sighting.id })}
                    name="info"/>
                <View style={{maxWidth: '37%'}}>
                    <TurtleText titleText={"Date"} baseText={moment(new Date(Date.parse(sighting.time_seen))).format('l')}/>
                </View>
                <Divider/>
                <View style={{maxWidth: '35%'}}>
                    <TurtleText titleText={"Location"} baseText={sighting.turtle_location}/>
                </View>
                <Divider/>
                <View style={{maxWidth: '28%'}}>
                    <TurtleText titleText={"Length"} baseText={`${sighting.carapace_length} mm`}/>
                </View>
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
            <Text style={styles.notes}>{sighting.notes}</Text>
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
    infoButton: {
        position: 'relative',
        height: '50%',
        marginTop: 20,
    }
})