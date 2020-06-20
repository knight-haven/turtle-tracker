import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import Gallery from '../components/Gallery';

export default function CameraGallery({ parentCallback, imageList }) {
  const [images, setImages] = useState(imageList == undefined ? [] : imageList);

  // takes an image using the camera and appends it to the images
  async function takeImage() {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });
    saveImage(result);
  };

  // retrieves an image from a gallery
  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false
    });
    saveImage(result);
  }

  function saveImage(result) {
    if (!result.cancelled) {
      setImages([...images, result]);
      if (parentCallback != undefined) {
        parentCallback([...images, result]);
      }
    }
  }

  // creates the buttons and shows the selected images
  return (
    <View>
      <Gallery
        images={images}
      />

      <View style={styles.takePicButtons}>
        <Button
          style={styles.button}
          title={'Take Photo'}
          onPress={takeImage}
          iconName={'camera'}
        />
        <Button
          style={styles.button}
          title={'Upload Photo'}
          onPress={pickImage}
          iconName={'folder-multiple-image'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  contentContainer: {
    paddingLeft: 65,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  imageStyle: {
    flex: 1,
    margin: 15,
  },
  takePicButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    flexWrap: "wrap",
  },
  button: {
    marginTop: 3,
  }
});

// reference/source: https://docs.expo.io/versions/latest/sdk/imagepicker/