import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import UserInput from "../../components/UserInput";
import { styles } from "../HomeView/styles";
import { ICExploreActive } from "../../assets/icons";
import MainRightControl from "../../components/Header/MainRightControl";
import { heightPixel } from "../../ultils/scanling";
import Category from "../../components/Category/Category";
import { AppEComm } from "../../constants/colors";

const ExploreScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSreachTermChange = (e: string) => {
    setSearchTerm(e);
  };
  const handleSearchSubmit = () => {
    console.log("abc");
  };
  return (
    <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
      <View style={styles.header}>
        <View style={styles.emptyContainer}>
          <UserInput.TextInput
            leftComponent={(iconProps) => <ICExploreActive {...iconProps} />}
            placeholder={"Search Product"}
            containerStyle={styles.searchProduct}
            onChangeText={handleSreachTermChange}
            value={searchTerm}
            returnKeyType="search"
            onSubmitEditing={handleSearchSubmit}
          />
        </View>
        <MainRightControl visibleNotification={true} visibleFavious={true} />
      </View>
      <View style={[styles.container]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingTop: heightPixel(16), flex: 1 }}>
            <View>
              <Category flag={false} />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ExploreScreen;
