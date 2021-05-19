import React from 'react';
import { Image, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import uuidv1 from 'uuid/v1';

/*
    TurtleMapView is a custom MapView
*/
export default function TurtleMapView({ markers, ...props }) {
  return (
    <View
      style={[
        { flex: 1 },
        {
          height: props.height ? props.height : 200,
          width: props.width ? props.width : '100%',
        },
      ]}
    >
      <MapView
        mapType='hybrid'
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        region={
          props.latitude != undefined && props.longitude != undefined
            ? {
                latitude: props.latitude,
                longitude: props.longitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
              }
            : {
                latitude: 42.93187,
                longitude: -85.58213,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
              }
        }
        scrollEnabled={false}
        {...props}
      >
        {markers?.map((marker) => {
          if (marker.coordinate.latitude && marker.coordinate.latitude) {
            return (
              <Marker key={uuidv1()} {...marker}>
                <Image
                  style={{ height: 40, width: 40 }}
                  source={require('../assets/turtle_outline.png')}
                />
              </Marker>
            );
          } else {
            return <></>;
          }
        })}
      </MapView>
    </View>
  );
}
