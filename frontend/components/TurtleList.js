import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, RefreshControl, SnapshotViewIOS } from 'react-native';
import { ListItem } from 'react-native-elements';
import * as firebase from 'firebase';
import TurtleListItem from './TurtleListItem';
import Screen from '../components/Screen';

/*
  TurtleList displays a list of all of the turtles in the Eco Preserve.
  Each list element is a turtle which can be tapped on to get more info.
*/
export default function TurtleList(props) {
  function getTurtles() {
    return fetch(`https://turtletrackerbackend.herokuapp.com/turtle`)
      .then((response) => response.json())
      .then(async (responseJson) => {
        for (var i = 0; i < responseJson.length; i++) {
          try {
            let turtleId = responseJson[i].id
            let photoName = await getTurtleAvatar(turtleId)
            if (photoName != null) {
              let url = await getPhoto(photoName)
              responseJson[i].avatar = url
            }
          } catch (e) {
            console.log(e)
          }
        }
        onTurtleListChange(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function getTurtleAvatar(turtleId) {
    try {
      let response = await fetch(`https://turtletrackerbackend.herokuapp.com/photo/turtle/${turtleId}`);
      let responseJson = await response.json();
      if (responseJson.length > 0) {
        return responseJson[0].name;
      }
      return null;
    }
    catch (error) {
      console.error(error);
    }
  }

  async function getPhoto(photoName) {
    const ref = firebase.storage().ref().child(`images/${photoName}`);
    return await ref.getDownloadURL();
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getTurtles();
    setRefreshing(false);
  }, [refreshing]);

  const [turtleList, onTurtleListChange] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  useEffect(() => { getTurtles() }, []);
  return (
    <Screen
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {props.navigation.state.routeName == "SelectTurtle" ?
        <View>
          <ListItem
            leftAvatar
            title="New Turtle"
            chevron
            bottomDivider
            onPress={() => { props.navigation.navigate('TurtleEdit') }}
          />
          <Text style={{ fontSize: 18, fontWeight: 'bold', paddingTop: 8, textAlign: 'center' }}>Existing Turtles</Text>
        </View> : null}
      {
        turtleList.map((item, index) => (
          <TurtleListItem
            key={index + 1}
            item={item}
            onPressPage={props.onPressPage}
            navigation={props.navigation}
          />
        ))
      }
    </Screen>
  )
}