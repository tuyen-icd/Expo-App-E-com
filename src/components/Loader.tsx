import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppEComm } from "../constants/colors";

interface LoaderProps {
  isVisible: any;
}

const Loader = (props: LoaderProps) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: props.isVisible ? "100%" : "0%",
          height: props.isVisible ? "100%" : "0%",
        },
      ]}
    >
      <ActivityIndicator
        size="large"
        color={AppEComm.color.text}
        animating={props.isVisible}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 5,
  },
});
