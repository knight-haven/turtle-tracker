import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import TurtleText from '../../components/TurtleText';
import TurtleTextInput from '../../components/TurtleTextInput';
import CameraGallery from '../../components/CameraGallery';
import TurtleMapView from '../../components/TurtleMapView';
import * as Permissions from 'expo-permissions';
import moment from 'moment';

/*
SightingEditScreen is for editing the information of a specific citing.
*/
export default function SightingEditScreen({ navigation }) {
    const [turtle, setTurtle] = useState({});
    useEffect(() => { getTurtleById(turtleId);}, []);
    const [turtleNumber, setTurtleNumber] = useState('');
    const [length, setLength] = useState('');
    const [date, setDate] = useState(Date.now());
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [markerList, setMarkerList] = useState([]);

    sighting = navigation.getParam('sighting');
    useEffect(() => { 
        if (sighting != undefined && sighting != {} ) {
            setLength(sighting.carapace_length.toString()); 
            setDate(new Date(Date.parse(sighting.time_seen))); 
            setLocation(sighting.turtle_location);
            setNotes(sighting.notes);
            setMarkerList(navigation.getParam('markerList'));
        }
    }, []);

    // const [img, setImg] = useState('img');

    function getTurtleById(id) {
        return fetch(`https://turtletrackerbackend.herokuapp.com/turtle/${id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                setTurtle(responseJson[0]);
                setTurtleNumber(id.toString());
                navigation.setParams({ turtle: responseJson[0] });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function editSightingById(id) {
        return fetch(`https://turtletrackerbackend.herokuapp.com/sighting/${id}`, {method: 'PUT', headers: {'Content-Type':'application/json'}, 
        body: JSON.stringify({ 
            turtle_id: parseInt(turtleNumber),
            time_seen: date.valueOf(),
            turtle_location: location,
            latitude: sighting.latitude,
            longitude: sighting.longitude,
            carapace_length: parseInt(length),
            notes
        })})
          .catch((error) => {
            console.error(error);
          });
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

    // TODO: Move this to ask when button is pressed.
    getCameraPermission()
    getCameraRollPermission()

    return (
        <ScrollView>
            <CameraGallery />
            <View style = {{padding: 8}}>
                <TurtleText titleText="Mark: " baseText={turtle.mark} />
                <TurtleTextInput titleText='Turtle Number: ' onChangeText={turtleNumber => setTurtleNumber(turtleNumber)} value={turtleNumber} placeholder="#"/>
                <TurtleTextInput titleText="Date: " onChangeText={date => setDate(date)} value={moment(date).format('l')} placeholder='Sighting Date' />
                <TurtleTextInput titleText='Location ' onChangeText={location => setLocation(location)} value={location} placeholder="Turtle Location"/>
                <TurtleTextInput titleText='Length: ' onChangeText={length => setLength(length)} value={length} placeholder="Turtle Length"/>
                <TurtleTextInput titleText='Notes: ' onChangeText={notes => setNotes(notes)} value={notes} placeholder="Sighting Notes"/>
            </View>
            {/* for the image:
                https://facebook.github.io/react-native/docs/cameraroll.html  */}
            {/* date picker has android and ios versions on reacts website, but someone combined them here. 
                will spend time later setting this up
                https://github.com/react-native-community/react-native-datetimepicker#react-native-datetimepicker */}
                {/* TODO: Right now adding a sighting will return to the map so you can see it. */}
            <TurtleMapView 
                markers={markerList}
                pointerEvents="none"
            />
            { navigation.getParam('edit') != undefined && navigation.getParam('edit') == "true" ? 
                   <Button title="Submit" onPress={() => {editSightingById(sighting.id), navigation.goBack()}}/>  : <Button title="Submit" onPress={() => navigation.navigate("TurtleView")}/> }
        </ScrollView>
    );

}

// Sets the navigation options.
SightingEditScreen.navigationOptions = ({ navigation }) => ({
    title: 'Add Sighting',
});