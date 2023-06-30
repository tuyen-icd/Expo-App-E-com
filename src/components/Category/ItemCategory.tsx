import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { AppEComm } from '../../constants/colors'
import { fontPixel, heightPixel, widthPixel } from '../../ultils/scanling'
import { ICCategoryShirt } from '../../assets/icons'
import { truncateString } from '../../ultils/truncateString'
import { capitalizeFirstLetter } from '../../ultils/CapitalizeFirstString'
import { Skeleton } from '@nlazzos/react-native-skeleton'
import Spacer from '../Spacer'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../navigations/routers'

interface ItemCategoryProps {
    flag: boolean,
    dataCategory?: any
}

const ItemCategory: FC<ItemCategoryProps> = ({ dataCategory, flag }) => {
    const navigation: any = useNavigation()

    return (
        <TouchableOpacity>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                paddingHorizontal: 8,
                paddingBottom: flag ? 0 : 20,
            }}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        !dataCategory
                            ? <View>
                                <Skeleton style={{
                                    height: heightPixel(70),
                                    width: widthPixel(70),
                                    borderRadius: 100,
                                }} />
                                <Spacer height={5} />
                                <Skeleton style={{
                                    width: widthPixel(60),
                                    height: heightPixel(10)
                                }} />
                            </View>
                            : <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate(ROUTES.PRODUCTS_CATEGORY as never, { title: dataCategory } as never)}>
                                <View style={styles.itemCategory}><ICCategoryShirt /></View>
                                <Text
                                    style={{
                                        color: AppEComm.color.placeholderColor,
                                        fontWeight: '400',
                                        fontSize: fontPixel(10),
                                        lineHeight: 15,
                                        letterSpacing: 0.5,
                                        marginTop: heightPixel(8),
                                        width: widthPixel(60),
                                        textAlign: 'center'
                                    }}>
                                    {truncateString(capitalizeFirstLetter(dataCategory), 20)}
                                </Text>
                            </TouchableOpacity>
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ItemCategory

const styles = StyleSheet.create({
    itemCategory: {
        borderColor: AppEComm.color.borderColor,
        borderWidth: widthPixel(1.5),
        borderRadius: 100,
        flex: 0,
        padding: heightPixel(23),
        height: heightPixel(70),
        width: widthPixel(70),
        alignItems: 'center',
        justifyContent: 'center',
    }
})