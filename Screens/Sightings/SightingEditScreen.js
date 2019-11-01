import React, {useState} from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import TurtleText from '../../components/TurtleText';
import TurtleProfileTextInput from '../../components/TurtleProfileTextInput';

/*
SightingEditScreen is for editing the information of a specific citing.
*/
export default function SightingEditScreen({navigation}){
    const [length, setLength] = useState('length');
    const [date, setDate] = useState('date');
    const [notes, setNotes] = useState('notes');
    const [img, setImg] = useState('img');
        return (
            <ScrollView>
                <TurtleText titleText="Sighting #1" />
                <TurtleText titleText={`Turtle #1`} />
                <TurtleText titleText="Mark: " baseText={`1`} />
                <TurtleText titleText="Date: " baseText={`${Date.now()}`} />
                <TurtleText titleText="Length: " baseText={`14 cm`} />
                <TurtleText titleText="Location: " baseText="42.9313086715985, -85.58243000000002" />
                {/* <TurtleProfileTextInput titleText='Mark: ' onChangeText={newMark => setCarapaceMark(newMark)} value={carapaceMark} placeholder={turtleProps.mark}/> */}
                <Text>Turtle length: </Text><TextInput 
                    style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1, borderRadius:3, textAlign:'center' }}
                    onChangeText={l => setLength(l)}
                    value={length}
                />
                <Text>Notes: </Text><TextInput 
                    style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1, borderRadius:3, textAlign:'center' }}
                    onChangeText={notes => setNotes(notes)}
                    value={notes}
                />
                {/* for the image:
                https://facebook.github.io/react-native/docs/cameraroll.html  */}
                {/* date picker has android and ios versions on reacts website, but someone combined them here. 
                will spend time later setting this up
                https://github.com/react-native-community/react-native-datetimepicker#react-native-datetimepicker */}
                <Button title="Submit" onPress={() => navigation.goBack()}/>
            </ScrollView>
        );

}

// Sets the navigation options.
SightingEditScreen.navigationOptions = ({ navigation }) => ({
    title: 'Add Sighting',
});