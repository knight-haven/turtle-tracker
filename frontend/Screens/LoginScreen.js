import React from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { ADLoginView, ReactNativeAD } from 'react-native-azure-ad';
import { AD_LOGIN, USERS } from '../env';

const CLIENT_ID = AD_LOGIN.client_id

/*
 taken from https://github.com/wkh237/react-native-azure-ad.
*/
export default class LandingView extends React.Component {
  constructor(props) {
    super(props)
    this.AzureADContext = {
      client_id: CLIENT_ID,
      authority_host: 'https://login.microsoftonline.com/common/oauth2/authorize',
      // This is required if client_id is a web application id
      // but not recommended doing this way.
      client_secret: AD_LOGIN.client_secret,
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
          hideAfterLogin={true}
        />
      </SafeAreaView>
    )
  }

  async onLoginSuccess(credentials) {
    let access_token = credentials['https://outlook.office365.com'].access_token
    let username = " "
    let emailAddress = ""
    await fetch('https://outlook.office.com/api/v2.0/me', { headers: new Headers({ 'Authorization': `Bearer ` + access_token }) })
      .then((response) => response.json())
      .then((responseJson) => {
        username = responseJson['Alias']
        emailAddress = responseJson['EmailAddress']
      })
      .catch((error) => {
        console.error(error);
      });
    if (USERS.includes(username)) {
      this.props.navigation.navigate('Map', { email: emailAddress })
    }
    else {
      Alert.alert(
        `${username} does not have permission`,
        "Ask Jen to add your account if this is a mistake",
        [{ text: "Close", onPress: () => { } }],
        { cancelable: false }
      );
      this.props.navigation.goBack()
    }
  }
}
