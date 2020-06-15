import React from 'react';
import { View, Text } from 'react-native';
import LoadingImage from './LoadingImage';
import DeleteButton from './DeleteButton';
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
            <DeleteButton
                title="delete photo"
                alertTitle="Delete Photo"
                alert="Are you sure you would like to delete this photo?"
                onPress= { async () => {
                    await deletePhotoById(photoId)
                    navigation.navigate('SightingView')
                    navigation.state.params.refreshSightingView()
                }
            }
            />
        </View>
    )
}