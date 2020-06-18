import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { BACKEND_SECRET, BASE_URL, firebase } from '../env';
import useAxios from '../utils/axios';
import LoadingSpinner from './LoadingSpinner';
import Screen from './Screen';
import TurtleListItem from './TurtleListItem';

interface ITurtle {
  id: number;
  mark: string;
  sex: string;
  turtle_number: number;
}

/*
  TurtleList displays a list of all of the turtles in the Eco Preserve.
  Each list element is a turtle which can be tapped on to get more info.
  TODO: Fix this naming convetion. This has a screen but is a component.
  TODO: Remove all any's
*/
export const TurtleList = (props: any) => {
  const [{ data: turtles, error, loading }, fetchTurtles] = useAxios<ITurtle[]>(
    {
      method: 'get',
      url: '/turtle',
    },
    { manual: true },
  );
  const [refreshing, setRefreshing] = useState(false);

  // This runs on render, uses cache.
  // TODO: make sure that refreshing does not use cahche.
  useEffect(() => {
    fetchTurtles({}, { useCache: true }).then(() => {
      turtles.forEach((turtle) => {
        const [{ data: photo, error, loading }, fetchTurtles] = useAxios<
          ITurtle[]
        >({
          method: 'get',
          url: '/turtle',
        });
      });
    });
    console.log('runs');
  }, []);

  console.log('render list'); // Three times

  function getTurtles() {
    setLoading(true);
    return fetch(BASE_URL + `/turtle`, {
      headers: new Headers({ Authorization: `Bearer ` + BACKEND_SECRET }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log(responseJson);
        for (var i = 0; i < responseJson.length; i++) {
          try {
            let turtleId = responseJson[i].id;
            let photoName = await getTurtleAvatar(turtleId);
            if (photoName != null) {
              // TODO: This should be changed, because the await causes it to block if firebase is down.
              // Not sure the best way to fix it though. Usually is fine.
              let url = await getPhoto(photoName);
              responseJson[i].avatar = url;
            }
          } catch (e) {
            console.log(e);
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
      let response = await fetch(BASE_URL + `/photo/turtle/${turtleId}`, {
        headers: new Headers({ Authorization: `Bearer ` + BACKEND_SECRET }),
      });
      let responseJson = await response.json();
      if (responseJson.length > 0) {
        return responseJson[0].name;
      }
      return null;
    } catch (error) {
      console.error(error);
    }
  }

  async function getPhoto(photoName) {
    const ref = firebase.storage().ref().child(`images/${photoName}`);
    return await ref.getDownloadURL();
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // getTurtles();
  }, [refreshing]);

  // const [turtleList, onTurtleListChange] = useState([])
  // const [refreshing, setRefreshing] = useState(false)
  // const [loading, setLoading] = useState(false);
  // useEffect(() => { getTurtles() }, []);
  return (
    <Screen
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loading && !refreshing && <LoadingSpinner animating={loading} />}

      {props.navigation.state.routeName == 'SelectTurtle'
        ? !loading && (
            <View>
              <ListItem
                // leftAvatar
                title='New Turtle'
                chevron
                bottomDivider
                onPress={() => {
                  props.navigation.navigate('TurtleEdit');
                }}
              />
            </View>
          )
        : null}
      {turtles?.map((turtle, index) => (
        <TurtleListItem
          key={index + 1}
          item={turtle}
          onPressPage={props.onPressPage}
          navigation={props.navigation}
        />
      ))}
    </Screen>
  );
};

export default TurtleList;
