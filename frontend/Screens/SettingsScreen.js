import React from 'react';
import { Alert, Text } from 'react-native';
import Button from '../components/Button';
import HeaderButton from '../components/HeaderButton';
import Screen from '../components/Screen';
import { BACKEND_SECRET, BASE_URL, USERS } from '../env';

/*
    SettingsScreen will be used to toggle the specific user settings.
*/
export default function SettingsScreen({ navigation }) {
  function sendCsv(email) {
    if (email == null) {
      Alert.alert("Could not access email")
      return
    }
    if (USERS.includes(email.split('@')[0])) {
      return fetch(BASE_URL + `/email/${email}`, { headers: new Headers({ 'Authorization': `Bearer ` + BACKEND_SECRET }) })
        .then((response) => {
          if (response.status == 200) {
            Alert.alert(`Email successfully sent to ${email}`)
          } else {
            Alert.alert(`Unable to send email`)
          }

        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // TODO: this relaunches app on android.
      // do nothing
    }
  }

  email = navigation.getParam('email')
  return (
    <Screen >
      <Button
        onPress={() => sendCsv(email)}
        title={"Send CSV"}
        type={"solid"}
      />
      <Text></Text>
      <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>How to use the Turtle Tracker App</Text>
      <Text></Text>
      <Text style={{ fontWeight: 'bold' }}>Section 1: View list of turtles</Text>
      <Text></Text>
      <Text>You can use the Turtle List on the Turtle Tracker App to view the list of seen turtles in the Calvin Ecosystem Preserve.</Text>
      <Text>Imagine you want to view a list of seen turtles quickly. This section will walk you through:</Text>
      <Text></Text>
      <Text>How to view the list of turtles.</Text>
      <Text></Text>
      <Text>These are the steps to view the turtle list:</Text>
      <Text></Text>
      <Text>Step One: Tap on the Turtles tab to see the list of seen turtles.</Text>
      <Text>Step Two: Scroll through the turtles to find the markings of the turtles and view their sex.</Text>
      <Text>Step Three: Tap on the turtle to find out more information on the turtle.</Text>
      <Text></Text>
      <Text style={{ fontWeight: 'bold' }}>Section 2: Add a Turtle Sighting</Text>
      <Text></Text>
      <Text>You can add turtle sightings directly from the map screen.</Text>
      <Text></Text>
      <Text>When using the app you will want to add a turtle sighting when you see one in the field. The steps in this section will walk you through:</Text>
      <Text></Text>
      <Text>Selecting the “add turtle sighting button”</Text>
      <Text>Entering information about the turtle sighting</Text>
      <Text>Submitting your turtle sighting</Text>
      <Text></Text>
      <Text>Step 1: Look in the upper-right corner of the map screen. Select the button with a white marker on a green background.</Text>
      <Text>Step 2: Scroll and find the turtle you have spotted, identified by its shell marking. If it is not on the list, select “New Turtle”.</Text>
      <Text>Step 3: Enter the location, length, and notes information into their respective fields.</Text>
      <Text>Step 4: Scroll down and tap “take a new picture” to navigate to your camera.</Text>
      <Text>Step 5: Take a photo of the turtle, crop it, and select “use photo” when you are satisfied.</Text>
      <Text>Step 6: Tap “Submit” at the bottom of the screen.</Text>
      <Text>Step 7: Your sighting has been submitted! Navigate back to the Turtle List and select your turtle to check for your sighting.</Text>
      <Text></Text>
      <Text style={{ fontWeight: 'bold' }}>Section 3: View Turtle Profiles</Text>
      <Text></Text>
      <Text>You can view turtle profiles directly from the Turtle List screen.</Text>
      <Text></Text>
      <Text>Turtle Profiles give basic information about a turtle. The profile includes the turtle’s mark, sex, and sighting information. Imagine you want to view the profile for a turtle. The steps in this section will walk you through:</Text>
      <Text></Text>
      <Text>How to view the profile for a turtle</Text>
      <Text></Text>
      <Text>Step 1: Click on the “Turtles” tab using the bottom navigation bar</Text>
      <Text>Step 2: Scroll through the list to find the turtle entry</Text>
      <Text>Step 3: Click on the turtle to view its profile</Text>
      <Text></Text>
      <Text style={{ fontWeight: 'bold' }}>Section 4: Spot turtles on a map</Text>
      <Text></Text>
      <Text>You can use the Tracker page on the Turtle Tracker App to view the previous sighting location of the box turtles at Calvin Ecosystem Preserve.</Text>
      <Text></Text>
      <Text>Each turtle icon on the map represents a sighting of a box turtle.</Text>
      <Text></Text>
      <Text>Clicking on a turtle icon on the map will show more information about the turtle.</Text>
      <Text></Text>
      <Text style={{ fontWeight: 'bold' }}>Section 5: Navigate App Using Navigation Bar</Text>
      <Text></Text>
      <Text>This section will help you switch from the Tracker tab to the Turtle tab.</Text>
      <Text></Text>
      <Text>Using the bar at the bottom of the screen, you can switch from the Tracker tab to the Turtles tab.</Text>
      <Text></Text>
      <Text>Tapping the Tracker will show the map with the turtles.</Text>
      <Text></Text>
      <Text>Tapping on the Turtles tab will show the list of seen turtles.</Text>
      <Text></Text>
      <Text style={{ fontWeight: 'bold' }}>Section 6: View Sightings for Turtle</Text>
      <Text></Text>
      <Text>Imagine you want to view a sighting for the turtle.</Text>
      <Text></Text>
      <Text>To view a sighting for a specific turtle:</Text>
      <Text></Text>
      <Text>Step One: Navigate to the Turtles tab to find the list of turtles</Text>
      <Text>Step Two: Find the turtle you wish to view sightings for on the list of turtles</Text>
      <Text>Step Three: Tap on the turtle to find sighting information about the turtle</Text>
      <Text>Step Four: To find additional information about a specific turtle turtle sighting, tap the ‘i’ button on the left hand side of the sighting row.</Text>
      <Text></Text>
    </Screen>
  );
}

SettingsScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <HeaderButton
      onPress={() => navigation.goBack()}
      name={'navigate-before'}
    />
  )
})