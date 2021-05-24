import React from 'react';
import { Alert, View } from 'react-native';
import { BACKEND_SECRET, BASE_URL } from '../env';
import IconButton from './IconButton';
import LoadingImage from './LoadingImage';

export default function DeleteImage({
  route,
  navigation,
  source,
  style,
  photoId,
}) {
  function deletePhotoById(id) {
    return fetch(BASE_URL + `/photo/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + BACKEND_SECRET,
      }),
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <View>
      <LoadingImage source={source} style={style} />
      <IconButton
        name='close'
        size={22}
        containerStyle={{
          paddingLeft: 7,
          paddingRight: 7,
          position: 'absolute',
        }}
        color='red'
        onPress={() =>
          Alert.alert(
            'Delete Photo',
            'Are you sure you would like to delete this photo?',
            [
              {
                text: 'No',
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: async () => {
                  await deletePhotoById(photoId);
                  navigation.navigate('SightingView');
                  route.params.refreshSightingView &&
                    route.params.refreshSightingView();
                },
              },
            ],
            { cancelable: false },
          )
        }
      />
    </View>
  );
}
