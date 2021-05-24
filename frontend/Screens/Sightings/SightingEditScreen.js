import { StackActions } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import uuidv1 from 'uuid/v1';
import Button from '../../components/Button';
import CameraGallery from '../../components/CameraGallery';
import DatePicker from '../../components/DatePicker';
import DeleteButton from '../../components/DeleteButton';
import Divider from '../../components/Divider';
import Gallery from '../../components/Gallery';
import Screen from '../../components/Screen';
import TextField, { setFieldValue } from '../../components/TextField';
import TurtleMapView from '../../components/TurtleMapView';
import TurtleText from '../../components/TurtleText';
import { BACKEND_SECRET, BASE_URL, firebaseApp } from '../../env';

const isWeb = Platform.OS === 'web';

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
export default function SightingEditScreen({ route, navigation }) {
  const tempId = route.params.turtleId;
  const sighting = route.params.sighting;
  const isEdit = route.params.edit || false;
  const imageList = route.params.images;
  useEffect(() => {
    getTurtleById(tempId);
  }, []);

  const [turtle, setTurtle] = useState({});
  const [turtleNumber, setTurtleNumber] = useState('');
  const [length, setLength] = useState('');
  const [date, setDate] = useState(new Date(Date.now()));
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [markerList, setMarkerList] = useState([]);
  const [images, setImages] = useState(imageList == undefined ? [] : imageList);
  const [latitude, setLatitude] = useState(42.93187);
  const [longitude, setLongitude] = useState(-85.58213);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setLatitude(sighting.latitude);
      setLongitude(sighting.longitude);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setMarkerList([
            {
              coordinate: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
            },
          ]);
        },
        () => ({ enableHighAccuracy: true, timeout: 30000, maximumAge: 2000 }),
      );
    }
  }, []);

  useEffect(() => {
    if (isEdit && sighting != null) {
      const { carapace_length, time_seen, turtle_location, notes } = sighting;
      if (carapace_length != null) {
        setLength(carapace_length.toString());
        setFieldValue(lengthRef, carapace_length);
      }
      if (time_seen != null) {
        setDate(new Date(Date.parse(time_seen)));
        setFieldValue(dateRef, moment(time_seen).format('L'));
      }
      if (turtle_location != null) {
        setLocation(turtle_location);
        setFieldValue(locRef, turtle_location);
      }
      if (notes != null) {
        setNotes(notes);
        setFieldValue(notesRef, notes);
      }
      if (route.params.markerList != null) {
        setMarkerList(route.params.markerList);
      }
    }
  }, []);

  function getTurtleById(id) {
    return fetch(BASE_URL + `/turtle/${id}`, {
      headers: new Headers({ Authorization: `Bearer ` + BACKEND_SECRET }),
    })
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
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + BACKEND_SECRET,
      }),
      body: JSON.stringify({
        turtleId,
        time: moment(date).format(),
        location,
        latitude: sighting.latitude,
        longitude: sighting.longitude,
        length: parseInt(length),
        notes,
      }),
    }).catch((error) => {
      console.error(error);
    });
  }

  async function createSighting(turtleId, latitude, longitude) {
    const response = await fetch(BASE_URL + `/sighting`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + BACKEND_SECRET,
      }),
      body: JSON.stringify({
        turtleId,
        time: moment(date).format(),
        location,
        latitude,
        longitude,
        length: parseInt(length),
        notes,
      }),
    });
    const responseJson = await response.json();
    for (var i = 0; i < images.length; i++) {
      const UUID = uuidv1();
      await uploadPhoto(images[i].uri, UUID);
      await createPhoto(turtleId, responseJson, UUID);
    }
  }

  function createPhoto(turtleId, sightingId, name) {
    return fetch(BASE_URL + `/photo`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + BACKEND_SECRET,
      }),
      body: JSON.stringify({
        turtleId,
        sightingId,
        name,
      }),
    });
  }

  async function getLocationPermission() {
    const { status, permissions } = await Permissions.askAsync(
      Permissions.LOCATION_FOREGROUND,
    );
    if (status === 'granted') {
    } else {
      throw new Error('Location permission not granted');
    }
  }

  async function getCameraPermission() {
    const { status, permissions } = await Permissions.askAsync(
      Permissions.CAMERA,
    );
    if (status === 'granted') {
    } else {
      throw new Error('Camera permission not granted');
    }
  }

  async function getMediaLibraryPermission() {
    const { status, permissions } = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY,
    );
    if (status === 'granted') {
    } else {
      throw new Error('Media library permission not granted');
    }
  }

  async function uploadPhoto(uri, imageName) {
    const response = await fetch(uri);
    const responseBlob = await response.blob();
    var ref = firebaseApp
      .storage()
      .ref()
      .child('images/' + imageName);
    await ref.put(responseBlob);
  }

  function deleteSightingById(id) {
    return fetch(BASE_URL + `/sighting/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + BACKEND_SECRET,
      }),
    }).catch((error) => {
      console.error(error);
    });
  }

  function callback(image) {
    setImages(image);
  }

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setFieldValue(dateRef, moment(currentDate).format('L'));
  };

  const onDateClose = (d) => {
    if (d && Platform.OS !== 'ios') {
      setShowDatePicker(false);
      setDate(d);
      setFieldValue(dateRef, moment(d).format('L'));
    } else {
      setShowDatePicker(false);
    }
  };

  // TODO: Move this to ask when button is pressed.
  !isWeb && ggetLocationPermission();
  !isWeb && ggetCameraPermission();
  !isWeb && getMediaLibraryPermission();

  const dateRef = React.createRef();
  const locRef = React.createRef();
  const lengthRef = React.createRef();
  const notesRef = React.createRef();

  return (
    <Screen>
      <View>
        <View style={{ flexDirection: 'row' }}>
          <TurtleText titleText='Mark' baseText={turtle.mark} />
          <Divider />
          <TurtleText titleText='Turtle Number' baseText={turtleNumber} />
        </View>
        {/* used solely for spacing */}
        <Text> </Text>

        {/* text fields to be filled in by user */}
        <TouchableWithoutFeedback
          onPress={() => {
            setShowDatePicker(true);
          }}
        >
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
        {showDatePicker && (
          <DatePicker
            date={date}
            onChange={onDateChange}
            onClose={onDateClose}
          />
        )}
        <TextField
          label='Location: '
          onChangeText={(location) => {
            setLocation(location);
            if (Platform.OS !== 'ios') {
              setShowDatePicker(false);
            }
          }}
          value={location}
          reference={locRef}
        />
        <TextField
          label='Length: '
          onChangeText={(length) => {
            setLength(length);
            if (Platform.OS !== 'ios') {
              setShowDatePicker(false);
            }
          }}
          value={length}
          reference={lengthRef}
          suffix={'mm'}
        />
        <TextField
          label='Notes: '
          onChangeText={(notes) => {
            setNotes(notes);
            if (Platform.OS !== 'ios') {
              setShowDatePicker(false);
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
        pointerEvents='none'
        latitude={latitude}
        longitude={longitude}
      />
      {isEdit ? (
        <Gallery images={images} isDelete={isEdit} navigation={navigation} />
      ) : (
        <CameraGallery parentCallback={callback} imageList={images} />
      )}
      <View style={styles.container}>
        {/* // TODO: This gets rendered 4 times!!! Check into that. */}
        <Button
          bold={true}
          type={'solid'}
          title={isSubmitting ? 'submitting...' : 'submit sighting'}
          disabled={isSubmitting}
          onPress={
            // TODO: this doesn't navigate correctly after submitting
            isEdit
              ? async () => {
                  setIsSubmitting(true);
                  await editSightingById(sighting.id, turtle.id);
                  setIsSubmitting(false);
                  navigation.goBack();
                  route.params.refreshSightingView &&
                    route.params.refreshSightingView();
                }
              : async () => {
                  setIsSubmitting(true);
                  await createSighting(turtle.id, latitude, longitude);
                  setIsSubmitting(false);
                  const replaceAction = StackActions.replace('TurtleView', {
                    turtleId: turtle.id,
                  });
                  navigation.dispatch(replaceAction);
                  route.params.refreshTurtleView &&
                    route.params.refreshTurtleView();
                }
          }
        />
        {isEdit != undefined && isEdit ? (
          <View>
            <Text></Text>
            <DeleteButton
              title='delete sighting'
              alertTitle='Delete Sighting'
              alert='Are you sure you would like to delete this sighting?'
              onPress={async () => {
                await deleteSightingById(sighting.id);
                navigation.navigate('TurtleView');
                route.params.refreshTurtleView &&
                  route.params.refreshTurtleView();
              }}
            />
          </View>
        ) : null}
      </View>
    </Screen>
  );
}
