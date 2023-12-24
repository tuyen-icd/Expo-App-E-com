import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import BackHeader from "../../../components/Header/BackHeader";
import { fontPixel, heightPixel, widthPixel } from "../../../ultils/scanling";
import { AppEComm } from "../../../constants/colors";
import { ICAddressActive, IcTrash } from "../../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../../navigations/routers";
import Button from "../../../components/Button/Button";
import Spacer from "../../../components/Spacer";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/reducers/RootReducer";
import { getAddress } from "../../../redux/actions/AddressAction";

interface ComponentChildProps {
  data: any;
  onSelectedItem: (itemId: string | null) => void;
}

const ItemAddress: React.FC<ComponentChildProps> = ({
  data,
  onSelectedItem,
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const dispatch = useDispatch();

  const navigation: any = useNavigation();

  const selectItem = (itemId: string) => {
    setSelectedItem(itemId);
    onSelectedItem(itemId);
  };

  const handleDelete = (id: string) => {
    setTimeout(() => {
      const filterAddress = data?.filter((item: any) => item?.id !== id);
      const dataUpdate = [...filterAddress];
      dispatch(
        getAddress({
          dataAddress: dataUpdate,
        })
      );
      onSelectedItem(null);
    }, 1000);
  };

  return data?.map((item: any, index: number) => (
    <TouchableOpacity onPress={() => selectItem(item.id)} key={index}>
      <View
        style={{
          borderColor:
            selectedItem === item.id
              ? AppEComm.color.blue_001
              : AppEComm.color.borderColor,
          borderWidth: widthPixel(1.5),
          borderRadius: 5,
          padding: 16,
          marginVertical: heightPixel(6),
        }}
      >
        <View>
          <Text
            style={{
              fontSize: fontPixel(14),
              fontWeight: "700",
              lineHeight: 15,
              letterSpacing: 0.5,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              color: AppEComm.color.placeholderColor,
              fontSize: fontPixel(12),
              lineHeight: 18,
              letterSpacing: 0.5,
              paddingVertical: heightPixel(16),
            }}
          >
            {item.address}
          </Text>
          <Text
            style={{
              color: AppEComm.color.placeholderColor,
              fontSize: fontPixel(12),
              lineHeight: 18,
              letterSpacing: 0.5,
              paddingBottom: heightPixel(12),
            }}
          >
            {item.phone}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 20,
          }}
        >
          <View style={{ width: 77 }}>
            <Button
              text="Edit"
              buttonSize="Medium"
              onPress={() =>
                navigation.navigate(
                  ROUTES.ADDRESS_SHIP as never,
                  { dataEdit: item } as never
                )
              }
              containerStyle={{
                width: widthPixel(77),
                height: heightPixel(57),
              }}
            />
          </View>

          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <IcTrash />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  ));
};

const ShiptoScreen = () => {
  const navigation = useNavigation();
  const { data } = useSelector((state: AppState) => state.addAddressReducer);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  console.log("selectedItem :>> ", selectedItem);

  const handleSelectItem = (itemId: string | null) => {
    setSelectedItem(itemId);
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.emptyContainer}>
          <BackHeader title={"Ship To"} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.ADDRESS_SHIP as never)}
        >
          <ICAddressActive />
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          backgroundColor: AppEComm.color.white,
          flex: 1,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Spacer height={10} />
          <View>
            <ItemAddress
              data={data?.dataAddress}
              onSelectedItem={handleSelectItem}
            />
          </View>
        </ScrollView>

        {selectedItem && (
          <View
            style={{
              justifyContent: "flex-end",
              backgroundColor: AppEComm.color.white,
            }}
          >
            <Spacer height={30} />

            <Button
              text="Next"
              buttonSize="Medium"
              onPress={() => navigation.navigate(ROUTES.PAYMENT as never)}
            />
            <Spacer height={50} />
          </View>
        )}
      </View>
    </View>
  );
};

export default ShiptoScreen;

const styles = StyleSheet.create({
  header: {
    height: heightPixel(122),
    borderBottomColor: AppEComm.color.borderColor,
    borderBottomWidth: widthPixel(1),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS == "ios" ? heightPixel(50) : heightPixel(10),
    paddingHorizontal: widthPixel(16),
    backgroundColor: AppEComm.color.white,
  },
  emptyContainer: {
    marginRight: heightPixel(16),
  },
});
