import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MainRightControl from '../../../components/Header/MainRightControl'
import BackHeader from '../../../components/Header/BackHeader'
import { heightPixel, widthPixel } from '../../../ultils/scanling'
import { AppEComm } from '../../../constants/colors'
import { ICAddressActive } from '../../../assets/icons'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../../navigations/routers'
import { ADD_ADDRESS_REDUCER } from '../../../redux/reducers/ReducerTypes'
import { SUCCESS } from '../../../redux/actions/ActionTypes'
import getStoredData from '../../../redux/Helpers'

const ShiptoScreen = () => {
    const navigation = useNavigation();
    const { data: dataAddress } = getStoredData(ADD_ADDRESS_REDUCER);
    console.log('data_address_ship_to :>> ', dataAddress);

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
            <View>

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