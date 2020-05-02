import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment';
import TurtleText from './TurtleText';
import Divider from './Divider';
import TurtleMapView from './TurtleMapView';
import IconButton from './IconButton';
import s from './Styles';

export default function SightingCard({navigation, sighting}) {

    return (
        <View style={[styles.container, s.shadow]}>
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