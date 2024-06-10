import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { AppEComm } from "../../constants/colors";
import { fontPixel, heightPixel, widthPixel } from "../../ultils/scanling";
import { useNavigation } from "@react-navigation/native";
import Spacer from "../../components/Spacer";
import { ImageNoNotification, ImageProfile } from "../../assets/icons";
import Button from "../../components/Button/Button";
import { ROUTES } from "../../navigations/routers";
import Swipeout from "react-native-swipeout";
import { defaultStyle } from "../../constants/defaultStyle";
import Loader from "../../components/Loader";
import axios from "axios";
import { getNotification } from "../../configs";
interface NotificationProps {
  dataNotification: any;
}

// const Notification = (props: NotificationProps) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigation = useNavigation();
//   const [dataNotificationCurrent, setDataNotificationCurrent] = useState<any>(
//     props?.dataNotification
//   );

const Notification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [dataNotificationCurrent, setDataNotificationCurrent] = useState<any>();

  const getNotificationTestApp = async () => {
    const response = await getNotification();
    console.log("responseresponse", response.data);
    setDataNotificationCurrent(response?.data);
  };

  useEffect(() => {
    console.log("PING1");
    getNotificationTestApp();
  }, []);

  const handleDelete = async (notificationId: number) => {
    setIsLoading(true);
    // console.log("notificationId", notificationId);
    try {
      const response = await axios.delete(
        `http://localhost:5001/user/delete-notification/${notificationId}`
      );

      if (response.data.success) {
        await getNotificationTestApp();
      }

      //     const filteredNotifications = dataNotificationCurrent.filter(
      //       (item: any) => item._id !== notificationId
      //     );
      //     const dataUpdate = [...filteredNotifications];
      //     setDataNotificationCurrent(dataUpdate);
      //   } else {
      //     console.error("Error in handleDelete");
      //   }
    } catch (error) {
      console.error("Error in handleDelete:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      {dataNotificationCurrent == null || dataNotificationCurrent == "" ? (
        <View style={[styles.imgEmptyNotification]}>
          <Spacer height={100} />
          <Image
            style={{
              resizeMode: "contain",
              width: widthPixel(270),
              height: heightPixel(160),
            }}
            source={ImageNoNotification}
          />
          <Text
            style={{
              color: AppEComm.color.black,
              fontSize: fontPixel(24),
              fontWeight: "700",
              letterSpacing: 0.5,
            }}
          >
            No Notification
          </Text>
          <Text
            style={{
              color: AppEComm.color.placeholderColor,
              fontSize: fontPixel(12),
              letterSpacing: 1,
              lineHeight: 15,
              paddingVertical: 8,
            }}
          >
            Thank you for Notification using ICD-Ecom
          </Text>
          <Spacer height={50} />

          <Button
            text="Back To Home"
            buttonSize="Medium"
            onPress={() => navigation.navigate(ROUTES.HOME as never)}
          />
        </View>
      ) : (
        <View>
          <FlatList
            data={dataNotificationCurrent}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <SwipeableNotification
                notification={item}
                onDelete={handleDelete}
              />
            )}
          />
          <Loader isVisible={isLoading} />
        </View>
      )}
    </View>
  );
};

interface SwipeableNotificationProps {
  notification: any;
  onDelete: any;
}

const SwipeableNotification: FC<SwipeableNotificationProps> = ({
  notification,
  onDelete,
}) => {
  const swipeoutProps = {
    right: [
      {
        text: "Delete",
        backgroundColor: "red",
        onPress: () => onDelete(notification._id),
      },
    ],
    autoClose: true,
    disabled: false,
  };

  return (
    <Swipeout {...swipeoutProps}>
      <View style={styles.borderItem}>
        <View style={[defaultStyle.flexRowStart]}>
          <TouchableOpacity>
            <Image style={styles.image} source={ImageProfile} />
          </TouchableOpacity>
          <View
            style={[
              defaultStyle.flexJustify,
              { flexDirection: "column", paddingLeft: widthPixel(20) },
            ]}
          >
            <View style={[defaultStyle.flexJustify]}>
              <Text style={styles.titleItem}>
                {notification?.notification.charAt(0).toUpperCase() +
                  notification?.notification.slice(1)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Swipeout>
  );
};

export default Notification;

const styles = StyleSheet.create({
  borderItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: AppEComm.color.borderColor,
  },
  image: {
    width: widthPixel(72),
    height: heightPixel(72),
    borderRadius: 5,
  },
  titleItem: {
    color: AppEComm.color.text,
    fontSize: fontPixel(12),
    fontWeight: "700",
    lineHeight: 15,
    letterSpacing: 0.5,
    width: widthPixel(200),
  },
  txtPriceDefault: {
    fontWeight: "400",
    fontSize: fontPixel(12),
    lineHeight: 15,
    letterSpacing: 0.5,
    textDecorationLine: "line-through",
    color: AppEComm.color.placeholderColor,
  },
  txtPrice: {
    fontWeight: "700",
    fontSize: fontPixel(12),
    lineHeight: 18,
    letterSpacing: 0.5,
    color: AppEComm.color.blue_001,
    marginVertical: heightPixel(8),
  },
  txtDiscountPercentage: {
    fontWeight: "700",
    fontSize: fontPixel(10),
    lineHeight: 15,
    letterSpacing: 0.5,
    color: AppEComm.color.error,
  },
  imgEmptyNotification: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: widthPixel(16),
  },
});
