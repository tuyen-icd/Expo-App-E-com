import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AppEComm } from '../../constants/colors'
import { fontPixel, heightPixel } from '../../ultils/scanling'
import ItemProduct from '../ItemProduct/ItemProduct'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../navigations/routers'
import { SkeletonContainer } from '@nlazzos/react-native-skeleton'


const FlashSale = (flashSale: any) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: heightPixel(12),
                    }}>
                    <Text style={styles.txtCategory}>Flash Sale</Text>
                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.FLASHSALE as never)}>
                        <Text style={styles.txtMoreCategory}>See More</Text>
                    </TouchableOpacity>
                </View>
                <SkeletonContainer>
                    <FlatList
                        data={flashSale.flashSale}
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
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </SkeletonContainer>
            </View>
        </View>
    )
}

export default FlashSale

const styles = StyleSheet.create({
    container: {
        marginTop: heightPixel(64),
    },
    txtCategory: {
        color: AppEComm.color.text,
        fontWeight: '700',
        letterSpacing: 0.5,
        lineHeight: 15,
        fontSize: fontPixel(14),
    },
    txtMoreCategory: {
        color: AppEComm.color.gradientForm,
        fontWeight: '700',
        letterSpacing: 0.5,
        lineHeight: 15,
        fontSize: fontPixel(14),
    }
})