import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import UserInput from "../../components/UserInput";
import { styles } from "../HomeView/styles";
import { ICExploreActive } from "../../assets/icons";
import MainRightControl from "../../components/Header/MainRightControl";
import { heightPixel } from "../../ultils/scanling";
import Category from "../../components/Category/Category";
import { AppEComm } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../navigations/routers";
import Spacer from "../../components/Spacer";

const ExploreScreen = () => {
  const navigation: any = useNavigation();
  const [searchInput, setSearchInput] = useState('');



  const handleSreachTermChange = (searchValue: string) => {
    setSearchInput(searchValue);
  };

  const handleSearchSubmit = () => {
    if (searchInput !== '') {
      navigation.navigate(ROUTES.EXPLORE_SEARCH as never, { txtSearch: searchInput } as never)
    }
    return;
  };

  return (
    <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
      <View style={styles.header}>
        <View style={styles.emptyContainer}>
          <UserInput.TextInput
            leftComponent={(iconProps) => <ICExploreActive {...iconProps} />}
            placeholder={"Search Product"}
            containerStyle={styles.searchProduct}
            onChangeText={(e) => handleSreachTermChange(e)}
            value={searchInput}
            returnKeyType="search"
            onSubmitEditing={handleSearchSubmit}
          />
        </View>
        <MainRightControl visibleNotification={true} visibleFavious={true} visibleShort={false} />
      </View>
      <View style={[styles.container, { flex: 1 }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{
            paddingTop: heightPixel(16),
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <View style={{ flex: 1 }}>
              <Category flag={false} />
              <Spacer height={150} />
            </View>
          </View>
        </ScrollView>
      </View>
    </View >
  );
};

export default ExploreScreen;
