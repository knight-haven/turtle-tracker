import * as Permissions from 'expo-permissions';
import { firebase, BASE_URL, BACKEND_SECRET } from '../../env';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Platform } from 'react-native';
import uuidv1 from 'uuid/v1';
import TurtleText from '../../components/TurtleText';
import CameraGallery from '../../components/CameraGallery';
import TurtleMapView from '../../components/TurtleMapView';
import Screen from '../../components/Screen';
import HeaderButton from '../../components/HeaderButton';
import TextField, { setFieldValue } from '../../components/TextField';
import Button from '../../components/Button';
import Divider from '../../components/Divider';
import DatePicker from '../../components/DatePicker';

/*
Define a couple useful styles
*/
const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        paddingBottom: 7,
        paddingTop: 21,
    },
});

/*
SightingEditScreen is for editing the information of a specific citing.
*/
export default function SightingEditScreen({ navigation }) {
    tempId = navigation.getParam('turtleId') !== undefined ? navigation.getParam('turtleId') : 1
    sighting = navigation.getParam('sighting')
    
    const [turtle, setTurtle] = useState({});
    useEffect(() => { getTurtleById(tempId); }, []);
    const [turtleNumber, setTurtleNumber] = useState('');
    const [length, setLength] = useState('');
    const [date, setDate] = useState(new Date(Date.now()));
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [markerList, setMarkerList] = useState([]);
    const [images, setImages] = useState([]);
    const [latitude, setLatitude] = useState(42.931870);
    const [longitude, setLongitude] = useState(-85.582130);
    const [showDatePicker, setShowDatePicker] = useState(false);

    isEdit = navigation.getParam('edit') != undefined && navigation.getParam('edit')

    useEffect(() => {
        if (isEdit) {
            setLatitude(sighting.latitude)
            setLongitude(sighting.longitude)
        } else {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setMarkerList([{
                        "coordinate": {
                            "latitude": position.coords.latitude,
                            "longitude": position.coords.longitude,
                        },
                    }])
                },
                { enableHighAccuracy: true, timeout: 30000, maximumAge: 2000 },
            )
        }
    }, [])

    useEffect(() => {
        if (isEdit && sighting != null) {
            const {
                carapace_length,
                time_seen,
                turtle_location,
                notes,
            } = sighting;
            if (carapace_length != null) {
                setLength(carapace_length.toString());
                setFieldValue(lengthRef, carapace_length)
            }
            if (time_seen != null) {
                setDate(new Date(Date.parse(time_seen)));
            }
            if (turtle_location != null) {
                setLocation(turtle_location);
                setFieldValue(locRef, turtle_location)
            }
            if (notes != null) {
                setNotes(notes);
                setFieldValue(notesRef, notes)
            }
            if (navigation.getParam('markerList') != null) {
                setMarkerList(navigation.getParam('markerList'));
            } 
        }
    }, []);

    // const [img, setImg] = useState('img');

    function getTurtleById(id) {
        return fetch(BASE_URL + `/turtle/${id}`, { headers: new Headers({ 'Authorization': `Bearer ` + BACKEND_SECRET }) })
            .then((response) => response.json())
            .then((responseJson) => {
                setTurtle(responseJson[0]);
                setTurtleNumber(responseJson[0].turtle_number.toString());
                navigation.setParams({ turtle: responseJson[0] });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function editSightingById(id, turtleId) {
        return fetch(BASE_URL + `/sighting/${id}`, {
            method: 'PUT',
            headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ` + BACKEND_SECRET }),
            body: JSON.stringify({
                turtleId,
                time: moment(date).format(),
                location,
                latitude: sighting.latitude,
                longitude: sighting.longitude,
                length: parseInt(length),
                notes
            })
        })
            .catch((error) => {
                console.error(error);
            });
    }

    function getLocationAndCreateSighting(turtleId) {
        navigator.geolocation.getCurrentPosition(
            position => {
                createSighting(turtleId, position.coords.latitude, position.coords.longitude)
            },
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 2000 },
        )
    }

    function createSighting(turtleId, latitude, longitude) {
        return fetch(BASE_URL + `/sighting`, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ` + BACKEND_SECRET }),
            body: JSON.stringify({
                turtleId,
                time: moment(date).format(),
                location,
                latitude,
                longitude,
                length: parseInt(length),
                notes
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                for (var i = 0; i < images.length; i++) {
                    var UUID = uuidv1();
                    uploadPhoto(images[i].uri, UUID);
                    createPhoto(turtleId, responseJson, UUID);
                }
            });
    }

    function createPhoto(turtleId, sightingId, name) {
        return fetch(BASE_URL + `/photo`, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ` + BACKEND_SECRET }),
            body: JSON.stringify({
                turtleId,
                sightingId,
                name
            })
        })
    }

    async function getCameraPermission() {
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA);
        if (status === 'granted') {
            // return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        } else {
            throw new Error('Location permission not granted');
        }
    }

    async function getCameraRollPermission() {
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            // return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        } else {
            throw new Error('Location permission not granted');
        }
    }

    function uploadPhoto(uri, imageName) {
        fetch(uri)
            .then((response) => response.blob())
            .then((responseBlob) => {
                var ref = firebase.storage().ref().child("images/" + imageName);
                ref.put(responseBlob);
            })
            .catch((error) => {
                console.log(error)
            })
    };

    function callback(image) {
        setImages(image);
    }

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setFieldValue(dateRef, moment(currentDate).format('L'))
    }

    const onDateClose = (d) => {
        if (d && Platform.OS !== 'ios') {
            setShowDatePicker(false)
            setDate(d)
            setFieldValue(dateRef, moment(d).format('L'))
        } else {
            setShowDatePicker(false)
        }
      }

    // TODO: Move this to ask when button is pressed.
    getCameraPermission()
    getCameraRollPermission()

    dateRef = React.createRef()
    locRef = React.createRef()
    lengthRef = React.createRef()
    notesRef = React.createRef()

    return (
        <Screen>
            <View>
                <View style={{flexDirection: 'row'}}>
                    <TurtleText titleText="Mark" baseText={turtle.mark} />
                    <Divider/>
                    <TurtleText titleText='Turtle Number' baseText={turtleNumber} />
                </View>
                {/* used solely for spacing */}
                <Text>   </Text>

                {/* text fields to be filled in by user */}
                <TouchableWithoutFeedback onPress={() => {setShowDatePicker(true)}}>
                    <View>
                        <View pointerEvents='none'>
                            <TextField
                                label='Date: '
                                value={moment(date).format('L')}
                                reference={dateRef}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                {
                    showDatePicker && <DatePicker
                        date={date}
                        onChange={onDateChange}
                        onClose={onDateClose}
                    />
                }
                <TextField
                    label='Location: '
                    onChangeText={location => {
                        setLocation(location)
                        if (Platform.OS !== 'ios') {
                            setShowDatePicker(false)
                        }
                    }}
                    value={location}
                    reference={locRef}
                />
                <TextField
                    label='Length: '
                    onChangeText={length => {
                        setLength(length)
                        if (Platform.OS !== 'ios') {
                            setShowDatePicker(false)
                        }
                    }}
                    value={length}
                    reference={lengthRef}
                    suffix={"mm"}
                />
                <TextField
                    label='Notes: '
                    onChangeText={notes => {
                        setNotes(notes)
                        if (Platform.OS !== 'ios') {
                            setShowDatePicker(false)
                        }
                    }}
                    value={notes}
                    multiline={true}
                    characterRestriction={140}
                    reference={notesRef}
                />
            </View>
            {/* for the image:
                https://facebook.github.io/react-native/docs/cameraroll.html  */}
            {/* TODO: Right now adding a sighting will return to the map so you can see it. */}
            <TurtleMapView
                markers={markerList}
                pointerEvents="none"
                latitude={latitude}
                longitude={longitude}
            />
            <CameraGallery parentCallback={callback} />
            <View style={styles.container}>
                {/* // TODO: This gets rendered 4 times!!! Check into that. */}
                <Button
                    bold={true}
                    type={"solid"}
                    title={"submit sighting"}
                    onPress={isEdit ?
                        () => {
                            editSightingById(sighting.id, turtle.id),
                                navigation.goBack(),
                                navigation.state.params.refreshSightingView()
                        } :
                        () => {
                            getLocationAndCreateSighting(turtle.id);
                            navigation.navigate("TurtleView", { turtleId: turtle.id });
                            if (navigation.state.params.refreshTurtleView != undefined) {
                                navigation.state.params.refreshTurtleView();
                            }
                        }
                    }
                />
            </View>
        </Screen>
    );
}

// Sets the navigation options.
SightingEditScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('edit') != undefined && navigation.getParam('edit') ? 'Edit Sighting' : 'Add Sighting',
    headerLeft: () => (
        <HeaderButton
            onPress={() => navigation.goBack()}
            name={'navigate-before'}
        />
    )
});