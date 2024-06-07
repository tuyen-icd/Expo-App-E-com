import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { ICSuccess } from "../../../assets/icons";
import Button from "../../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../../navigations/routers";
import { fontPixel, widthPixel } from "../../../ultils/scanling";
import { AppEComm } from "../../../constants/colors";
import { useDispatch } from "react-redux";
import { updateShoppingCartAction } from "../../../redux/actions/CartAction";
import getStoredData from "../../../redux/Helpers";
import {
  CART_REDUCER,
  ORDER_REDUCER,
} from "../../../redux/reducers/ReducerTypes";
import { getOrderAction } from "../../../redux/actions/OrderAction";

const OrderSuccess = () => {
  const { data: orderRedux } = getStoredData(ORDER_REDUCER);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { data: cartRedux } = getStoredData(CART_REDUCER);
  useEffect(() => {
    try {
      dispatch(getOrderAction(cartRedux?.items));
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const handleBackToOrder = () => {
    try {
      dispatch(
        updateShoppingCartAction({
          items: [],
        })
      );
      navigation.navigate(ROUTES.HOME as never);
    } catch (error) {
      console.error("Error handling back to order:", error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingHorizontal: widthPixel(16),
      }}
    >
      <ICSuccess />
      <Text
        style={{
          fontSize: fontPixel(24),
          fontWeight: "700",
          letterSpacing: 0.5,
          color: AppEComm.color.text,
        }}
      >
        Success
      </Text>
      <Text
        style={{
          fontSize: fontPixel(12),
          lineHeight: 15,
          letterSpacing: 0.5,
          color: AppEComm.color.placeholderColor,
          paddingVertical: widthPixel(8),
        }}
      >
        Thank you for shopping using E-COM
      </Text>
      <Button
        text="Back To Order"
        buttonSize="Medium"
        onPress={handleBackToOrder}
      />
    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({});
