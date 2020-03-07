import React, { useState, useEffect } from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { OutlinedTextField } from 'react-native-material-textfield';
import RadioForm from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconButton from '../../components/IconButton';
import Screen from '../../components/Screen';

/*
Define a couple useful styles
*/
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingBottom: 7,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 4,
    },
    button: {
        backgroundColor: 'green',
        borderRadius: 4,
        height: 40,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
});

/*
    TurtleEditScreen allows for editing content of one turtle
*/
export default function TurtleEditScreen({ navigation }) {
    function editTurtleById(id) {
        return fetch(`https://turtletrackerbackend.herokuapp.com/turtle/${id}`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
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
        return fetch(`https://turtletrackerbackend.herokuapp.com/turtle`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
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
                if (turtleProps.turtle_number != null) {
                    setNumber(turtleProps.turtle_number.toString())
                    let { current: field } = numRef
                    field.setValue(turtleProps.turtle_number.toString())
                }
                if (turtleProps.mark != null) {
                    setCarapaceMark(turtleProps.mark)
                    let { current: field } = markRef
                    field.setValue(turtleProps.mark)
                }
                if (turtleProps.sex != null) {
                    setSex(turtleProps.sex)
                    buttonRef.current.state.is_active_index = turtleProps.sex == 'male' ? 0 : 1 // 1 = female
                }
            }
            // TODO: Removed this functionality now because we aren't able to edit the original date currently.
            // const [originalDateEdit, setOriginalDate] = useState(originalDate.toLocaleDateString());
            // const [recentDateEdit, setRecentDate] = useState(recentDate.toLocaleDateString());
            // const [length, setLength] = useState(recentLength.toString());
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
                    <OutlinedTextField
                        label='Turtle Number:'
                        onChangeText={number => setNumber(number)}
                        value={number}
                        fontSize={20}
                        labelFontSize={16}
                        tintColor="rgb(34,139,34)"
                        ref={numRef}
                    />
                    {/* <TurtleTextInput titleText='Date Found: ' onChangeText={originalDateEdit => setOriginalDate(originalDateEdit)} value={originalDateEdit} placeholder="Original Sighting Date"/> */}
                    {/* <TurtleTextInput titleText='Date Last Seen: ' onChangeText={recentDateEdit => setRecentDate(recentDateEdit)} value={recentDateEdit} placeholder="Most Recent Sighting Date"/> */}
                    <OutlinedTextField
                        label="Mark:"
                        onChangeText={newMark => setCarapaceMark(newMark)}
                        value={carapaceMark}
                        fontSize={20}
                        labelFontSize={16}
                        tintColor="rgb(34,139,34)"
                        ref={markRef}
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
                    {isEdit != undefined && isEdit == "true" ?
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                editTurtleById(turtleProps.id),
                                    navigation.goBack(),
                                    navigation.state.params.refreshTurtleView()
                            }}
                        >
                            <Text style={styles.buttonText}>{"SUBMIT"}</Text>
                        </TouchableOpacity>
                        : <TouchableOpacity
                            style={styles.button}
                            onPress={() => createTurtle(number, carapaceMark, sex)}
                        >
                            <Text style={styles.buttonText}>{"SUBMIT"}</Text>
                        </TouchableOpacity>}
                </View>
            </View>
        </Screen>

    );
}

// Sets the navigation options.
TurtleEditScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('edit') != undefined && navigation.getParam('edit') ? 'Edit Turtle' : 'Add Turtle',
    headerLeft: () => (

        //react-native-platform chooses which button to load based off of device's OS
        Component = Platform.select({
            ios: <IconButton
                size={20}
                onPress={() => navigation.goBack()}
                name={'navigate-before'}
                styles={{ paddingTop: 2, paddingLeft: 15 }}
            />,
            android: <Icon.Button
                size={20}
                onPress={() => navigation.goBack()}
                name={'navigate-before'}
                iconStyle={{ paddingLeft: 7 }}
                backgroundColor="green"
                color="white"
            />,
        })
    ),
});