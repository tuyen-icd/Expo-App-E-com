import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BackHeader from '../../../components/Header/BackHeader'
import { fontPixel, heightPixel, widthPixel } from '../../../ultils/scanling'
import { AppEComm } from '../../../constants/colors'
import { ICAddressActive, IcTrash } from '../../../assets/icons'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../../navigations/routers'
import { ADD_ADDRESS_REDUCER } from '../../../redux/reducers/ReducerTypes'
import getStoredData from '../../../redux/Helpers'
import Button from '../../../components/Button/Button'
import Spacer from '../../../components/Spacer'
import { LinearGradient } from "expo-linear-gradient";

const ItemAddress = ({ dataFake }: any) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const selectItem = (itemId: string) => {
        setSelectedItem(itemId);
    };

    return (
        dataFake.map((item: any, index: number) => (
            <TouchableOpacity onPress={() => selectItem(item.id)} key={index}>
                <View style={{
                    borderColor: selectedItem === item.id ? AppEComm.color.blue_001 : AppEComm.color.borderColor,
                    borderWidth: widthPixel(1.5),
                    borderRadius: 5,
                    padding: 16,
                    marginVertical: heightPixel(6),
                }}>
                    <View>
                        <Text style={{
                            fontSize: fontPixel(14),
                            fontWeight: '700',
                            lineHeight: 15,
                            letterSpacing: 0.5
                        }}>{item.name}</Text>
                        <Text style={{
                            color: AppEComm.color.placeholderColor,
                            fontSize: fontPixel(12),
                            lineHeight: 18,
                            letterSpacing: 0.5,
                            paddingVertical: heightPixel(16),
                        }}>{item.address}</Text>
                        <Text style={{
                            color: AppEComm.color.placeholderColor,
                            fontSize: fontPixel(12),
                            lineHeight: 18,
                            letterSpacing: 0.5,
                            paddingBottom: heightPixel(12),
                        }}>{item.phone}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 20 }}>
                        <View style={{ width: 77 }}>
                            <Button
                                text="Edit"
                                buttonSize="Medium"
                                onPress={() => console.log("edit")}
                                containerStyle={{ width: widthPixel(77), height: heightPixel(57) }}
                            />
                        </View>

                        <TouchableOpacity onPress={() => console.log("trash")}>
                            <IcTrash />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>


        ))
    )
}

const ShiptoScreen = () => {

    const dataFake = [
        { id: 1, name: 'icd-test01', address: '277-279 Ly Tu Trong, Phuong Ben Thanh, Quan 1, Ho Chi Minh', phone: '0912121112' },
        { id: 2, name: 'icd-test02', address: '277-279 Ly Tu Trong, Phuong Ben Thanh, Quan 1, Ho Chi Minh', phone: '0913113113' },
        { id: 3, name: 'icd-test03', address: '277-279 Ly Tu Trong, Phuong Ben Thanh, Quan 1, Ho Chi Minh', phone: '0914114114' },
    ]
    const navigation = useNavigation();
    const { data: dataAddress } = getStoredData(ADD_ADDRESS_REDUCER);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>

                <View style={styles.emptyContainer}>
                    <BackHeader title={'Ship To'} />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate(ROUTES.ADDRESS_SHIP as never)}>
                    <ICAddressActive />
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 16, backgroundColor: AppEComm.color.white, flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Spacer height={10} />
                    <View >
                        <ItemAddress dataFake={dataFake} />
                    </View>
                </ScrollView>
                <View style={{
                    justifyContent: 'flex-end',
                    backgroundColor: AppEComm.color.white,
                }}>
                    <Spacer height={30} />
                    <Button
                        text="Next"
                        buttonSize="Medium"
                        onPress={() => navigation.navigate(ROUTES.PAYMENT as never)}
                    />
                    <Spacer height={50} />
                </View>
            </View>
        </View>
    )
}

export default ShiptoScreen

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
        marginRight: heightPixel(16),
    },
})