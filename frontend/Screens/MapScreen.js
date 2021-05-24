import * as Haptics from 'expo-haptics';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import Button from '../components/Button';
import IconButton from '../components/IconButton';
import TurtleMapView from '../components/TurtleMapView';
import { AuthContext } from '../context';
import { BACKEND_SECRET, BASE_URL } from '../env';

const isWeb = Platform.OS === 'web';

/*
MapScreen.js contains the basic map screen with turtle sightings.
*/
export default function MapScreen({ route, navigation }) {
  const [latitude, onLatitudeChange] = useState(42.93187);
  const [longitude, onLongitudeChange] = useState(-85.58213);
  const [markerList, onMarkerListChange] = useState([]);
  const markerListRef = useRef(markerList);
  const { setUserSignedIn } = React.useContext(AuthContext);

  useEffect(() => {
    markerListRef.current = markerList;
  }, [markerList]);

  useEffect(() => {
    getMarkers();
  }, []);

  // accesses the user's location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      onLatitudeChange(location.coords.latitude);
      onLongitudeChange(location.coords.longitude);
    })();
  }, []);

  function getMarkers() {
    return fetch(BASE_URL + `/recentSighting`, {
      headers: new Headers({ Authorization: `Bearer ` + BACKEND_SECRET }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        var markers = [];
        for (var i = 0; i < responseJson.length; i++) {
          markers.push({
            turtleId: responseJson[i].turtle_id,
            coordinate: {
              latitude: responseJson[i].latitude,
              longitude: responseJson[i].longitude,
            },
            cost: 'a',
            onPress: (event) => handleMarkerPress(event),
          });
        }
        onMarkerListChange(markers);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleMarkerPress(event) {
    for (var i = 0; i < markerListRef.current.length; i++) {
      if (
        markerListRef.current[i].coordinate.latitude ==
          event.nativeEvent.coordinate.latitude &&
        markerListRef.current[i].coordinate.longitude ==
          event.nativeEvent.coordinate.longitude
      ) {
        navigation.navigate('TurtleView', {
          turtleId: markerListRef.current[i].turtleId,
        });
      }
    }
  }

  // when the markers are placed
  function handlePress(event) {
    !isWeb && Haptics.impactAsync('heavy');
    onMarkerListChange([
      ...markerList,
      {
        coordinate: event.nativeEvent.coordinate,
        cost: 'a',
        onPress: () => navigation.navigate('SelectTurtle'),
      },
    ]);
  }

  // TODO: route.params.email is undefined at times
  const email = route.params?.email || 'cek26@students.calvin.edu';

  // builds the map to the user's location
  return (
    <View style={{ flex: 1 }}>
      <TurtleMapView
        mapType='hybrid'
        markers={markerList}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        scrollEnabled={true}
        showsMyLocationButton={false}

        //onLongPress={handlePress}
      />

      <IconButton
        onPress={() =>
          navigation.navigate('Settings', {
            email,
          })
        }
        name={'settings'}
        size={45}
        containerStyle={{
          left: 7,
          bottom: 7,
          position: 'absolute',
          flexDirection: 'row',
        }}
      />

      <IconButton
        onPress={() => navigation.navigate('SelectTurtle')}
        name={'add-location'}
        size={45}
        containerStyle={{
          right: 7,
          top: 7,
          position: 'absolute',
          flexDirection: 'row',
        }}
      />

      <Button
        onPress={() => {
          setUserSignedIn(false);
        }}
        title={'Logout'}
        style={{
          right: 7,
          bottom: 7,
          position: 'absolute',
          flexDirection: 'row',
          borderRadius: 100,
        }}
        type={'solid'}
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
