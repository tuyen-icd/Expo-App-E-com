import { Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fontPixel, heightPixel, widthPixel } from '../../ultils/scanling'
import { AppEComm } from '../../constants/colors'
import ItemAddToCart from '../../components/AddToCart/ItemAddToCart'
import Button from '../../components/Button/Button'
import { defaultStyle } from '../../constants/defaultStyle'
import UserInput from '../../components/UserInput'
import { bg_empty_cart } from '../../assets/icons'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../navigations/routers'
import { CART_REDUCER } from '../../redux/reducers/ReducerTypes'
import getStoredData from '../../redux/Helpers'
import Spacer from '../../components/Spacer'

const CartScreen = () => {
    const { data: cartRedux } = getStoredData(CART_REDUCER);

    const items = cartRedux?.items
    const prices = cartRedux?.items.map((item: any) => (item?.price * item?.quantity));
    const toltalPrice = prices?.reduce((acc: any, currentPrice: any) => acc + currentPrice, 0);

    const navigation = useNavigation();
    const [cuponCode, setCuponCode] = useState('');

    // const [listCarts, setListCarts] = useState<any>([]);

    // useEffect(() => {
    //     const getCartProduct = axios.get(``)
    //         .then((response) => setListCarts(response.data.products))
    //         .catch((error) => console.log(error));
    // }, [])



    const handleSreachTermChange = (e: string) => {
        setCuponCode(e);
    }
    const handleSearchSubmit = () => {
        console.log("abc")
    }
    return (
        <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
            <View style={styles.header}>
                <Text
                    style={{
                        color: AppEComm.color.text,
                        fontSize: fontPixel(16),
                        fontWeight: '700',
                        letterSpacing: 0.5
                    }}>Your Cart</Text>
            </View>
            {
                items?.length === 0 || items === undefined ? (
                    <View style={[styles.imgEmptyCart]}>
                        <Spacer height={100} />
                        <Image style={{ resizeMode: 'contain', width: widthPixel(270), height: heightPixel(160)}} source={bg_empty_cart} />
                        <Text style={{
                            color: AppEComm.color.black,
                            fontSize: fontPixel(24),
                            fontWeight: '700',
                            letterSpacing: 0.5
                        }}>Cart Not Found</Text>
                        <Text style={{
                            color: AppEComm.color.placeholderColor,
                            fontSize: fontPixel(12),
                            letterSpacing: 1,
                            lineHeight: 15,
                            paddingVertical: 8
                        }}>Thank you for Cart using lafyuu</Text>
                        <Spacer height={50} />

                        <Button
                            text="Buy Now"
                            buttonSize="Medium"
                            onPress={() => navigation.navigate(ROUTES.HOME as never)}
                        />

                    </View>
                ) : (
                        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: widthPixel(16) }}>
                            <View >
                                <ItemAddToCart />
                            </View>
                            <View style={{ paddingTop: heightPixel(16) }}>
                                <UserInput.TextInput
                                    rightComponent={(iconProps) => (
                                        <View>
                                            <Button
                                                text="Apply"
                                                buttonSize="Small"
                                                onPress={() => console.log("Cupon code")}
                                                buttonStyles={{ width: widthPixel(87) }}
                                                containerStyle={{ marginTop: 0, marginLeft: 15 }}
                                            />
                                        </View>
                                    )}
                                    placeholder={"Enter Cupon Code"}
                                    containerStyle={styles.searchProduct}
                                    onChangeText={handleSreachTermChange}
                                    value={cuponCode}
                                    returnKeyType="search"
                                    onSubmitEditing={handleSearchSubmit}
                                />
                            </View>

                            <View style={styles.borderItem}>
                                <View style={defaultStyle.flexJustify}>
                                    <Text style={styles.txtLeft}>Items ({items.length})</Text>
                                    {/* <Text style={styles.txtRight}>${toltalPrice}.00</Text> */}
                                </View>
                                <View style={[defaultStyle.flexJustify, { paddingVertical: heightPixel(12) }]}>
                                    <Text style={styles.txtLeft}>Shipping</Text>
                                    <Text style={styles.txtRight}>$40.00</Text>
                                </View>
                                <View style={defaultStyle.flexJustify}>
                                    <Text style={styles.txtLeft}>Import charges</Text>
                                    <Text style={styles.txtRight}>$10.00</Text>
                                </View>
                                <View style={styles.line}></View>
                                <View style={defaultStyle.flexJustify}>
                                    <Text style={{
                                        color: AppEComm.color.text,
                                        fontWeight: '700',
                                        lineHeight: 15,
                                        letterSpacing: 0.5
                                    }}>Total Price</Text>
                                    <Text style={{
                                        color: AppEComm.color.blue_001,
                                        fontWeight: '700',
                                        lineHeight: 15,
                                        letterSpacing: 0.5
                                    }}>${toltalPrice ? (toltalPrice + 40 + 10) : 0 }.00</Text>
                                </View>
                            </View>
                            <Button
                                text="Check Out"
                                buttonSize="Medium"
                                onPress={() => navigation.navigate(ROUTES.SHIP_TO as never)}
                            />
                            <Spacer height={200}/>
                        </ScrollView>
                )
            }
          

        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    imgEmptyCart: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: widthPixel(16)
    },
    header: {
        height: heightPixel(122),
        borderBottomColor: AppEComm.color.borderColor,
        borderBottomWidth: widthPixel(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: Platform.OS == 'ios' ? heightPixel(50) : heightPixel(10),
        paddingHorizontal: widthPixel(16),
        backgroundColor: AppEComm.color.white,
    },
    line: {
        width: '100%',
        height: heightPixel(1.5),
        backgroundColor: '#EBF0FF',
        marginVertical: heightPixel(12)
    },
    txtLeft: {
        color: AppEComm.color.placeholderColor,
        fontSize: fontPixel(12),
        lineHeight: 18,
        letterSpacing: 0.5,
        textAlign: 'left',
    },
    txtRight: {
        color: AppEComm.color.text,
        fontSize: fontPixel(12),
        fontWeight: '500',
        lineHeight: 18,
        letterSpacing: 0.5,
        textAlign: 'right'
    },
    borderItem: {
        // marginTop: heightPixel(16),
        borderColor: AppEComm.color.borderColor,
        borderWidth: widthPixel(1.5),
        padding: widthPixel(16),
        borderRadius: 5
    },
    searchProduct: {
        borderColor: AppEComm.color.borderColor,
        borderRadius: widthPixel(5),
        width: widthPixel(343),
        height: heightPixel(56),
    },
})