import React from 'react';
import { SafeAreaView } from 'react-native';
import Button from '../components/Button';

// SEE STRAVA LOGIN FLOW
// TODO: make a stylesheet.
// TODO: make navigation buttons green, like strava orange.
export default function LandingScreen({ navigation }) {
    return (
        <SafeAreaView style={{ display: 'felx', backgroundColor: 'green' }}>
            <Button
                title={"Login"}
                onPress={() => navigation.navigate("ADLogin")}
            />
        </SafeAreaView>
    )
}