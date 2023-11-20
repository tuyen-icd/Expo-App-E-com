import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { fontPixel, heightPixel, widthPixel } from '../../ultils/scanling'
import { AppEComm } from '../../constants/colors'
import { ICFavious, IcFaviousActive, IcMinus, IcPlus, IcTrash } from '../../assets/icons'
import { defaultStyle } from '../../constants/defaultStyle'
import getStoredData from '../../redux/Helpers'
import { CART_REDUCER } from '../../redux/reducers/ReducerTypes'
import { useDispatch } from 'react-redux'
import { updateShoppingCartAction } from '../../redux/actions/CartAction'
import Loader from '../Loader'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { ROUTES } from '../../navigations/routers'

const ItemAddToCart = () => {
    const { data: cartRedux } = getStoredData(CART_REDUCER)
    const [favious, setFavious] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigation: any = useNavigation();

    const navigateProductDetail = (item: any) => {
        const promises = [
            axios.get(`https://dummyjson.com/comments/post/${item?.id}`)
                .then((response) => {
                    const allComment = response.data?.comments;
                    const onlyComment = allComment[allComment.length - 1];
                    return onlyComment;
                })
                .catch((error) => console.log(error)),
            axios.get(`https://dummyjson.com/products/${item?.id}`)
                .then((res) => {
                    const product = res.data;
                    return product;
                })
                .catch((error) => console.log(error)),
        ]
        Promise.all(promises)
            .then(([comment, product]) => {
                navigation.navigate(ROUTES.PRODUCT_DETAIL as never, { id: item.id, dataProduct: product, getPostComment: comment } as never);
            })
            .catch((error) => console.log(error));
    }


    const handleIncrease = (productId: number) => {
        const index = cartRedux?.items?.findIndex((item: any) => item?.id === productId);
        let dataUpdate = [...cartRedux?.items]
        if (index >= 0) {
            dataUpdate[index].quantity += 1;
        }
        dispatch(
            updateShoppingCartAction({
                items: dataUpdate,
            }),
        );
    };

    const handleDecrease = (productId: number) => {
        const index = cartRedux?.items?.findIndex((item: any) => item?.id === productId);
        let dataUpdate = [...cartRedux?.items]
        const findRemove = cartRedux.items?.find((item: any) => item?.id === productId)
        if (index >= 0) {
            dataUpdate[index].quantity -= 1
        }

        if (findRemove.quantity < 1) {
            removeItemCart(productId)
            return;
        }

        dispatch(
            updateShoppingCartAction({
                items: dataUpdate,
            })
        )
    };

    const removeItemCart = (productId: number) => {
        setIsLoading(true);

        setTimeout(() => {
            const filterProduct = cartRedux?.items.filter((item: any) => item?.id !== productId);
            const dataUpdate = [...filterProduct]
            dispatch(
                updateShoppingCartAction({
                    items: dataUpdate,
                })
            )
            setIsLoading(false);
        }, 500);

    };

    return (
        <View>
            {
                cartRedux?.items?.map((item: any, index: any) => (
                    <View style={styles.borderItem}>
                        <View style={defaultStyle.flexJustify}>
                            <TouchableOpacity onPress={() => navigateProductDetail(item)} >
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: item?.images,
                                    }}
                                />
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={[defaultStyle.flexJustify, { marginBottom: heightPixel(12) }]}>
                                    <TouchableOpacity onPress={() => navigateProductDetail(item)}>
                                        <Text style={styles.titleItem}>{item?.title}</Text>
                                    </TouchableOpacity>
                                    <View style={[defaultStyle.flexJustify, { gap: 10 }]}>
                                        <TouchableOpacity onPress={(index) => setFavious(prev => !prev)}>
                                            {
                                                favious ? <IcFaviousActive /> : <ICFavious />
                                            }

                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => removeItemCart(item?.id)}>
                                            <IcTrash />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={defaultStyle.flexJustify}>
                                    <Text style={{
                                        color: AppEComm.color.blue_001,
                                        fontSize: fontPixel(12),
                                        fontWeight: '700',
                                        lineHeight: 15,
                                        letterSpacing: 0.5
                                    }}>${item?.price}.00</Text>
                                    <View style={{
                                        borderColor: AppEComm.color.borderColor,
                                        borderWidth: widthPixel(1.5),
                                        borderRadius: 5,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-evenly',
                                    }}>
                                        <TouchableOpacity
                                            style={{ paddingHorizontal: widthPixel(10) }}
                                            onPress={() => handleDecrease(item?.id)}>
                                            <IcMinus />
                                        </TouchableOpacity>
                                        <View style={styles.totalItemCart}>
                                            <Text style={{
                                                color: AppEComm.color.text,
                                                fontSize: fontPixel(12),
                                                lineHeight: 15,
                                                letterSpacing: 0.5,
                                                textAlign: 'center',
                                                fontWeight: '500'
                                            }}>{item?.quantity}</Text>
                                        </View>
                                        <TouchableOpacity style={{ paddingHorizontal: widthPixel(10) }} onPress={() => handleIncrease(item?.id)}>
                                            <IcPlus />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                ))
            }
            <Loader isVisible={isLoading} />
        </View>

    )
}

export default ItemAddToCart

const styles = StyleSheet.create({
    borderItem: {
        marginTop: heightPixel(16),
        borderColor: AppEComm.color.borderColor,
        borderWidth: widthPixel(1.5),
        padding: widthPixel(16),
        borderRadius: 5
    },
    image: {
        width: widthPixel(72),
        height: heightPixel(72),
        // backgroundColor: 'red',
        borderRadius: 5
    },
    titleItem: {
        color: AppEComm.color.text,
        fontSize: fontPixel(12),
        fontWeight: '700',
        lineHeight: 15,
        letterSpacing: 0.5,
        width: widthPixel(158)
    },
    totalItemCart: {
        width: widthPixel(40),
        height: heightPixel(24),
        backgroundColor: AppEComm.color.borderColor,
        alignItems: 'center',
        justifyContent: "center"
    }
})