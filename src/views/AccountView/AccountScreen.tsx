import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { defaultStyle } from "../../constants/defaultStyle";
import { AppEComm } from "../../constants/colors";
import { fontPixel, widthPixel } from "../../ultils/scanling";
import {
  ICBag,
  ICCreaditCard,
  ICFullNameActive,
  ICLocation,
  IcLogout,
} from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../navigations/routers";
import Loader from "../../components/Loader";
import { notificationTestApp } from "../../configs";

const AccountScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  
  const sendNotification = async () => {
    try {
      setIsLoading(true)
      const data = await notificationTestApp();
      console.log("data___", data);
    } catch (error) {
      console.log("error");
    } finally {
      setIsLoading(false);
    }
  }



  return (
    <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
      <View style={defaultStyle.header}>
        <Text
          style={{
            color: AppEComm.color.text,
            fontSize: fontPixel(16),
            fontWeight: "700",
            letterSpacing: 0.5,
          }}
        >
          Account
        </Text>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ROUTES.PROFILE as never);
          }}
        >
          <View style={styles.flexBox}>
            <View style={{ width: widthPixel(30) }}>
              <ICFullNameActive />
            </View>
            <Text style={styles.txtTitle}>Profile</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ROUTES.ORDER_ACCOUNT as never);
          }}
        >
          <View style={styles.flexBox}>
            <View style={{ width: widthPixel(30) }}>
              <ICBag />
            </View>
            <Text style={styles.txtTitle}>Order</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            console.log("test");
          }}
        >
          <View style={styles.flexBox}>
            <View style={{ width: widthPixel(30) }}>
              <ICLocation />
            </View>
            <Text style={styles.txtTitle}>Address</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            console.log("test");
          }}
        >
          <View style={styles.flexBox}>
            <View style={{ width: widthPixel(30) }}>
              <ICCreaditCard />
            </View>
            <Text style={styles.txtTitle}>Payment</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              navigation.navigate(ROUTES.LOGIN as never);
            }, 2000);
          }}
        >
          <View style={styles.flexBox}>
            <View style={{ width: widthPixel(30) }}>
              <IcLogout />
            </View>
            <Text style={styles.txtTitle}>Logout</Text>
          </View>
        </TouchableOpacity>



        <TouchableOpacity
          onPress={() => {
            sendNotification();
          }}
        >
          <View style={styles.flexBox}>
            <View style={{ width: widthPixel(30) }}>
              <IcLogout />
            </View>
            <Text style={styles.txtTitle}>Button Test Send Notification</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Loader isVisible={isLoading} />
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  txtTitle: {
    color: AppEComm.color.text,
    fontWeight: "700",
    lineHeight: 15,
    letterSpacing: 0.5,
    fontSize: fontPixel(12),
  },
  flexBox: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 16,
    paddingVertical: 16,
  },
});
