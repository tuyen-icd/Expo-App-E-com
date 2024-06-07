import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useState } from "react";
import getStoredData from "../../redux/Helpers";
import { FAVORITE_REDUCER } from "../../redux/reducers/ReducerTypes";
import Swipeout from "react-native-swipeout";
import { fontPixel, heightPixel, widthPixel } from "../../ultils/scanling";
import { defaultStyle } from "../../constants/defaultStyle";
import { AppEComm } from "../../constants/colors";
import { useDispatch } from "react-redux";
import { getFavoriteAction } from "../../redux/actions/FavoriteAction";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../navigations/routers";
import Spacer from "../../components/Spacer";
import Button from "../../components/Button/Button";
import { bg_empty_cart } from "../../assets/icons";

const FavoriteProduct = () => {
  const { data: favoriteRedux } = getStoredData(FAVORITE_REDUCER);
  // console.log("favoriteRedux :>> ", favoriteRedux?.items);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleDelete = (productId: number) => {
    setIsLoading(true);
    setTimeout(() => {
      const filterProduct = favoriteRedux?.items.filter(
        (item: any) => item?.id !== productId
      );
      const dataUpdate = [...filterProduct];
      dispatch(
        getFavoriteAction({
          items: dataUpdate,
        })
      );
      setIsLoading(false);
    }, 1000);
  };

  return (
    <View>
      {favoriteRedux?.items.length == 0 || !favoriteRedux?.items ? (
        <View style={[styles.imgEmptyCart]}>
          <Spacer height={100} />
          <Image
            style={{
              resizeMode: "contain",
              width: widthPixel(270),
              height: heightPixel(160),
            }}
            source={bg_empty_cart}
          />
          <Text
            style={{
              color: AppEComm.color.black,
              fontSize: fontPixel(24),
              fontWeight: "700",
              letterSpacing: 0.5,
            }}
          >
            Favorite Not Found
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
            Thank you for Favorite using ICD-Ecom
          </Text>
          <Spacer height={50} />

          <Button
            text="Buy Now"
            buttonSize="Medium"
            onPress={() => navigation.navigate(ROUTES.HOME as never)}
          />
        </View>
      ) : (
        <View>
          <FlatList
            data={favoriteRedux?.items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <SwipeableProductItem product={item} onDelete={handleDelete} />
            )}
          />
          <Loader isVisible={isLoading} />
        </View>
      )}
    </View>
  );
};

interface SwipeableProductItemProps {
  product: any;
  onDelete: any;
}

const SwipeableProductItem: FC<SwipeableProductItemProps> = ({
  product,
  onDelete,
}) => {
  const swipeoutProps = {
    right: [
      {
        text: "Delete",
        backgroundColor: "red",
        onPress: () => onDelete(product.id),
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
            <Image
              style={styles.image}
              source={{
                uri: product?.images,
              }}
            />
          </TouchableOpacity>
          <View
            style={[
              defaultStyle.flexJustify,
              { flexDirection: "column", paddingLeft: widthPixel(20) },
            ]}
          >
            <View style={[defaultStyle.flexJustify]}>
              <Text style={styles.titleItem}>
                {product?.title.charAt(0).toUpperCase() +
                  product?.title.slice(1)}
              </Text>
              <Text style={styles.txtPriceDefault}>
                $
                {Math.round(
                  product?.price / (1 - product?.discountPercentage / 100)
                )}
              </Text>
            </View>
            <View
              style={[
                {
                  width: 150,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              ]}
            >
              <Text style={styles.txtDiscountPercentage}>
                {" "}
                - $
                {Math.round(
                  product?.price / (1 - product?.discountPercentage / 100) -
                    product?.price
                )}{" "}
                Off
              </Text>
              <Text style={styles.txtPrice}>${product?.price}</Text>
            </View>
          </View>
        </View>
      </View>
    </Swipeout>
  );
};

export default FavoriteProduct;

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
  imgEmptyCart: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: widthPixel(16),
  },
});
