import React, {useState, useEffect, useCallback} from 'react';
import { View, RefreshControl } from 'react-native';
import TurtleListItem from './TurtleListItem'
import { ListItem } from 'react-native-elements';
import { firebase } from '../env';
import Screen from '../components/Screen';
import LoadingSpinner from './LoadingSpinner';

/*
  TurtleList displays a list of all of the turtles in the Eco Preserve.
  Each list element is a turtle which can be tapped on to get more info.
  TODO: Fix this naming convetion. This has a screen but is a component.
*/
export default function TurtleList(props) {
  function getTurtles() {
    setLoading(true);
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
        setLoading(false);
        setRefreshing(false);
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
  }, [refreshing]);

  const [turtleList, onTurtleListChange] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false);
  useEffect(() => {getTurtles()}, []);
  return (
    <Screen
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      {
        loading && !refreshing && 
        <LoadingSpinner animating={loading}/>
      }
    
    { props.navigation.state.routeName == "SelectTurtle" ? 
    !loading && <View>
      <ListItem
        leftAvatar
        title="New Turtle"
        chevron
        bottomDivider
        onPress={() => {props.navigation.navigate('TurtleEdit')}}
      />
    </View>: null }
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

