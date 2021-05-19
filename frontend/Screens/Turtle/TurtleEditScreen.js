import { StackActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import Button from '../../components/Button';
import DeleteButton from '../../components/DeleteButton';
import Screen from '../../components/Screen';
import TextField, { setFieldValue } from '../../components/TextField';
import { BACKEND_SECRET, BASE_URL } from '../../env';

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
    TurtleEditScreen allows for editing content of one turtle
*/
export default function TurtleEditScreen({ route, navigation }) {
  function editTurtleById(id) {
    return fetch(BASE_URL + `/turtle/${id}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + BACKEND_SECRET,
      }),
      body: JSON.stringify({
        number,
        mark: carapaceMark,
        sex,
      }),
    }).catch((error) => {
      console.error(error);
    });
  }

  function deleteTurtleById(id) {
    return fetch(BASE_URL + `/turtle/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + BACKEND_SECRET,
      }),
    }).catch((error) => {
      console.error(error);
    });
  }

  function createTurtle(number, mark, sex) {
    return fetch(BASE_URL + `/turtle`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + BACKEND_SECRET,
      }),
      body: JSON.stringify({
        number,
        mark,
        sex,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setIsSubmitting(false);
        const replaceAction = StackActions.replace({
          name: 'SightingEdit',
          params: { turtleId: responseJson },
        });
        navigation.dispatch(replaceAction);
      });
  }

  const radio_props = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const [number, setNumber] = useState('');
  const [carapaceMark, setCarapaceMark] = useState('');
  const [sex, setSex] = useState('male');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEdit = route.params?.edit || false;
  const turtleProps = route.params?.turtle;

  useEffect(() => {
    if (isEdit) {
      if (turtleProps) {
        const { turtle_number, mark, sex } = turtleProps;
        if (turtle_number) {
          setNumber(turtle_number.toString());
          setFieldValue(numRef, turtle_number.toString());
        }
        if (mark) {
          setCarapaceMark(mark);
          setFieldValue(markRef, mark);
        }
        if (sex) {
          setSex(sex);
          buttonRef.current.state.is_active_index = sex == 'male' ? 0 : 1; // 1 = female
        }
      }
    }
  }, []);

  const numRef = React.createRef();
  const markRef = React.createRef();
  const buttonRef = React.createRef();

  return (
    <Screen>
      <View style={{ flexDirection: 'column' }}>
        {/* { turtleProps.pictures.length > 0 ?
                        <Image style={{width: 150, height: 150}} source={{uri: turtleProps.pictures[0]}}/>
                        : null
                    } */}
        {/* TODO: This is a little danergous being able to update the mark number? Is it updating the db index? */}
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <TextField
            label={'Turtle Number'}
            onChangeText={(number) => setNumber(number)}
            value={number}
            reference={numRef}
          />
          {/* <TurtleTextInput titleText='Date Found: ' onChangeText={originalDateEdit => setOriginalDate(originalDateEdit)} value={originalDateEdit} placeholder="Original Sighting Date"/> */}
          {/* <TurtleTextInput titleText='Date Last Seen: ' onChangeText={recentDateEdit => setRecentDate(recentDateEdit)} value={recentDateEdit} placeholder="Most Recent Sighting Date"/> */}
          <TextField
            label={'Mark'}
            onChangeText={(newMark) => setCarapaceMark(newMark)}
            value={carapaceMark}
            reference={markRef}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            {'Sex: '}
          </Text>
          <View style={{ width: '100%' }}>
            <RadioForm
              ref={buttonRef}
              radio_props={radio_props}
              initial={-1}
              onPress={(value) => {
                setSex(value);
              }}
              buttonColor={'green'}
              selectedButtonColor={'green'}
            />
          </View>
          {/* <TurtleTextInput titleText='Carapace Length: ' onChangeText={length => setLength(length)} value={length} placeholder="Most Recent Carapace Measurement"/> */}
        </View>
        <View style={styles.container}>
          <Button
            bold={true}
            type={'solid'}
            title={isSubmitting ? 'submitting...' : 'submit turtle'}
            disabled={isSubmitting}
            onPress={
              isEdit != undefined && isEdit == 'true'
                ? async () => {
                    setIsSubmitting(true);
                    await editTurtleById(turtleProps.id);
                    setIsSubmitting(false);
                    navigation.goBack();
                    if (
                      navigation.state.params.refreshTurtleView != undefined
                    ) {
                      navigation.state.params.refreshTurtleView();
                    }
                  }
                : () => {
                    setIsSubmitting(true);
                    createTurtle(number, carapaceMark, sex);
                  }
            }
          />
          {isEdit != undefined && isEdit == 'true' ? (
            <View>
              <Text></Text>
              <DeleteButton
                title='delete turtle'
                alertTitle={`Delete Turtle ${carapaceMark}`}
                alert='Are you sure you would like to delete this turtle?'
                onPress={async () => {
                  await deleteTurtleById(turtleProps.id);
                  navigation.navigate('TurtleList');
                  if (navigation.state.params.refreshTurtleList != undefined) {
                    navigation.state.params.refreshTurtleList();
                  }
                }}
              />
            </View>
          ) : null}
        </View>
      </View>
    </Screen>
  );
}
