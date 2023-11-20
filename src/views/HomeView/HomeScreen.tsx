import { View, Text, ScrollView, Button, Image, FlatList } from "react-native";
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
import { API_FLASH_SALE, API_MEGA_SALE, API_PRODUCT_BOTTOM_HOME, API_SLIDER } from "../../configs";
import Loader from "../../components/Loader";
import { Skeleton } from '@nlazzos/react-native-skeleton';
import Spacer from "../../components/Spacer";

const HomeScreen = () => {
  const navigation: any = useNavigation();
  const [isLoading, setIsLoading] = useState(false)
  const [txtSearch, setTxtSearch] = useState("");
  const [flashSale, setFlashSale] = useState([]);
  const [megaSale, setMegaSale] = useState([]);
  const [dataSliderCarousel, setDataSliderCarousel] = useState([]);
  const [dataProductBottom, setDataProductBottom] = useState<any[]>([]);
  const [products, setProducts] = useState<any>([]);
  const [page, setPage] = useState(10);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://dummyjson.com/products?limit=${page}&skip=50&select=title,price,description,discountPercentage,rating,stock,brand,category,thumbnail,images`);
      const data = response.data.products;
      if (data.length > 0) {
        setProducts([...products, ...data]);
        setPage(page + 10);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
  };

  const handleLoadMore = () => {
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, [])

  useEffect(() => {
    const dataFlashSale = axios
      .get(API_FLASH_SALE)
      .then((response) => {
        setFlashSale(response.data.products);
      });
    
    const dataMegaSale = axios
      .get(API_MEGA_SALE)
      .then((response) => {
        setMegaSale(response.data.products);
      })

    const dataSlider = axios
      .get(API_SLIDER)
      .then((response) => {
        const result = response.data.products.map(
          (item: { thumbnail: string }) => item.thumbnail
        );
        setDataSliderCarousel(result);
      });

    const dataProductBottom = axios
      .get(API_PRODUCT_BOTTOM_HOME)
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
            {
              !dataSliderCarousel ?
                <Skeleton
                  style={{
                    height: heightPixel(206),
                    borderRadius: 5,
                  }} /> : <View>
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
            }
          </View>
          <Spacer height={20} />
          <View>
            <Category flag={true} />
          </View>
          <View>
            <FlashSale flashSale={flashSale} />
          </View>
          <View>
            <MegaSale flashSale={megaSale} />
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
              data={products}
              renderItem={({ item }) => (
                <ItemProduct
                  id={item?.id}
                  title={item?.title}
                  price={item?.price}
                  discountPercentage={item?.discountPercentage}
                  thumbnail={item?.thumbnail}
                  containerStyle={styles.flexItemProduct}
                  dataProducts={item}
                  tag={true}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0.5}
              horizontal={false}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              numColumns={2}
            />
            <Button title="More" onPress={handleLoadMore} />
          </View>
        </ScrollView>
        <Loader isVisible={isLoading} />
      </View>
    </View>
  );
};

export default HomeScreen;
