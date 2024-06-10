import { View, Text } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { AppEComm } from "../../constants/colors";
import { defaultStyle } from "../../constants/defaultStyle";
import BackHeader from "../../components/Header/BackHeader";
import Notification from "./Notification";
import { getNotification } from "../../configs";

const NotificationView = () => {
  // const { dataGetNotification } = route.params;
  return (
    <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
      <View style={defaultStyle.header}>
        <View style={defaultStyle.emptyContainer}>
          <BackHeader title={"Notification"} />
        </View>
      </View>

      <Notification />
    </View>
  );
};

export default NotificationView;
