import React, { useContext } from 'react';
import { ReactNativeAD, ADLoginView } from 'react-native-azure-ad'
import { Text, View } from 'react-native';
import { ADContext } from '../services/ActiveDirectory';

const CLIENT_ID = '1cc5ab7b-ae5c-40d7-b267-4f1302adcd86'

/*
 taken from https://github.com/wkh237/react-native-azure-ad.
*/
class LandingView extends React.Component {

    /* doesn't like const */
    // HOOKS can only be called with a fn component.
    // AD = useContext(ADContext);

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

        // new ReactNativeAD({
        //     client_id: CLIENT_ID,
        //     resources: [
        //         'https://outlook.office365.com'
        //     ]
        // })

        let AD = this.context;
        // TODO: Currently, AD is undefined. Could be the order things are called?
        // Like App doesn't provide the context in the right order?
        console.log('hi')
        console.log(AD)

        return (

            <View style={{ height: "100%", backgroundColor: 'grey' }}>
                <Text>Hello</Text>
                {/* <ADLoginView
                            context={AD.getContext(CLIENT_ID)}
                            onSuccess={this.onLoginSuccess.bind(this)}
                            needLogout={true}
                        /> */}
            </View>
        )
    }

    onLoginSuccess(credentials) {
        console.log(credentials)
        this.props.navigation.navigate({ routeName: 'Map' })
        // use the access token ..
    }
}
LandingView.contextType = ADContext;
console.log(ADContext) // TODO: THIS WORKS HERE!
// https://reactjs.org/docs/context.html
export default LandingView;