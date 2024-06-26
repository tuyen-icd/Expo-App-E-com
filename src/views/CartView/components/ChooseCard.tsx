import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackHeader from "../../../components/Header/BackHeader";
import { defaultStyle } from "../../../constants/defaultStyle";
import { AppEComm } from "../../../constants/colors";
import { fontPixel, heightPixel, widthPixel } from "../../../ultils/scanling";
import { ROUTES } from "../../../navigations/routers";
import { useNavigation } from "@react-navigation/native";
import { ICAddressActive } from "../../../assets/icons";
import Spacer from "../../../components/Spacer";
import Button from "../../../components/Button/Button";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";

const ChooseCard = () => {
  const navigation = useNavigation();
  const [listBanks, setListBanks] = useState();
  const [selectedBanks, setSelectedBanks] = useState<number | null>(null);
  const selectBanks = (id: number) => {
    setSelectedBanks(id);
  };
  useEffect(() => {
    axios
      .get(`https://api.vietqr.io/v2/banks`)
      .then((response) => {
        const listBanks = response?.data?.data;
        setListBanks(listBanks);
      })
      .catch((error) => console.log("error :>> ", error));
  }, []);

  const ItemBanks = (comments: any) => {
    return (
      <TouchableOpacity
        onPress={() => selectBanks(comments?.commnents?.id)}
        key={comments?.commnents?.id}
      >
        <View
          style={{
            borderColor:
              selectedBanks === comments?.commnents?.id
                ? AppEComm.color.blue_001
                : AppEComm.color.borderColor,
            borderWidth: widthPixel(1.5),
            borderRadius: 5,
            marginVertical: heightPixel(6),
            // flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image style={styles.tinyLogo} source={{ uri: comments?.commnents?.logo }} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
      <View style={defaultStyle.header}>
        <View style={styles.emptyContainer}>
          <BackHeader title={"Choose Card"} />
        </View>
        <TouchableOpacity onPress={() => console.log("abc")}>
          <ICAddressActive />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: widthPixel(16), flex: 1 }}>
        <FlatList
          data={listBanks}
          renderItem={({ item }) => <ItemBanks commnents={item} />}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        />
        {selectedBanks && (
          <View
            style={{
              justifyContent: "flex-end",
              backgroundColor: AppEComm.color.white,
            }}
          >
            <Spacer height={30} />
            <Button
              text="Pay"
              buttonSize="Medium"
              onPress={() => navigation.navigate(ROUTES.ORDER_SUCCESS as never)}
            />
            <Spacer height={50} />
          </View>
        )}
      </View>
    </View>
  );
};

export default ChooseCard;

const styles = StyleSheet.create({
  emptyContainer: {
    marginRight: heightPixel(16),
  },
  tinyLogo: {
    width: 200,
    height: 100,
    resizeMode: "auto",
  },
});
