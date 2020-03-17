import React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';

export default function Gallery({ images }) {

  return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        {
          images.map((item, index) => (
            <Image key={index} source={{uri: item != null ? item.uri : null, width: 200, height: 200}} style={styles.imageStyle}/>
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