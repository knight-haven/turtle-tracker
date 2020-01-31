import React, { useState } from 'react';
import { Button, Platform, Image, StyleSheet, View, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import IconButton from '../components/IconButton';

export default function CameraGallery({parentCallback}) {

  const [images, setImages] = useState([{uri: 'https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1405/tackgalichstudio140500025/28036032-question-mark-symbol-on-gray-background.jpg'}]);

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
      
      if (images[0].uri == 'https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1405/tackgalichstudio140500025/28036032-question-mark-symbol-on-gray-background.jpg') {
        setImages([result]);
        if (parentCallback != undefined) {
          parentCallback([result]);
        }
      }
      else {
        setImages([...images, result])
        if (parentCallback != undefined) {
          parentCallback([...images, result]);
        }
      }
    }
  }

  // creates the buttons and shows the selected images
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        {
          images.map((item, index) => (
            <Image key={index} source={{uri: item != null ? item.uri : null, width: 200, height: 200}} style={styles.imageStyle}/>
          ))
        }
      </ScrollView>

      <View style={styles.takePicButtons}>
        <IconButton
          size = {35} 
          onPress={takeImage}
          name = {'add-a-photo'}
          styles = {{alignSelf: 'center', position: 'relative', paddingTop: 5, paddingBottom: 5}} 
          />
        
        <IconButton
          size = {35} 
          onPress={pickImage}
          name = {'perm-media'}
          styles = {{alignSelf: 'center', position: 'relative', paddingTop: 5, paddingBottom: 5}} 
          />

      </View>
    </View>
  );
}

const styles= StyleSheet.create({

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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
});

// reference/source: https://docs.expo.io/versions/latest/sdk/imagepicker/