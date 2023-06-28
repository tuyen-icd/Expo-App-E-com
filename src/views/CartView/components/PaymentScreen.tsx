import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackHeader from '../../../components/Header/BackHeader'
import { fontPixel, heightPixel, widthPixel } from '../../../ultils/scanling'
import { defaultStyle } from '../../../constants/defaultStyle'
import { PaymentFake } from '../../../constants/DataFake'
import { AppEComm } from '../../../constants/colors'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../../navigations/routers'

const PaymentScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
            <View style={defaultStyle.header}>

                <View style={styles.emptyContainer}>
                    <BackHeader title={'Payment'} />
                </View>
            </View>
            <View style={{ paddingHorizontal: widthPixel(16) }}>
                <FlatList
                    data={PaymentFake}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate(ROUTES.CHOOSE_CARD as never)}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                gap: 15,
                                paddingVertical: heightPixel(16),
                            }}>
                                <View>{item.image}</View>
                                <Text style={{
                                    fontSize: fontPixel(12),
                                    fontWeight: '700',
                                    lineHeight: 15,
                                    letterSpacing: 0.5
                                }}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                />
            </View>
        </View>
    )
}

export default PaymentScreen

const styles = StyleSheet.create({
    emptyContainer: {
        marginRight: heightPixel(16),
    },
})