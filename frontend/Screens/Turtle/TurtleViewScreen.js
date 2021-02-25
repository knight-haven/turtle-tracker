import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import Gallery from '../../components/Gallery';
import HeaderButton from '../../components/HeaderButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import Screen from '../../components/Screen';
import SightingCard from '../../components/SightingCard';
import s from '../../components/Styles';
import TurtleCard from '../../components/TurtleCard';
import TurtleMapView from '../../components/TurtleMapView';
import { BACKEND_SECRET, BASE_URL, firebase } from '../../env';

/*
    TurtleViewScreen views the contents of one turtle
*/
export default function TurtleViewScreen({ navigation }) {
  const [loading, setLoading] = useState(true);

  // Update the sighting table.
  function getDerivedTurtleInfo(sightings) {
    (oDate = new Date(99999999999999)), (rDate = new Date(0)), (rLength = 0);
    for (var i = 0; i < sightings.length; i++) {
      var sightingDate = new Date(Date.parse(sightings[i].time_seen));
      if (sightingDate.getTime() < oDate.getTime()) {
        oDate = sightingDate;
        navigation.setParams({ originalDate: sightingDate });
      }
      if (sightingDate.getTime() > rDate.getTime()) {
        rDate = sightingDate;
        rLength = sightings[i].carapace_length;
        navigation.setParams({
          recentDate: sightingDate,
          recentLength: sightings[i].carapace_length,
        });
      }
    }
    onOriginalDateChange(oDate);
    onRecentDateChange(rDate);
    onRecentLengthChange(rLength);
  }

  async function getTurtleById(id) {
    return fetch(BASE_URL + `/turtle/${id}`, {
      headers: new Headers({ Authorization: `Bearer ` + BACKEND_SECRET }),
    })
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
    return fetch(BASE_URL + `/sighting/turtle/${id}`, {
      headers: new Headers({ Authorization: `Bearer ` + BACKEND_SECRET }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        getDerivedTurtleInfo(responseJson);
        onSightingsChange(responseJson);
        var markers = [];
        for (var i = 0; i < responseJson.length; i++) {
          sightingId = responseJson[i].id;
          markers.push({
            coordinate: {
              latitude: responseJson[i].latitude,
              longitude: responseJson[i].longitude,
            },
            cost: 'a',
            onPress: () =>
              props.navigation.navigate('SightingView', { id, sightingId }),
          });
        }
        onMarkerListChange(markers);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getTurtleImages(turtleId) {
    return fetch(BASE_URL + `/photo/turtle/${turtleId}`, {
      headers: new Headers({ Authorization: `Bearer ` + BACKEND_SECRET }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        var imageList = [];
        for (var i = 0; i < responseJson.length; i++) {
          imageList.push({ uri: await getPhoto(responseJson[i].name) });
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
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const turtleId = navigation.getParam('turtleId');
  const [turtle, onTurtleChange] = useState({});
  const [sightings, onSightingsChange] = useState([]);
  const [markerList, onMarkerListChange] = useState([]);
  const [originalDate, onOriginalDateChange] = useState(
    new Date(99999999999999),
  );
  const [recentDate, onRecentDateChange] = useState(new Date(0));
  const [recentLength, onRecentLengthChange] = useState(0);
  const [images, onImagesChange] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  function refresh() {
    setRefreshing(true);
    const turtleId = navigation.getParam('turtleId');
    getTurtleById(turtleId);
    getSightingByTurtleId(turtleId);
    getTurtleImages(turtleId);
  }

  const onRefresh = useCallback(() => {
    refresh();
  }, [refreshing]);

  useEffect(() => {
    setLoading(true);
    getTurtleById(turtleId);
    getSightingByTurtleId(turtleId);
    getTurtleImages(turtleId);
    navigation.setParams({
      refreshTurtleView: refresh,
      refreshTurtleList: navigation.getParam('refreshTurtleList'),
    });
  }, []);

  return (
    <Screen
      contentStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loading && !refreshing && <LoadingSpinner animating={loading} />}
      {!loading && (
        <View>
          <TurtleCard
            turtle={turtle}
            originalDate={
              originalDate.valueOf() > 9999999999999
                ? new Date(undefined)
                : originalDate
            }
            recentDate={
              recentDate.valueOf() <= 0 ? new Date(undefined) : recentDate
            }
            recentLength={recentLength}
            markerList={markerList}
            images={images}
          />
          <View style={[s.card, s.shadow]}>
            <TurtleMapView
              markers={markerList}
              pointerEvents='none'
              latitude={
                markerList.length > 0 ? markerList[0].coordinate.latitude : null
              }
              longitude={
                markerList.length > 0
                  ? markerList[0].coordinate.longitude
                  : null
              }
            />
          </View>
          {images != undefined && images.length > 0 ? (
            <View style={[s.card, s.shadow]}>
              <Gallery images={images} />
            </View>
          ) : null}
          {sightings.map((item, index) => (
            <SightingCard
              key={index + 1}
              sighting={item}
              navigation={navigation}
              refresh={refresh}
            />
          ))}
        </View>
      )}
    </Screen>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { backgroundColor: 'transparent', shadowColor: 'transparent' },
  head: { height: 40, backgroundColor: '#edffed' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 28 },
  text: { textAlign: 'center' },
  btn: {
    width: 58,
    height: 18,
    marginLeft: 15,
    backgroundColor: '#c8e1ff',
    borderRadius: 2,
  },
  btnText: { textAlign: 'center' },
});

// Sets the navigation options.
TurtleViewScreen.navigationOptions = ({ navigation }) => ({
  title:
    navigation.getParam('turtle') == null
      ? ''
      : navigation.getParam('turtle').mark,
  headerRight: () => (
    <HeaderButton
      onPress={() =>
        navigation.navigate('TurtleEdit', {
          edit: 'true',
          turtle: navigation.getParam('turtle'),
          originalDate: navigation.getParam('originalDate'),
          recentDate: navigation.getParam('recentDate'),
          recentLength: navigation.getParam('recentLength'),
          refreshTurtleView: navigation.getParam('refreshTurtleView'),
          refreshTurtleList: navigation.getParam('refreshTurtleList'),
        })
      }
      name={'edit'}
    />
  ),
  headerLeft: () => (
    <HeaderButton
      onPress={() => navigation.goBack()}
      name={'navigate-before'}
    />
  ),
});
