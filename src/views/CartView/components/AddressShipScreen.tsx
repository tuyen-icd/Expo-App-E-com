import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import BackHeader from "../../../components/Header/BackHeader";
import { ImageTransport } from "../../../assets/icons";
import { fontPixel, heightPixel, widthPixel } from "../../../ultils/scanling";
import { AppEComm } from "../../../constants/colors";
import UserInput from "../../../components/UserInput";
import Button from "../../../components/Button/Button";
import Spacer from "../../../components/Spacer";
import { checkValidateStringField } from "../../../ultils/CheckValidateInput";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../../redux/actions/AddressAction";
import { useNavigation } from "@react-navigation/native";
import { AppState } from "../../../redux/reducers/RootReducer";
interface AddressShipProps {
  route: any;
}
const AddressShip: FC<AddressShipProps> = ({ route }) => {
  const params = route?.params?.dataEdit;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { data: dataAddressRedux } = useSelector(
    (state: AppState) => state.addAddressReducer
  );
  const [formAddressState, setFormAddressState] = useState<any>({
    name: { value: "", error: null as null | { message: string } },
    address: { value: "", error: null as null | { message: string } },
    phone: { value: "", error: null as null | { message: string } },
  });

  useEffect(() => {
    if (params) {
      setFormAddressState({
        name: { value: params?.name, error: null },
        address: { value: params?.address, error: null },
        phone: { value: params?.phone },
        error: null,
      });
    } else {
      setFormAddressState({
        name: { value: "", error: null },
        address: { value: "", error: null },
        phone: { value: "", error: null },
      });
    }
  }, [params]);

  const checkValidateFormAddress = () => {
    const errorName = checkValidateStringField(formAddressState.name.value);
    const errorAddress = checkValidateStringField(
      formAddressState.address.value
    );
    const errorPhone = checkValidateStringField(formAddressState.phone.value);

    setFormAddressState({
      ...formAddressState,
      name: {
        value: formAddressState.name.value,
        error: errorName,
      },
      address: {
        value: formAddressState.address.value,
        error: errorAddress,
      },
      phone: {
        value: formAddressState.phone.value,
        error: errorPhone,
      },
    });
    if (errorName || errorAddress || errorPhone) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    const isValid = checkValidateFormAddress();
    if (isValid) {
      const dataAddressStore = dataAddressRedux?.dataAddress || [];
      const dataUpdateAddress = [...dataAddressStore];

      const existingAddressIndex = dataUpdateAddress.findIndex(
        (item) => item.id === params?.id
      );

      if (existingAddressIndex !== -1) {
        // Nếu id tồn tại, thực hiện cập nhật
        dataUpdateAddress[existingAddressIndex] = {
          id: params.id,
          name: formAddressState.name.value,
          address: formAddressState.address.value,
          phone: formAddressState.phone.value,
        };
      } else {
        // Nếu id chưa tồn tại, thêm mới
        const newAddress = {
          id: "newId_" + Date.now(),
          name: formAddressState.name.value,
          address: formAddressState.address.value,
          phone: formAddressState.phone.value,
        };
        dataUpdateAddress.push(newAddress);
      }

      dispatch(
        getAddress({
          dataAddress: dataUpdateAddress,
        })
      );

      setFormAddressState({
        name: { value: "", error: null },
        address: { value: "", error: null },
        phone: { value: "", error: null },
      });
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
      <View style={styles.header}>
        <View style={styles.emptyContainer}>
          <BackHeader title={"Add Address"} />
        </View>
      </View>
      <Spacer height={20} />

      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={ImageTransport}
            style={{ width: widthPixel(200), height: heightPixel(120) }}
          />
        </View>
        <View>
          <Text style={styles.txtTitle}>Full Name:</Text>
          <UserInput.TextInput
            value={formAddressState.name.value}
            placeholder={`Full Name`}
            error={formAddressState.name.error}
            onChangeText={(text) => {
              setFormAddressState({
                ...formAddressState,
                name: {
                  value: text,
                  error: null,
                },
              });
            }}
            // keyboardType="decimal-pad"
            containerStyle={styles.inputs}
          />
        </View>
        <View>
          <Text style={styles.txtTitle}>Address for Delivery:</Text>
          <UserInput.TextInput
            value={formAddressState.address.value}
            placeholder={`Address for Delivery`}
            error={formAddressState.address.error}
            onChangeText={(text) => {
              setFormAddressState({
                ...formAddressState,
                address: {
                  value: text,
                  error: null,
                },
              });
            }}
            // keyboardType="decimal-pad"
            containerStyle={styles.inputs}
          />
        </View>
        <View>
          <Text style={styles.txtTitle}>Mobile Phone:</Text>
          <UserInput.TextInput
            value={formAddressState.phone.value}
            placeholder={`Mobile Phone`}
            error={formAddressState.phone.error}
            onChangeText={(text) => {
              setFormAddressState({
                ...formAddressState,
                phone: {
                  value: text,
                  error: null,
                },
              });
            }}
            // keyboardType="phone-pad"
            containerStyle={styles.inputs}
          />
        </View>
        <Button
          text={params ? "Edit" : "Add Address"}
          buttonSize="Medium"
          onPress={() => handleSubmit()}
        />
      </View>
    </View>
  );
};

export default AddressShip;

const styles = StyleSheet.create({
  header: {
    height: heightPixel(122),
    borderBottomColor: AppEComm.color.borderColor,
    borderBottomWidth: widthPixel(1),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: Platform.OS == "ios" ? heightPixel(50) : heightPixel(10),
    paddingHorizontal: widthPixel(16),
    backgroundColor: AppEComm.color.white,
  },
  emptyContainer: {
    marginRight: heightPixel(16),
  },
  inputs: {
    borderColor: AppEComm.color.borderColor,
    borderRadius: widthPixel(5),
    width: "100%",
    height: heightPixel(46),
  },
  txtTitle: {
    color: AppEComm.color.text,
    fontWeight: "700",
    lineHeight: 15,
    letterSpacing: 0.5,
    fontSize: fontPixel(13),
    paddingVertical: 12,
  },
});
