import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, Platform, ActivityIndicator } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import * as firebase from 'firebase';
import moment from 'moment';
import IconButton from '../../components/IconButton';
import TurtleText from '../../components/TurtleText';
import TurtleMapView from '../../components/TurtleMapView';
import Gallery from '../../components/Gallery';
import Screen from '../../components/Screen';
import LoadingSpinner from '../../components/LoadingSpinner';
import SightingCard from '../../components/SightingCard';

/*
    TurtleViewScreen views the contents of one turtle
*/
export default function TurtleViewScreen({ navigation }) {
    const [loading, setLoading] = useState(true)

    // Update the sighting table.
    function getDerivedTurtleInfo(sightings) {
        oDate = new Date(99999999999999), rDate = new Date(0), rLength = 0;
        for (var i = 0; i < sightings.length; i++) {
            var sightingDate = new Date(Date.parse(sightings[i].time_seen));
            if (sightingDate.getTime() < oDate.getTime()) {
                oDate = sightingDate;
                navigation.setParams({ originalDate: sightingDate });
            }
            if (sightingDate.getTime() > rDate.getTime()) {
                rDate = sightingDate;
                rLength = sightings[i].carapace_length;
                navigation.setParams({ recentDate: sightingDate, recentLength: sightings[i].carapace_length });
            }
        }
        onOriginalDateChange(oDate);
        onRecentDateChange(rDate);
        onRecentLengthChange(rLength);
    }

    async function getTurtleById(id) {
        return fetch(`https://turtletrackerbackend.herokuapp.com/turtle/${id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                onTurtleChange(responseJson[0]);
                navigation.setParams({ turtle: responseJson[0] });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async function getSightingByTurtleId(id) {
        return fetch(`https://turtletrackerbackend.herokuapp.com/sighting/turtle/${id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                getDerivedTurtleInfo(responseJson);
                onSightingsChange(responseJson);
                var markers = []
                for (var i = 0; i < responseJson.length; i++) {
                    turtleId = responseJson[i].turtle_id
                    sightingId = responseJson[i].id
                    markers.push({
                        "coordinate": {
                            "latitude": responseJson[i].latitude,
                            "longitude": responseJson[i].longitude
                        },
                        "cost": "a",
                        "onPress": () => props.navigation.navigate('SightingView', { turtleId, sightingId })
                    })
                }
                onMarkerListChange(markers)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function getTurtleImages(turtleId) {
        return fetch(`https://turtletrackerbackend.herokuapp.com/photo/turtle/${turtleId}`)
            .then((response) => response.json())
            .then(async (responseJson) => {
                var imageList = []
                for (var i = 0; i < responseJson.length; i++) {
                    imageList.push({ uri: await getPhoto(responseJson[i].name) })
                }
                onImagesChange(imageList);
                setLoading(false);
                setRefreshing(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async function getPhoto(photoName) {
        try {
            const ref = firebase.storage().ref().child(`images/${photoName}`);
            return await ref.getDownloadURL();
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    turtleId = navigation.getParam('turtleId');
    const [turtle, onTurtleChange] = useState({});
    const [sightings, onSightingsChange] = useState([]);
    const [markerList, onMarkerListChange] = useState([]);
    const [originalDate, onOriginalDateChange] = useState(new Date(99999999999999));
    const [recentDate, onRecentDateChange] = useState(new Date(0));
    const [recentLength, onRecentLengthChange] = useState(0);
    const [images, onImagesChange] = useState([{ uri: 'https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1405/tackgalichstudio140500025/28036032-question-mark-symbol-on-gray-background.jpg' }]);

    const [refreshing, setRefreshing] = useState(false);

    function refresh() {
        turtleId = navigation.getParam('turtleId');
        getTurtleById(turtleId);
        getSightingByTurtleId(turtleId);
        getTurtleImages(turtleId);
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refresh();
    }, [refreshing]);

    useEffect(() => {
        setLoading(true);
        getTurtleById(turtleId)
        getSightingByTurtleId(turtleId)
        getTurtleImages(turtleId)
        navigation.setParams({ refreshTurtleView: refresh })
    }, []);

    return (
        <Screen
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            {
                loading && !refreshing && 
                <LoadingSpinner animating={loading}/>
            }   
            {   
                !loading && 
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        {/* { turtleProps.pictures.length > 0 ?
                            <Image style={{width: 150, height: 150}} source={{uri: turtleProps.pictures[0]}}/>
                            : null
                        } */}
                        <View style={{ justifyContent: 'space-evenly' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Turtle #{turtle.turtle_number}</Text>
                            <TurtleText titleText='Mark: ' baseText={turtle.mark} />
                            <TurtleText titleText='Sex: ' baseText={turtle.sex} />
                            <TurtleText titleText='Date Found: ' baseText={moment(originalDate).format('l')} />
                            <TurtleText titleText='Date Last Seen: ' baseText={moment(recentDate).format('l')} />
                            {/* Most Recent Carapace Length Measurement */}
                            <TurtleText titleText='Carapace Length: ' baseText={`${recentLength} mm`} />
                        </View>
                    </View>
                    <TurtleText titleText='Sightings: ' baseText='' />
                    <TurtleMapView
                        markers={markerList}
                        pointerEvents="none"
                    />
                    <Gallery images={images} />
                    {
                        sightings.map((item, index) => (
                        <SightingCard
                            key={index + 1}
                            sighting={item}
                            navigation={navigation}
                        />
                        ))
                    }
                </View>
            }
        </Screen>
    );

}

// Styles
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#edffed' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    text: { textAlign: 'center' },
    btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
    btnText: { textAlign: 'center' }
});

// Sets the navigation options.
TurtleViewScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('turtle') == null ? '' : navigation.getParam('turtle').mark,
    headerRight: () => (

        //react-native-platform chooses which button to load based off of device's OS
        Component = Platform.select({
            ios: <IconButton
                size={20}
                onPress={() => navigation.navigate('TurtleEdit', {
                    edit: "true",
                    turtle: navigation.getParam('turtle'), originalDate: navigation.getParam('originalDate'),
                    recentDate: navigation.getParam('recentDate'), recentLength: navigation.getParam('recentLength'),
                    refreshTurtleView: navigation.getParam('refreshTurtleView'),
                })}
                name={'edit'}
                styles={{ right: '10%', paddingRight: 15, paddingTop: 2 }}
            />,
            android: <Icon.Button
                size={20}
                onPress={() => navigation.navigate('TurtleEdit', {
                    edit: "true",
                    turtle: navigation.getParam('turtle'), originalDate: navigation.getParam('originalDate'),
                    recentDate: navigation.getParam('recentDate'), recentLength: navigation.getParam('recentLength'),
                    refresh: navigation.getParam('refresh'),
                })}
                name={'edit'}
                iconStyle={{ right: '10%', paddingTop: 2, paddingLeft: 10 }}
                backgroundColor="green"
                color="white"
            />,
        })
    ),
    headerLeft: () => (

        //react-native-platform chooses which button to load based off of device's OS
        Component = Platform.select({
            ios: <IconButton
                size={20}
                onPress={() => navigation.goBack()}
                name={'navigate-before'}
                styles={{ paddingTop: 2, paddingLeft: 15 }}
            />,
            android: <Icon.Button
                size={20}
                onPress={() => navigation.goBack()}
                name={'navigate-before'}
                iconStyle={{ paddingLeft: 7 }}
                backgroundColor="green"
                color="white"
            />,
        })
    ),
});
