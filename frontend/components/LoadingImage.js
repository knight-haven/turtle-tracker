import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import LoadingSpinner from './LoadingSpinner';

export default function LoadingImage(props) {
  const [loading, setLoading] = useState(true)

  return (
    <View>
      {loading &&
        <View style={styles.spinnerContainer}>
          <LoadingSpinner animating={loading} />
        </View>
      }
      <Image
        {...props}
        onLoad={() => { setLoading(false) }}
      />
    </View>
  )
}

const styles = StyleSheet.create({

  spinnerContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
})