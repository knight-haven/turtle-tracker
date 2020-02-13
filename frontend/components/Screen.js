import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

/*
    Basic Screen wrapper for all screens.
*/
export default function Screen(props) {

    return (
        <View style={styles.background}>
            <ScrollView
                style={styles.content}
                refreshControl={props.refreshControl}
            >
                {props.children}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#F5F5F5',
    },
    content: {

    }
});