import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
import { DataCategory } from "../../constants/DataFake";
import ItemCategory from "./ItemCategory";
import { AppEComm } from "../../constants/colors";
import { fontPixel, heightPixel } from "../../ultils/scanling";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../navigations/routers";

interface CategoryProps {
  flag: boolean;
}

const Category: FC<CategoryProps> = ({ flag }) => {
  const navigation = useNavigation()
  return (
    <View style={[styles.container]}>
      <View style={styles.category}>
        {flag && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: heightPixel(12),
            }}
          >
            <Text style={styles.txtCategory}>Category</Text>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.EXPLORE as never)}>
              <Text style={styles.txtMoreCategory}>More Category</Text>
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          data={DataCategory}
          renderItem={({ item }) => (
            <ItemCategory title={item.title} id={item.id} image={item.image} flag={flag} />
          )}
          horizontal={flag ? true : false}
          keyExtractor={(item, index) => index.toString()}
          numColumns={flag ? 1 : 4}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    marginTop: heightPixel(15),
  },
  category: {},
  txtCategory: {
    color: AppEComm.color.text,
    fontWeight: "700",
    letterSpacing: 0.5,
    lineHeight: 15,
    fontSize: fontPixel(14),
  },
  txtMoreCategory: {
    color: AppEComm.color.gradientForm,
    fontWeight: "700",
    letterSpacing: 0.5,
    lineHeight: 15,
    fontSize: fontPixel(14),
  },
});
