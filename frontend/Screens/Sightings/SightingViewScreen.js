import { firebase, BASE_URL, BACKEND_SECRET } from '../../env';
import moment from 'moment';
import React, { useState, useEffect, useCallback } from 'react';
import { View, RefreshControl, Text } from 'react-native';
import TurtleText from '../../components/TurtleText';
import TurtleMapView from '../../components/TurtleMapView';
import Gallery from '../../components/Gallery';
import Screen from '../../components/Screen';
import LoadingSpinner from '../../components/LoadingSpinner';
import HeaderButton from '../../components/HeaderButton';
import Divider from '../../components/Divider';
import BottomDivider from '../../components/BottomDivider';
import s from '../../components/Styles';

/*
Turtle Sighting Screen for information on one particular sighting
*/
export default function SightingViewScreen({ navigation }) {

    function getTurtleById(id) {
        return fetch(BASE_URL + `/turtle/${id}`, { headers: new Headers({ 'Authorization': `Bearer ` + BACKEND_SECRET }) })
            .then(response => response.json())
            .then(responseJson => {
                const data = responseJson[0]
                setTurtleNumber(data.turtle_number)
                setMark(data.mark)
                setLoading(false);
                setRefreshing(false);
            })
    }

    function getSightingById(id) {
        return fetch(BASE_URL + `/sighting/${id}`, { headers: new Headers({ 'Authorization': `Bearer ` + BACKEND_SECRET }) })
            .then((response) => response.json())
            .then((responseJson) => {
                let data = responseJson[0];
                let coordinate = {
                    "coordinate": {
                        "latitude": data.latitude,
                        "longitude": data.longitude
                    },
                }
                setMarkerList([coordinate])
                setDate(new Date(Date.parse(data.time_seen)));
                setNotes(data.notes);
                setLength(data.carapace_length);
                setLocation(data.turtle_location);
                navigation.setParams({ sighting: data, markerList: [coordinate] });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function getSightingImages(turtleId) {
        return fetch(BASE_URL + `/photo/sighting/${sightingId}`, { headers: new Headers({ 'Authorization': `Bearer ` + BACKEND_SECRET }) })
            .then((response) => response.json())
            .then(async (responseJson) => {
                var imageList = []
                for (var i = 0; i < responseJson.length; i++) {
                    imageList.push({ uri: await getPhoto(responseJson[i].name) })
                }
                onImagesChange(imageList);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function getPhoto(photoName) {
        const ref = firebase.storage().ref().child(`images/${photoName}`);
        return await ref.getDownloadURL();
    }

    const sightingId = navigation.getParam('sightingId');
    const turtleId = navigation.getParam('turtleId');
    const [length, setLength] = useState();
    const [location, setLocation] = useState();
    const [date, setDate] = useState();
    const [mark, setMark] = useState();
    const [notes, setNotes] = useState();
    const [turtleNumber, setTurtleNumber] = useState();
    const [markerList, setMarkerList] = useState([]);
    const [images, onImagesChange] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSightingById(sightingId)
        getTurtleById(turtleId)
        getSightingImages(sightingId)
    }, []);

    const [refreshing, setRefreshing] = useState(false);

    function refresh() {
        const sightingId = navigation.getParam('sightingId');
        const turtleId = navigation.getParam('turtleId');
        getSightingById(sightingId);
        getTurtleById(turtleId);
        getSightingImages(sightingId);
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refresh();
    }, [refreshing]);
    useEffect(() => { navigation.setParams({ refreshSightingView: refresh }); }, []);

    return (
        <Screen
            contentStyle={{ backgroundColor: 'transparent', shadowColor: 'transparent' }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            {
                loading && !refreshing &&
                <LoadingSpinner animating={loading} />
            }
            {
                !loading &&
                <View>
                    <View style={[s.shadow, s.card]}>
                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
                            {/* TODO: Replace sightingId with the number sighting for the specific turtle. */}
                            {/* <TurtleText titleText={`Sighting #${sightingId}`} /> */}
                            <TurtleText titleText="Mark" baseText={mark} />
                            <Divider />
                            <TurtleText titleText="Date" baseText={moment(date).format('l')} />
                        </View>
                        <BottomDivider/>
                        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
                            <TurtleText titleText="Length" baseText={`${length} mm`} />
                            <Divider />
                            <TurtleText titleText="Location" baseText={location} />
                        </View>
                        <BottomDivider/>
                        <TurtleText titleText="Notes" baseText={notes} />
                    </View>
                    {/* map */}
                    <View style={[s.shadow, s.card, { width: '100%', height: 200 }]}>
                        <TurtleMapView
                            markers={markerList}
                            latitude={markerList.length > 0 ? markerList[0].coordinate.latitude : null}
                            longitude={markerList.length > 0 ? markerList[0].coordinate.longitude : null}
                            pointerEvents="none" />
                    </View>
                    <View style={[s.shadow, s.card]}>
                        <Gallery images={images} />
                    </View>
                </View>
            }
        </Screen>
    );
}

// Sets the navigation options.
SightingViewScreen.navigationOptions = ({ navigation }) => ({
    title: 'Sighting',
    headerRight: () => (
        <HeaderButton
            onPress={() => navigation.navigate('SightingEdit',
                {
                    sighting: navigation.getParam('sighting'),
                    markerList: navigation.getParam('markerList'),
                    turtleId: navigation.getParam('turtleId'),
                    refreshSightingView: navigation.getParam('refreshSightingView'),
                    edit: true,
                })}
            name={'edit'}
        />
    ),
    headerLeft: () => (
        <HeaderButton
            onPress={() => {
                navigation.goBack();
                if (navigation.state.params.refreshTurtleView != undefined) {
                    navigation.state.params.refreshTurtleView();
                }
            }}
            name={'navigate-before'}
        />
    ),
});