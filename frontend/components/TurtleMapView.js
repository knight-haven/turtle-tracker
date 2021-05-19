import React from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

/*
    TurtleMapView is a custom MapView
    To get it working on rn-web, see below.
    Ref: https://github.com/necolas/react-native-web/issues/1363#issuecomment-662280515
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
        {/* TODO: does not seem like markers are working */}
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
