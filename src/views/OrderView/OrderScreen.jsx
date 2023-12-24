import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import getStoredData from "../../redux/Helpers";
import { ORDER_REDUCER } from "../../redux/reducers/ReducerTypes";
import { defaultStyle } from "../../constants/defaultStyle";
import { AppEComm } from "../../constants/colors";
import BackHeader from "../../components/Header/BackHeader";
import { fontPixel, heightPixel, widthPixel } from "../../ultils/scanling";

const OrderScreen = () => {
  const { data: orderRedux } = getStoredData(ORDER_REDUCER);
  console.log("orderRedux :>> ", orderRedux);
  const OrderItems = (item) => {
    return (
      <View>
        <Text>abc</Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
      <View style={defaultStyle.header}>
        <View style={defaultStyle.emptyContainer}>
          <BackHeader title={"Order Account"} />
        </View>
      </View>

      <View style={{ paddingHorizontal: widthPixel(16), flex: 1 }}>
        {/* <FlatList
          data={orderRedux}
          renderItem={({ item }) => <OrderItems commnents={item} />}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        /> */}
      </View>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
