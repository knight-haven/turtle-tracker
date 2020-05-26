import React from 'react';
import { SafeAreaView } from 'react-native';
import Button from '../components/Button';

// SEE STRAVA LOGIN FLOW
// TODO: make a stylesheet.
// TODO: make navigation buttons green, like strava orange.
// TODO: use this api for user photos: https://docs.microsoft.com/en-us/previous-versions/office/office-365-api/api/version-2.0/photo-rest-operations
export default function LandingScreen({ navigation }) {
    return (
        <SafeAreaView>
            <Button
                title={"Login"}
                onPress={() => navigation.navigate("ADLogin")}
            />
        </SafeAreaView>
    )
}