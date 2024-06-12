import { View } from "react-native";
import React, { FC } from "react";
import { AppEComm } from "../../constants/colors";
import { defaultStyle } from "../../constants/defaultStyle";
import BackHeader from "../../components/Header/BackHeader";
import Notification from "./Notification";

interface NotificationViewProps {
  route?: any
}

const NotificationView: FC<NotificationViewProps>= ({route}) => {
  const data = route?.params;
  return (
    <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
      <View style={defaultStyle.header}>
        <View style={defaultStyle.emptyContainer}>
          <BackHeader title={"Notification"} />
        </View>
      </View>

      <Notification data={data} />
    </View>
  );
};

export default NotificationView;
