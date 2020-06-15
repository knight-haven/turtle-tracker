import React from 'react';
import { Alert } from 'react-native';
import Button from './Button'

export default function DeleteButton({title, alertTitle, alert, onPress}) {
    return (
        <Button
            bold={true}
            type={"solid"}
            title={title}
            color = "red"
            onPress={
                () => {
                    Alert.alert(
                        alertTitle,
                        alert,
                        [
                            {
                            text: "No",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                            },
                            { text: "Yes", onPress: onPress
                        }
                        ],
                        { cancelable: false }
                        );
                }
            }
        />
    )
}