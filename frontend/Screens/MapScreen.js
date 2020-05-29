import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import * as Haptics from 'expo-haptics';
import IconButton from '../components/IconButton';
import TurtleMapView from '../components/TurtleMapView';
import Button from '../components/Button';
import { BASE_URL, BACKEND_SECRET } from '../env';

/*
MapScreen.js contains the basic map screen with turtle sightings.
*/
export default function MapScreen({ navigation }) {

  const [latitude, onLatitudeChange] = useState(42.931870);
  const [longitude, onLongitudeChange] = useState(-85.582130);
  const [markerList, onMarkerListChange] = useState([]);
  const markerListRef = useRef(markerList);

  useEffect(() => {
    markerListRef.current = markerList;
  }, [markerList]);

  useEffect(() => { getMarkers() }, [])

  // accesses the user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        onLatitudeChange(position.coords.latitude)
        onLongitudeChange(position.coords.longitude)
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 2000 },
    )
  }, [])

  function getMarkers() {
    return fetch(BASE_URL + `/sighting`, { headers: new Headers({ 'Authorization': `Bearer ` + BACKEND_SECRET }) })
      .then((response) => response.json())
      .then((responseJson) => {
        var markers = []
        // TODO: This shortening on markers is temporary.
        for (var i = 0; i < responseJson.length - responseJson.length + 4; i++) {
          markers.push({
            "turtleId": responseJson[i].turtle_id,
            "coordinate": {
              "latitude": responseJson[i].latitude,
              "longitude": responseJson[i].longitude
            },
            "cost": "a",
            "onPress": (event) => handleMarkerPress(event)
          })
        }
        onMarkerListChange(markers)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleMarkerPress(event) {
    for (var i = 0; i < markerListRef.current.length; i++) {
      if (markerListRef.current[i].coordinate.latitude == event.nativeEvent.coordinate.latitude &&
        markerListRef.current[i].coordinate.longitude == event.nativeEvent.coordinate.longitude) {
        navigation.navigate('TurtleView', { turtleId: markerListRef.current[i].turtleId })
      }
    }
  }

  // when the markers are placed
  function handlePress(event) {
    Haptics.impactAsync('heavy')
    onMarkerListChange(
      [
        ...markerList,
        {
          coordinate: event.nativeEvent.coordinate,
          cost: "a",
          onPress: () => navigation.navigate('SelectTurtle')
        }
      ])
  }

  // builds the map to the user's location
  return (
    <View style={{ flex: 1 }}>
      <TurtleMapView
        mapType="hybrid"
        markers={markerList}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        scrollEnabled={true}
        showsMyLocationButton={false}

        //onLongPress={handlePress}
      />
      <IconButton
        onPress={() => navigation.navigate('Settings')}
        name={'settings'}
        size={45}
        containerStyle={{ left: 7, top: 7, position: 'absolute', flexDirection: 'row', }} />

      <IconButton
        onPress={() => navigation.navigate('SelectTurtle')}
        name={'add-location'}
        size={45}
        containerStyle={{ right: 7, top: 7, position: 'absolute', flexDirection: 'row', }} />

      <Button
        onPress={() => navigation.navigate('Login')}
        title={"Logout"}
        style={{ right: 7, bottom: 7, position: 'absolute', flexDirection: 'row', borderRadius: 100 }}
        type={"solid"}
      />

      {/* TODO: In the future, this will be a button the
        sets to map to the eco preserve. */}
      {/* <IconButton
        // onPress={() => }
        navigation={props.navigation}
        navigationPage={'SelectTurtle'}
        name={'add-location'}
        styles={{ left: 7, bottom: 7, top: 'auto' }} /> */}


    </View>

  );
}


// Reference/Source for Location: https://www.youtube.com/watch?v=bV7cLu7WL78 