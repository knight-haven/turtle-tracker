import { StyleSheet } from 'react-native';

/* A Shared StyleSheet
*/

export default StyleSheet.create({
    shadow: {

        // TODO? Maybe remove this UI feature.
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    card: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 7,
        marginTop: 4,
        marginBottom: 4,
        justifyContent: 'space-evenly',
    },
});