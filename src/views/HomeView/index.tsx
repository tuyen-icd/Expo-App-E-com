import { View, Text } from "react-native";
import React, { FC } from "react";
import HomeScreen from "./HomeScreen";
import { defaultStyle } from "../../constants/defaultStyle";

export interface HomeScreenProps {
  route: any;
}
const HomeView: FC<HomeScreenProps> = ({ route }) => {
  return (
    <View style={defaultStyle.containerWithHeader}>
      <HomeScreen />
    </View>
  );
};

export default HomeView;
