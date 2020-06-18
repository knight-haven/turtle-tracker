import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import LoadingImage from './LoadingImage';
import DeleteImage from './DeleteImage';

export default function Gallery({navigation, images, isDelete}) {
  isDelete = isDelete != undefined && isDelete == true
  return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        {
          isDelete ? 
          images.map((item, index) => (
            <DeleteImage 
              key={index} 
              source={{uri: item != null ? item.uri : null, width: 200, height: 200}} 
              style={styles.imageStyle}
              navigation={navigation}
              photoId={item.id}
            />
            )) : images.map((item, index) => (
            <LoadingImage 
              key={index} 
              source={{uri: item != null ? item.uri : null, width: 200, height: 200}} 
              style={styles.imageStyle}
            />
          ))
        }
      </ScrollView>
    );
}

const styles= StyleSheet.create({

    contentContainer: {
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