import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

/*
    Basic Screen wrapper for all screens.
    TODO: Allow for content to remove margin. See Turtle List View.
*/
export default function Screen(props) {
    return (
        <ScrollView style={styles.background}
            refreshControl={props.refreshControl}
        >
            <View
                style={[styles.content, props.contentStyle]}
            >
                {props.children}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#F5F5F5',
        height: '100%',
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 7,
        marginTop: 7,
        marginBottom: 7,

        // TODO? Maybe remove this UI feature.
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    }
});