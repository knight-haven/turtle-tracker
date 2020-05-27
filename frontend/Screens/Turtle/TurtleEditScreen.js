import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import Screen from '../../components/Screen';
import HeaderButton from '../../components/HeaderButton';
import TextField, { setFieldValue } from '../../components/TextField';
import Button from '../../components/Button';
import { BASE_URL, BACKEND_SECRET } from '../../env';

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
export default function TurtleEditScreen({ navigation }) {
    function editTurtleById(id) {
        return fetch(BASE_URL + `/turtle/${id}`, {
            method: 'PUT',
            headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ` + BACKEND_SECRET }),
            body: JSON.stringify({
                number,
                mark: carapaceMark,
                sex
            })
        })
            .catch((error) => {
                console.error(error);
            });
    }

    function createTurtle(number, mark, sex) {
        return fetch(BASE_URL + `/turtle`, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ` + BACKEND_SECRET }),
            body: JSON.stringify({
                number,
                mark,
                sex
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                navigation.navigate("SightingEdit", { turtleId: responseJson })
            });
    }

    const radio_props = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
    ];

    const [number, setNumber] = useState('');
    const [carapaceMark, setCarapaceMark] = useState('');
    const [sex, setSex] = useState('male');

    isEdit = navigation.getParam('edit') != undefined && navigation.getParam('edit')

    useEffect(() => {
        if (isEdit) {
            turtleProps = navigation.getParam('turtle');
            originalDate = navigation.getParam('originalDate');
            recentDate = navigation.getParam('recentDate');
            recentLength = navigation.getParam('recentLength');
            if (turtleProps != null) {
                const {
                    turtle_number,
                    mark,
                    sex,
                } = turtleProps;
                if (turtle_number != null) {
                    setNumber(turtle_number.toString())
                    setFieldValue(numRef, turtle_number.toString())
                }
                if (mark != null) {
                    setCarapaceMark(mark)
                    setFieldValue(markRef, mark)
                }
                if (sex != null) {
                    setSex(sex)
                    buttonRef.current.state.is_active_index = sex == 'male' ? 0 : 1 // 1 = female
                }
            }
        }
    }, [])

    numRef = React.createRef()
    markRef = React.createRef()
    buttonRef = React.createRef()

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
                        label={'Turtle Number:'}
                        onChangeText={number => setNumber(number)}
                        value={number}
                        reference={numRef}
                    />
                    {/* <TurtleTextInput titleText='Date Found: ' onChangeText={originalDateEdit => setOriginalDate(originalDateEdit)} value={originalDateEdit} placeholder="Original Sighting Date"/> */}
                    {/* <TurtleTextInput titleText='Date Last Seen: ' onChangeText={recentDateEdit => setRecentDate(recentDateEdit)} value={recentDateEdit} placeholder="Most Recent Sighting Date"/> */}
                    <TextField
                        label={"Mark:"}
                        onChangeText={newMark => setCarapaceMark(newMark)}
                        value={carapaceMark}
                        reference={markRef}
                    />
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}>
                        {'Sex: '}
                    </Text>
                    <View style={{ width: '100%' }}>
                        <RadioForm
                            ref={buttonRef}
                            radio_props={radio_props}
                            initial={-1}
                            onPress={(value) => { setSex(value) }}
                            buttonColor={'green'}
                            selectedButtonColor={'green'}
                        />
                    </View>
                    {/* <TurtleTextInput titleText='Carapace Length: ' onChangeText={length => setLength(length)} value={length} placeholder="Most Recent Carapace Measurement"/> */}
                </View>
                <View style={styles.container}>
                    <Button
                        bold={true}
                        type={"solid"}
                        title={"submit turtle"}
                        onPress={isEdit != undefined && isEdit == "true" ?
                            () => {
                                editTurtleById(turtleProps.id),
                                    navigation.goBack(),
                                    navigation.state.params.refreshTurtleView()
                            } :
                            () => {
                                createTurtle(number, carapaceMark, sex)
                            }
                        }
                    />
                </View>
            </View>
        </Screen>

    );
}

// Sets the navigation options.
TurtleEditScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('edit') != undefined && navigation.getParam('edit') ? 'Edit Turtle' : 'Add Turtle',
    headerLeft: () => (
        <HeaderButton
            onPress={() => navigation.goBack()}
            name={'navigate-before'}
        />
    ),
});