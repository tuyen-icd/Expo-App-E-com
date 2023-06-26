import { View, Text, ScrollView, Image, FlatList } from "react-native";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { styles } from "./styles";
import UserInput from "../../components/UserInput";
import { ICExploreActive, ImageBackgroundHome } from "../../assets/icons";
import MainRightControl from "../../components/Header/MainRightControl";
import { fontPixel, heightPixel, widthPixel } from "../../ultils/scanling";
import SliderImage from "../../components/SliderBox/SliderImage";
import Category from "../../components/Category/Category";
import FlashSale from "../../components/FlashSale/FlashSale";
import MegaSale from "../../components/MegaSale/MegaSale";
import ItemProduct from "../../components/ItemProduct/ItemProduct";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../navigations/routers";

const HomeScreen = () => {
  const navigation: any = useNavigation();
  const [txtSearch, setTxtSearch] = useState("");
  const [flashSale, setFlashSale] = useState([]);
  const [dataSliderCarousel, setDataSliderCarousel] = useState([]);
  const [dataProductBottom, setDataProductBottom] = useState<any[]>([]);
  useEffect(() => {
    const dataFlashSale = axios
      .get(
        "https://dummyjson.com/products?limit=10&skip=35&select=id,title,price,description,discountPercentage,rating,stock,brand,category,thumbnail,images"
      )
      .then((response) => {
        setFlashSale(response.data.products);
      });

    const dataSlider = axios
      .get("https://dummyjson.com/products?limit=5&skip=1&select=thumbnail")
      .then((response) => {
        const result = response.data.products.map(
          (item: { thumbnail: string }) => item.thumbnail
        );
        setDataSliderCarousel(result);
      });

    const dataProductBottom = axios
      .get(
        "https://dummyjson.com/products?limit=10&skip=32&select=id,title,price,description,discountPercentage,rating,stock,brand,category,thumbnail,images"
      )
      .then((response) => {
        setDataProductBottom(response.data.products);
      });
    // dispatch(getProduct(dataProduct));
  }, []);

  const handleSreachTermChange = (e: string) => {
    setTxtSearch(e);
  };
  const handleSearchSubmit = () => {
    if (txtSearch !== '') {
      navigation.navigate(ROUTES.EXPLORE_SEARCH as never, { txtSearch: txtSearch } as never)
    }
    return;
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.emptyContainer}>
          <UserInput.TextInput
            leftComponent={(iconProps) => <ICExploreActive {...iconProps} />}
            placeholder={"Search Product"}
            containerStyle={styles.searchProduct}
            onChangeText={handleSreachTermChange}
            value={txtSearch}
            returnKeyType="search"
            onSubmitEditing={handleSearchSubmit}
          />
        </View>
        <MainRightControl visibleNotification={true} visibleFavious={true} visibleShort={false} />
      </View>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingTop: heightPixel(16) }}>
            <SliderImage dataSliderCarousel={dataSliderCarousel} />
            <View
              style={{
                position: "absolute",
                top: "30%",
                left: widthPixel(24),
                width: widthPixel(209),
              }}
            >
              <Text style={styles.txtPositionBackGround}>
                Super Flash Sale 50% Off
              </Text>
            </View>
          </View>
          <View>
            <Category flag={true} />
          </View>
          <View>
            <FlashSale flashSale={flashSale} />
          </View>
          <View>
            <MegaSale flashSale={flashSale} />
          </View>
          <View style={{ marginBottom: heightPixel(24) }}>
            <Image style={styles.imgBackground} source={ImageBackgroundHome} />
            <View style={styles.txtSlider}>
              <Text style={styles.txtPositionBackGround}>
                Recommended Product
              </Text>
              <Text
                style={[
                  styles.txtPositionBackGround,
                  {
                    fontWeight: "400",
                    fontSize: fontPixel(12),
                    paddingTop: heightPixel(16),
                  },
                ]}
              >
                We recommend the best for you
              </Text>
            </View>
          </View>

          <View style={{ paddingBottom: heightPixel(250) }}>
            <FlatList
              data={dataProductBottom}
              renderItem={({ item }) => (
                <ItemProduct
                  id={item?.id}
                  title={item?.title}
                  price={item?.price}
                  discountPercentage={item?.discountPercentage}
                  thumbnail={item?.thumbnail}
                  containerStyle={styles.flexItemProduct}
                  dataProduct={item}
                  tag={true}
                />
              )}
              horizontal={false}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
