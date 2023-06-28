import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppEComm } from '../../constants/colors'
import { defaultStyle } from '../../constants/defaultStyle'
import { fontPixel, heightPixel, widthPixel } from '../../ultils/scanling'
import { ImageBackgroundHome, ImagePromotion } from '../../assets/icons'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../navigations/routers'

const OfferScreen = () => {
    const navigator = useNavigation();
    return (
        <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
            <View style={defaultStyle.header}>
                <Text
                    style={{
                        color: AppEComm.color.text,
                        fontSize: fontPixel(16),
                        fontWeight: '700',
                        letterSpacing: 0.5
                    }}>Offer</Text>
            </View>
            <View style={{ paddingHorizontal: widthPixel(16) }}>
                <View style={styles.boxtop}>
                    <Text
                        style={{
                            color: AppEComm.color.white,
                            fontSize: fontPixel(16),
                            fontWeight: '700',
                            letterSpacing: 0.5,
                            width: widthPixel(212)
                        }}>
                        Use "MEGSL" Cupon For Get 90%off"
                    </Text>
                </View>
                <TouchableOpacity onPress={() => navigator.navigate(ROUTES.FLASHSALE as never)}>
                    <View style={{ marginBottom: heightPixel(24) }}>
                        <Image style={styles.imgBackground} source={ImagePromotion} />
                        <View style={styles.txtSlider}>
                            <Text style={styles.txtPositionBackGround}>
                                Super Flash Sale 50% Off
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
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigator.navigate(ROUTES.FLASHSALE as never)}>
                    <View style={{ marginBottom: heightPixel(24) }}>
                        <Image style={styles.imgBackground} source={ImageBackgroundHome} />
                        <View style={styles.txtSlider}>
                            <Text style={styles.txtPositionBackGround}>
                                90% Off Super Mega Sale
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
                                Special birthday Lafyuu
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default OfferScreen

const styles = StyleSheet.create({
    imgBackground: {
        borderRadius: widthPixel(5),
        height: heightPixel(206),
        width: '100%',

    },
    txtSlider: {
        position: "absolute",
        top: '35%',
        left: widthPixel(24),
        right: 0,
        width: widthPixel(208)
    },
    txtPositionBackGround: {
        fontSize: fontPixel(24),
        fontWeight: '700',
        letterSpacing: 0.5,
        color: AppEComm.color.white,
        textShadowColor: '#585858',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
    },
    boxtop: {
        backgroundColor: AppEComm.color.blue_001,
        borderRadius: 5,
        height: heightPixel(80),
        marginVertical: heightPixel(16),
        alignItems: 'center',
        justifyContent: 'center'
    }
})