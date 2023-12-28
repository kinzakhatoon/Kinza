// MapScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

//route object provides access to the parameters passed to the navigator
export default function MapScreen({ route }) {
  //destructures the latitude and longitude parameters from the route.params
  const { latitude, longitude } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          //initial zoom level of the map
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title="Restaurant" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

