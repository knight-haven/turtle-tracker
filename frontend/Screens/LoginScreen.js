import React from 'react';
import { ReactNativeAD, ADLoginView } from 'react-native-azure-ad'
import { SafeAreaView } from 'react-native';

// TODO: make this an envar
const CLIENT_ID = '1cc5ab7b-ae5c-40d7-b267-4f1302adcd86'

/*
 taken from https://github.com/wkh237/react-native-azure-ad.
*/
export default class LandingView extends React.Component {
    constructor(props) {
        super(props)
        this.AzureADContext = {
            client_id: CLIENT_ID,
            // Optional
            redirect_url: 'http://localhost:8080',
            // Optional
            authority_host: 'https://login.microsoftonline.com/common/oauth2/authorize',
            // Optional
            tenant: 'common',
            // Optional
            prompt: 'none',
            // Optional
            login_hint: 'user@domain.com',
            // This is required if client_id is a web application id
            // but not recommended doing this way.
            client_secret: '4Xko]:wIu5@sGE_28IUxbR-Xr4Xyd2Np',
            resources: [
                'https://graph.microsoft.com',
                'https://outlook.office365.com',
                // ... more resources
            ]
        }
    }

    render() {

        // Create instance, accessed with ReactNativeAD.getContent(CLIENT_ID) 
        new ReactNativeAD({
            client_id: CLIENT_ID,
            resources: [
                'https://outlook.office365.com'
            ]
        })

        return (
            // TODO: Make needLogout a global var to trigger when app is closed? https://stackoverflow.com/questions/38677137/react-native-is-there-a-callback-function-for-when-your-app-is-closed
            <SafeAreaView style={{ height: "100%", backgroundColor: 'white' }}>
                <ADLoginView
                    context={ReactNativeAD.getContext(CLIENT_ID)}
                    onSuccess={this.onLoginSuccess.bind(this)}
                    needLogout={true}
                    scalesPageToFit={true}
                    bounces={false}
                />
            </SafeAreaView>
        )
    }

    onLoginSuccess(credentials) {
        console.log(credentials)
        this.props.navigation.navigate({ routeName: 'Map' })
        // use the access token ..
    }
}
