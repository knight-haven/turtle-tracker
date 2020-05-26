import React from 'react';
import { ScrollView, SafeAreaView, View, StyleSheet } from 'react-native';
import s from './Styles';

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
                style={[styles.content, s.shadow, props.contentStyle]}
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
    }
});