import * as ImagePicker from "expo-image-picker";
import { ShowError } from "./Alert";

const arrayTest: any = [];

export const pickImageLibrary = async () => {
  try {
    // No permissions request is necessary for launching the image library
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("image__image:", image)

    if (image) {
      arrayTest.push(image.assets[0]);
      return arrayTest;
    }
    return null;
  } catch (error) {
    ShowError("Please allow camera roll/camera roll access to add images");
    console.log("error :>> ", error);
  }
};
