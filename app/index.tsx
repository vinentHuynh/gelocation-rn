import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
// import Geolocation from "@react-native-community/geolocation";
import * as Location from "expo-location";

export default function Page() {
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
  });

  useEffect(() => {
    const fetchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setPosition({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });
    };

    fetchLocation();
  });
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <Marker coordinate={position}></Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
