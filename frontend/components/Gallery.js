import React, { useState } from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';

export default class Gallery extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          images: this.props.images == null ? [{uri: 'https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1405/tackgalichstudio140500025/28036032-question-mark-symbol-on-gray-background.jpg'}] : this.props.images,
        };
      }

    addImage(image) {
        this.setState(prevState => ({
            images: [...prevState.images, image]
        }))
    }

    setAllImages(imagesList) {
        this.setState(() => ({
            images: imagesList
        }))
    }

    render() {
        let { images } = this.state

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