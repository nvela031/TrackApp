import React, { useContext, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Map from "../components/Map";
import TrackForm from "../components/TrackForm";
import { FontAwesome } from "@expo/vector-icons";

import { SafeAreaView, withNavigationFocus } from "react-navigation";
// import "../_mockLocation";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocaton";

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);

  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );

  const [err] = useLocation(isFocused || recording, callback);

  // console.log(isFocused);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={styles.title} h2>
        Create a Track
      </Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: <FontAwesome name='plus' size={15} />,
};

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default withNavigationFocus(TrackCreateScreen);
