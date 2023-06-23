import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { fontPixel, heightPixel, widthPixel } from '../../ultils/scanling'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AppEComm } from '../../constants/colors'
import { truncateString } from '../../ultils/truncateString'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native'
import { capitalizeFirstLetter } from '../../ultils/CapitalizeFirstString'
import axios from 'axios'
import { ROUTES } from '../../navigations/routers'
import App from '../../../App'

interface ItemProductProps {
    dataProduct?: any,
    id: number,
    title: string,
    price: number,
    discountPercentage: number,
    thumbnail: any,
    rating?: any
    containerStyle?: any
    tag?: boolean
}


const ItemProduct: FC<ItemProductProps> = ({ id, dataProduct, title, price, discountPercentage, thumbnail, containerStyle, rating, tag }) => {
    const navigation: any = useNavigation();

    const navigateProductDetail = () => {
        const getPostComment = axios.get(`https://dummyjson.com/comments/post/${dataProduct.id}`)
            .then((response) => {
                const allComment = response.data?.comments;
                const onlyComment = allComment[allComment.length - 1];
                navigation.navigate(ROUTES.PRODUCT_DETAIL as never, { dataProduct: dataProduct, getPostComment: onlyComment } as never)
            })
            .catch((error) => console.log(error))
    }


    return (
        <TouchableOpacity onPress={navigateProductDetail}>
            <View
                style={[containerStyle,
                    {
                        alignItems: 'center',
                        paddingRight: widthPixel(12),
                        paddingBottom: tag ? heightPixel(12) : 0,
                    }]}
            >
                <View
                    style={[styles.itemProduct, {
                        width: tag ? widthPixel(164) : widthPixel(141),
                        height: tag ? heightPixel(282) : heightPixel(238),
                    }]}>
                    <Image
                        style={[styles.imgProduct, {
                            width: tag ? widthPixel(133) : widthPixel(109),
                            height: tag ? heightPixel(133) : heightPixel(109),
                        }]}
                        source={{
                            uri: thumbnail,
                        }}
                    />
                    <Text style={styles.txtTitle}>{truncateString(capitalizeFirstLetter(title), 20)}</Text>
                    <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        {
                            tag ?
                                <AirbnbRating
                                    count={5}
                                    showRating={false}
                                    defaultRating={rating}
                                    size={12}
                                    isDisabled={true}
                                    reviewColor='red'
                                /> : ''
                        }
                    </View>
                    <Text style={styles.txtPrice}>${Math.round(price * (100 - discountPercentage) / 100)}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.txtPriceDefault}>${price}</Text>
                        <Text style={styles.txtDiscountPercentage}>{discountPercentage} Off</Text>
                    </View>

                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ItemProduct

const styles = StyleSheet.create({
    itemProduct: {
        borderWidth: widthPixel(1),
        borderColor: AppEComm.color.borderColor,
        borderRadius: widthPixel(5),
        padding: widthPixel(16),
        backgroundColor: AppEComm.color.white,
    },
    imgProduct: {
        borderRadius: widthPixel(5),
        marginBottom: heightPixel(8)
    },
    txtTitle: {
        width: widthPixel(109),
        height: heightPixel(36),
        fontWeight: '700',
        fontSize: fontPixel(12),
        lineHeight: 15,
        letterSpacing: 0.5,
        color: AppEComm.color.text,
        textAlign: 'left',
    },
    txtPrice: {
        fontWeight: '700',
        fontSize: fontPixel(12),
        lineHeight: 18,
        letterSpacing: 0.5,
        color: AppEComm.color.blue_001,
        marginVertical: heightPixel(8),
    },
    txtDiscountPercentage: {
        fontWeight: '700',
        fontSize: fontPixel(10),
        lineHeight: 15,
        letterSpacing: 0.5,
        color: AppEComm.color.error,
    },
    txtPriceDefault: {
        fontWeight: '400',
        fontSize: fontPixel(10),
        lineHeight: 15,
        letterSpacing: 0.5,
        textDecorationLine: 'line-through',
        color: AppEComm.color.placeholderColor,
    }
})