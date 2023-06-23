import { FlatList, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import BackHeader from '../../components/Header/BackHeader'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ICExplore, ICExploreActive, ICFavious } from '../../assets/icons';
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

interface ProductDetailProps {
    route: any,
}

const ProductDetail: FC<ProductDetailProps> = ({ route }) => {
    const navigation: any = useNavigation();

    const { dataProduct, getPostComment } = route.params;
    const imageCaroselProduct = dataProduct?.images;
    const [flagSearch, setFlagSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [alsoLike, setAlsoLike] = useState();
    const [allComment, getAllComment] = useState<any>([])

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

    const handleSreachTermChange = (e: string) => {
        setSearchTerm(e);
    };
    const handleSearchSubmit = () => {
        setFlagSearch(false);
        console.log("abc")
    }
    return (
        <View style={{ backgroundColor: AppEComm.color.white, flex: 1 }}>
            <View style={styles.header}>
                {
                    !flagSearch ? <BackHeader title={capitalizeFirstLetter(dataProduct.title)} /> : ''
                }

                <TouchableOpacity onPress={() => setFlagSearch(true)}>
                    {
                        !flagSearch ? <ICExplore /> :
                            <View style={styles.emptyContainer}>
                                <UserInput.TextInput
                                    rightComponent={iconProps => <ICExploreActive {...iconProps} />}
                                    placeholder={'Search Product'}
                                    containerStyle={styles.searchProduct}
                                    onChangeText={handleSreachTermChange}
                                    value={searchTerm}
                                    returnKeyType="search"
                                    onSubmitEditing={handleSearchSubmit}
                                />
                            </View>
                    }

                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 16, paddingBottom: heightPixel(50) }}>
                <ScrollView showsVerticalScrollIndicator={false}>
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

                            <TouchableOpacity onPress={() => console.log("yeu thich san pham")}>
                                <ICFavious />
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
                            ${Math.round(dataProduct?.price * (100 - dataProduct?.discountPercentage) / 100)}
                        </Text>
                        <View style={{ flex: 1, paddingVertical: heightPixel(24) }}>
                            <Text style={[styles.txtSmall, { paddingBottom: heightPixel(12) }]}>Select Size</Text>
                            <FlatList
                                data={SizeAPI}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => console.log("TEST SIZE", item)}>
                                        <View style={styles.borderSize}>
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
                                    <View style={{ paddingRight: 16 }}>
                                        <View style={{
                                            backgroundColor: `${item.color}`,
                                            width: widthPixel(48),
                                            height: heightPixel(48),
                                            borderRadius: 100,
                                        }}>

                                        </View>
                                    </View>
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
                                        dataProduct={item}
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
                    onPress={() => console.log('abc')}
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
        borderWidth: widthPixel(1),
        borderColor: AppEComm.color.borderColor,
        height: heightPixel(48),
        width: widthPixel(48),
        marginRight: 16,
        gap: 16,
        alignItems: 'center',
        justifyContent: 'center',
    }
})