import { FlatList, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import BackHeader from '../../components/Header/BackHeader'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ICExplore, ICFavious, IcFaviousActive } from '../../assets/icons';
import UserInput from '../../components/UserInput';
import { fontPixel, heightPixel, widthPixel } from '../../ultils/scanling';
import { AppEComm } from '../../constants/colors';
import SliderImage from '../../components/SliderBox/SliderImage';
import { AirbnbRating } from 'react-native-ratings';
import { SelectColor, SizeAPI } from '../../configs/SizeAPI';
import { capitalizeFirstLetter } from '../../ultils/CapitalizeFirstString';
import { defaultStyle } from '../../constants/defaultStyle';
import ProductReview from './component/ProductReview';
import axios from 'axios';
import ItemProduct from '../../components/ItemProduct/ItemProduct';
import Button from '../../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../navigations/routers';
import { useDispatch, useSelector } from 'react-redux';
import { updateShoppingCartAction } from '../../redux/actions/CartAction';
import { AppState } from '../../redux/reducers/RootReducer';
import { CART_REDUCER, FAVORITE_REDUCER } from '../../redux/reducers/ReducerTypes';
import getStoredData from '../../redux/Helpers';

interface ProductDetailProps {
    route: any,
}

const ProductDetail: FC<ProductDetailProps> = ({ route }) => {

    let { data: listCartCurrent } = getStoredData(CART_REDUCER)

    let { data: listFavoriteCurrent } = getStoredData(FAVORITE_REDUCER);

    const dispatch = useDispatch();
    const navigation: any = useNavigation();
    const scrollViewRef = useRef<any>(null);
    const { data } = useSelector((state: AppState) => state.authReducer);
    const userId = data?.result?.id;
    const { id, dataProduct, getPostComment } = route.params;

    const scrollToTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    }
    
    const imageCaroselProduct = dataProduct?.images;
    const [flagSearch, setFlagSearch] = useState(false);
    const [alsoLike, setAlsoLike] = useState();
    const [favious, setFavious] = useState(false);
    const [selectedSizeItem, setSelectedSizeItem] = useState<number | null>(1);
    const [selectColorItem, setSelectColorItem] = useState<number | null>(1);

    //Only New ElementReview

    useEffect(() => {
        const getProduct = axios.get(`https://dummyjson.com/products?limit=10&skip=${dataProduct.id}&select=id,title,price,description,discountPercentage,rating,stock,brand,category,thumbnail,images`)
            .then((response) => setAlsoLike(response.data.products))
            .catch((error) => console.log(error));
    }, []);


    const getAllCommentById = () => {
        axios.get(`https://dummyjson.com/comments/post/${dataProduct.id}`)
            .then((response) => navigation.navigate(ROUTES.REVIEW as never, { allComments: response.data, postId: dataProduct }))
            .catch((error) => console.log(error))
    }

    const addProductToCart = (objectId: number, images: string, title: string, price: number) => {
        let dataItemStore = [];
        if (listCartCurrent == null || listCartCurrent == undefined) {
            dataItemStore = [];
        } else {
            dataItemStore = listCartCurrent?.items;
        }

        const index = dataItemStore?.findIndex((item: any) => item.id === objectId);
        let dataUpdate = [...dataItemStore];
        if (index < 0) {
            let newProduct = { id: objectId, images, title, price, quantity: 1 };
            dataUpdate = [...dataItemStore, newProduct]

        } else {
            dataUpdate[index].quantity += 1;
        }
        dispatch(
            updateShoppingCartAction({
                items: dataUpdate,

            })
        )
    }

    const handleFavorite = (objectId: number, images: string, title: string, price: number) => {
        let dataItemStore = [];
        if (listFavoriteCurrent == null || listFavoriteCurrent == undefined) {
            dataItemStore = [];
        } else {
            dataItemStore = listFavoriteCurrent?.items;
        }
        const index = dataItemStore?.findIndex((item: any) => item.id === objectId);
        let dataUpdate = [...dataItemStore];
        setFavious(prev => !prev)
    }

    return (
        <View style={{ backgroundColor: AppEComm.color.white, flex: 1 }}>
            <View style={styles.header}>
                {
                    !flagSearch ? <BackHeader title={dataProduct.title.length > 20 ? dataProduct.title.slice(0, 20) + '...' : dataProduct.title} /> : ''
                }

                <TouchableOpacity onPress={() => navigation.navigate(ROUTES.EXPLORE as never)}>
                    <ICExplore />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 16, paddingBottom: heightPixel(50) }}>
                <ScrollView showsVerticalScrollIndicator={false} ref={ scrollViewRef}>
                    <SliderImage dataSliderCarousel={imageCaroselProduct} />
                    <View style={{ paddingHorizontal: 16 }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: widthPixel(24)
                            }}>
                            <Text
                                style={[styles.txtTitle,
                                { paddingBottom: heightPixel(8) }]}>
                                {capitalizeFirstLetter(dataProduct?.title)}
                            </Text>

                            <TouchableOpacity onPress={() => handleFavorite(dataProduct?.id, dataProduct?.thumbnail, dataProduct?.title, dataProduct?.price)}>
                                {
                                    favious ? <IcFaviousActive /> : <ICFavious />
                                }

                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'flex-start' }}>
                            <AirbnbRating
                                count={5}
                                showRating={false}
                                defaultRating={dataProduct.rating}
                                size={18}
                                isDisabled={true}
                                reviewColor='red'
                            />
                        </View>

                        <Text style={[styles.txtPrice, { paddingTop: heightPixel(16) }]}>
                            ${Math.round(dataProduct?.price)}
                        </Text>
                        <View style={{ flex: 1, paddingVertical: heightPixel(24) }}>
                            <Text style={[styles.txtSmall, { paddingBottom: heightPixel(12) }]}>Select Size</Text>
                            <FlatList
                                data={SizeAPI}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => { setSelectedSizeItem(item.id) }}>
                                        <View style={[styles.borderSize,
                                        {
                                            borderColor: selectedSizeItem === item.id
                                                ? AppEComm.color.blue_001
                                                : AppEComm.color.borderColor,
                                        }]}>
                                            <Text
                                                style={{
                                                    fontSize: fontPixel(14),
                                                    fontWeight: '700',
                                                    textAlign: 'center',
                                                    letterSpacing: 0.5,
                                                    lineHeight: 15,
                                                }}>
                                                {item.size}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                scrollEnabled={true}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        <View style={{ paddingBottom: heightPixel(24) }}>
                            <Text style={[styles.txtSmall, { paddingBottom: heightPixel(12) }]}>Select Color</Text>
                            <FlatList
                                data={SelectColor}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                scrollEnabled={true}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => setSelectColorItem(item.id)}>
                                        <View style={{ paddingRight: 16 }}>
                                            <View style={{
                                                backgroundColor: `${item.color}`,
                                                width: widthPixel(48),
                                                height: heightPixel(48),
                                                borderRadius: 100,
                                                flex: 1,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                {selectColorItem === item.id && (
                                                    <View
                                                        style={{
                                                            width: 10,
                                                            height: 10,
                                                            borderRadius: 100,
                                                            backgroundColor: '#FFFFFF',
                                                            shadowColor: '#000',
                                                            shadowOffset: {
                                                                width: 0,
                                                                height: 2,
                                                            },
                                                            shadowOpacity: 0.4,
                                                            shadowRadius: 3,
                                                            elevation: 5,
                                                        }}
                                                    />
                                                )}
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        <View>
                            <Text style={[styles.txtSmall, { paddingBottom: heightPixel(12) }]}>Specification</Text>

                            <View>
                                <Text style={{
                                    color: AppEComm.color.text,
                                    fontSize: fontPixel(12),
                                    fontWeight: '400',
                                    letterSpacing: 0.5,
                                    lineHeight: 18,
                                    paddingBottom: heightPixel(16)
                                }}>
                                    Description:
                                </Text>
                                <Text style={{
                                    color: AppEComm.color.placeholderColor,
                                    fontSize: fontPixel(12),
                                    fontWeight: '400',
                                    letterSpacing: 1,
                                    lineHeight: 18,
                                }}>{dataProduct?.description}</Text>
                            </View>
                        </View>
                        <View style={{ paddingVertical: heightPixel(24) }}>
                            <View style={[defaultStyle.flexJustify, { marginBottom: heightPixel(12) }]}>
                                <Text style={[styles.txtSmall]}>Review Product</Text>
                                <TouchableOpacity
                                    onPress={getAllCommentById}
                                >
                                    <Text style={[styles.txtSmall, { color: AppEComm.color.gradientForm }]}>See More</Text>
                                </TouchableOpacity>
                            </View>
                            {
                                getPostComment &&
                                <ProductReview dataProduct={dataProduct}
                                    newElementReview={getPostComment}
                                />
                            }
                        </View>

                        <View>
                            <Text
                                style={[styles.txtSmall,
                                { paddingBottom: heightPixel(12) }]}>
                                You Might Also Like
                            </Text>
                            <FlatList
                                data={alsoLike}
                                renderItem={({ item }) =>
                                    < ItemProduct
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        discountPercentage={item.discountPercentage}
                                        thumbnail={item.thumbnail}
                                        dataProducts={item}
                                        scrollToTop={scrollToTop}
                                    />
                                }
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </ScrollView >

                <Button

                    text="Add To Cart"
                    buttonSize="Medium"
                    onPress={() => addProductToCart(dataProduct?.id, dataProduct?.thumbnail, dataProduct?.title, dataProduct?.price)}
                />
            </View >
        </View >
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    header: {
        height: heightPixel(122),
        borderBottomColor: AppEComm.color.borderColor,
        borderBottomWidth: widthPixel(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Platform.OS == 'ios' ? heightPixel(50) : heightPixel(10),
        paddingHorizontal: widthPixel(16),
        backgroundColor: AppEComm.color.white,
    },
    emptyContainer: {
        paddingTop: heightPixel(16),
        marginRight: heightPixel(16),
    },
    searchProduct: {
        borderColor: AppEComm.color.borderColor,
        borderRadius: widthPixel(5),
        width: widthPixel(340),
        height: heightPixel(46),
    },
    txtPrice: {
        fontWeight: '700',
        fontSize: fontPixel(20),
        letterSpacing: 0.5,
        color: AppEComm.color.blue_001,
    },
    txtTitle: {
        width: widthPixel(275),
        // height: heightPixel(60),
        fontWeight: '700',
        fontSize: fontPixel(20),
        letterSpacing: 0.5,
        color: AppEComm.color.text,
        textAlign: 'left',
    },
    txtSmall: {
        fontSize: fontPixel(14),
        fontWeight: '700',
        color: AppEComm.color.text,
        letterSpacing: 0.5,
        lineHeight: 15
    },
    borderSize: {
        borderRadius: 100,
        borderWidth: widthPixel(1.5),
        height: heightPixel(48),
        width: widthPixel(48),
        marginRight: 16,
        gap: 16,
        alignItems: 'center',
        justifyContent: 'center',
    }
})