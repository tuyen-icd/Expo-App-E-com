import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useState } from "react";
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

interface NotificationProps{
  data: any;
}

const Notification: FC<NotificationProps> = (data) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [dataNotificationCurrent, setDataNotificationCurrent] = useState<any>(data?.data?.dataGetNotification);
  const getNotificationTestApp = async () => {
    const response = await getNotification();
    setDataNotificationCurrent(response?.data);
  };

  const handleUpdate = async (notificationId: number) => {
    setIsLoading(true);
    try {
      const response = await axios.put(`http://localhost:5000/user/update-notification/${notificationId}`);
      if (response?.data?.success) {
        setDataNotificationCurrent(dataNotificationCurrent)
        getNotificationTestApp();
      }
    } catch (error) {
      console.error('Error in handleUpdate:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (notificationId: number) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:5000/user/delete-notification/${notificationId}`
      );
      if (response.data.success) {
        await getNotificationTestApp();
      } 
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
                onUpdate={handleUpdate}
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
  onUpdate: any;
}

const SwipeableNotification: FC<SwipeableNotificationProps> = ({
  notification,
  onDelete,
  onUpdate,
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
  const navigation: any = useNavigation();
  const backgroundColor = notification?.isCheck ? '#ffff' : '#ccc';

  const handleUpadte = async () => {
    await onUpdate(notification?._id);
    navigation.navigate(
      ROUTES.NOTIFICATION_DETAIL as never,
      { data: notification } as never)
  }

  return (
    <Swipeout {...swipeoutProps}>
      <View style={[styles.borderItem, { backgroundColor }]}>
        <View style={[defaultStyle.flexRowStart]}>
          <TouchableOpacity
            style={[defaultStyle.flexRowStart]}
            onPress={handleUpadte}
          >
            <Image style={styles.image} source={ImageProfile} />
          
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
          </TouchableOpacity>
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
    // borderColor: AppEComm.color.red,
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
