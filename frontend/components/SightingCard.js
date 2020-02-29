import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment';

export default function SightingCard({sighting}) {

    function elementButton(value, navParams) {
        return (
            <TouchableOpacity
                style={{ zIndex: 5 }}
                onPress={() => _navigate_sighting(navParams)}
                onPressIn={() => Haptics.impactAsync('medium')}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginLeft: 10 }}>{value}</Text>
                    {/* <IconButton
                        disabled={true}
                        size={10}
                        onPress={() => {} }
                        name={'info'} /> */}
                    <View style={styles.iconContainer} >
                        <Icon name={'info'} size={10} style={{ color: 'white' }} />
                    </View>

                </View>
            </TouchableOpacity>


        )
    }

    function _navigate_sighting(navParams) {
        navigation.navigate('SightingView', navParams)
    }

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Text style={styles.text}>{moment(new Date(Date.parse(sighting.time_seen))).format('l')}</Text>
                <Text style={styles.text}>{sighting.turtle_location}</Text>
                <Text style={styles.text}>{sighting.carapace_length} mm</Text>
            </View>
            <Text style={styles.notes}>{sighting.notes}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        height: 100,
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
    }
})