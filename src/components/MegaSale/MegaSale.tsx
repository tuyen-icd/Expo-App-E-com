import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AppEComm } from '../../constants/colors'
import { fontPixel, heightPixel } from '../../ultils/scanling'
import ItemProduct from '../ItemProduct/ItemProduct'
import { ROUTES } from '../../navigations/routers'
import { useNavigation } from '@react-navigation/native'

const MegaSale = (flashSale: any) => {
    const navigation = useNavigation();

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
                    <Text style={styles.txtCategory}>Mega Sale</Text>
                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.FLASHSALE as never)}>
                        <Text style={styles.txtMoreCategory}>See More</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={flashSale.flashSale}
                    renderItem={({ item }) =>
                        <ItemProduct
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            discountPercentage={item.discountPercentage}
                            thumbnail={item.thumbnail}
                            dataProducts={item}
                        />}
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    )
}

export default MegaSale

const styles = StyleSheet.create({
    container: {
        marginVertical: heightPixel(24),
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