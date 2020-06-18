import React from 'react';
import { View, Alert } from 'react-native';
import LoadingImage from './LoadingImage';
import IconButton from './IconButton';
import { BASE_URL, BACKEND_SECRET } from '../env';

export default function DeleteImage({navigation, source, style, photoId}) {

    function deletePhotoById(id) {
        return fetch(BASE_URL + `/photo/${id}`, {
            method: 'DELETE',
            headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ` + BACKEND_SECRET }),
        })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <View>
            <LoadingImage
                source={source}
                style={style}
            />
            <IconButton
                name="close"
                size={22}
                containerStyle={{ paddingLeft: 7, paddingRight: 7, position: 'absolute' }}
                color="red"
                onPress= { () => 
                    Alert.alert(
                        "Delete Photo",
                        "Are you sure you would like to delete this photo?",
                        [
                            {
                            text: "No",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                            },
                            { text: "Yes", onPress: async () => {
                                await deletePhotoById(photoId)
                                navigation.navigate('SightingView')
                                navigation.state.params.refreshSightingView()
                                }
                            }
                        ],
                        { cancelable: false }
                        )
                    }
            />
        </View>
    )
}