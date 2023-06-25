import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useState } from "react";
import { AppEComm } from "../../constants/colors";
import { defaultStyle } from "../../constants/defaultStyle";
import BackHeader from "../../components/Header/BackHeader";
import { fontPixel, heightPixel, widthPixel } from "../../ultils/scanling";
import { Rating } from "react-native-ratings";
import UserInput from "../../components/UserInput";
import Button from "../../components/Button/Button";
import { ICAddCamera } from "../../assets/icons";
import { ScrollView } from "react-native-gesture-handler";
import ModalCamera from "../../components/ModalCamera";
import { pickImageLibrary } from "../../ultils/CameraService";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/reducers/RootReducer";
import { ReviewScreenProps } from "./ReviewScreen";
import axios from "axios";
import { ShowError } from "../../ultils/Alert";
import { useNavigation } from "@react-navigation/native";

interface WriteReviewScreen extends ReviewScreenProps {}

const WriteReviewScreen: FC<WriteReviewScreen> = ({ route }) => {
  const navigation = useNavigation();
  const { postId } = route.params;
  console.log("posiid :>> ", postId.id);
  const { data } = useSelector((state: AppState) => state.authReducer);
  const userId = data?.result?.id;

  const [isShowModal, setIsShowModal] = useState(false);
  const [contentReview, setContentReview] = useState("");
  const [imageState, setImageState] = useState([]);

  const handleSendReview = () => {
    const bodyDataReview = {
      body: contentReview,
      postId: postId.id,
      userId: 1,
    };
    const apiAddReview = axios
      .post("https://dummyjson.com/comments/add", bodyDataReview, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          ShowError("Send Review is successful", () => navigation.goBack());
        }
      })
      .catch((error) => ShowError(error.message));
  };

  const ratingCompleted = () => {
    console.log("abc");
  };

  const selectImageOptionHandler = async (confirmData: number) => {
    let image = null;
    if (confirmData === 2) {
      image = await pickImageLibrary();

      console.log("imageNotification :>> ", image);
    }
    if (confirmData === 1) {
      console.log("1111");
    }
    setIsShowModal(false);
    if (image) {
      setImageState(image);
    }
  };
  return (
    <View style={{ backgroundColor: AppEComm.color.white, flex: 1 }}>
      <View style={[defaultStyle.header]}>
        <BackHeader title={"Write Review"} />
      </View>
      <View style={{ paddingHorizontal: widthPixel(16) }}>
        <Text
          style={{
            fontSize: fontPixel(14),
            fontWeight: "700",
            lineHeight: 15,
            letterSpacing: 0.5,
            color: AppEComm.color.text,
            paddingVertical: heightPixel(16),
          }}
        >
          Please write Overall level of satisfaction with your shipping /
          Delivery Service
        </Text>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={30}
          showRating
          onFinishRating={ratingCompleted}
        />
        <Text
          style={[
            styles.txtTitle,
            {
              paddingTop: heightPixel(24),
              paddingBottom: heightPixel(12),
            },
          ]}
        >
          Write Your Review
        </Text>
        <UserInput.TextArea
          placeholder={"Write your review here"}
          error={""}
          onChangeText={(value: string) => {
            setContentReview(value);
          }}
          containerStyle={styles.borderTextArea}
        />
        <View>
          <Text style={styles.txtTitle}>Add Photo</Text>
        </View>

        <ScrollView horizontal={true} style={{ flex: 0, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => setIsShowModal(true)}
            style={{
              paddingTop: heightPixel(12),
              marginBottom: heightPixel(50),
            }}
          >
            <ICAddCamera />
          </TouchableOpacity>
        </ScrollView>
        <ModalCamera
          title="Selected Option"
          isShowModal={isShowModal}
          onCancel={() => setIsShowModal(false)}
          onConfirm={(confirmData) => {
            selectImageOptionHandler(confirmData);
          }}
        />

        <Button
          text="Send Review"
          buttonSize="Medium"
          onPress={handleSendReview}
        />
      </View>
    </View>
  );
};

export default WriteReviewScreen;

const styles = StyleSheet.create({
  borderTextArea: {
    borderColor: AppEComm.color.borderColor,
    height: heightPixel(160),
  },
  txtTitle: {
    color: AppEComm.color.text,
    fontSize: fontPixel(14),
    fontWeight: "700",
    letterSpacing: 0.5,
    lineHeight: 15,
  },
});
