import React from 'react';
import Button from '../components/Button';
import Screen from '../components/Screen';
import { LinearGradient } from 'expo-linear-gradient';

// SEE STRAVA LOGIN FLOW
// TODO: make a stylesheet.
// TODO: make navigation buttons green, like strava orange.
// TODO: use this api for user photos: https://docs.microsoft.com/en-us/previous-versions/office/office-365-api/api/version-2.0/photo-rest-operations
export default function LandingScreen({ navigation }) {
    return (
        <Screen>
            {/* <Button
                title={"Sign in with Outlook"}
                onPress={() => navigation.navigate("ADLogin")}
            /> */}
            <Button
                title={'submit'}
                bold={true}
                type={"solid"}
                title={"Sign in"}
                raised={true}
                onPress={() => navigation.navigate("AltLogin")}
                ViewComponent={LinearGradient}
                linearGradientProps={{
                    colors: ['lime', 'green'],
                    start: { x: 0, y: 0 },
                    end: { x: .8, y: .8 },
                }}
            />
        </Screen>
    )
}