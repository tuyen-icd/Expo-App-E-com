import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { defaultStyle } from '../../constants/defaultStyle'
import { AppEComm } from '../../constants/colors'
import { fontPixel, widthPixel } from '../../ultils/scanling'
import { ICBag, ICCreaditCard, ICFullNameActive, ICLocation } from '../../assets/icons'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../navigations/routers'

const AccountScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
            <View style={defaultStyle.header}>
                <Text
                    style={{
                        color: AppEComm.color.text,
                        fontSize: fontPixel(16),
                        fontWeight: '700',
                        letterSpacing: 0.5
                    }}>Account</Text>
            </View>
            <View style={{ paddingHorizontal: 16 }}>
                <TouchableOpacity onPress={() => { navigation.navigate(ROUTES.PROFILE as never) }}>
                    <View style={styles.flexBox}>
                        <View style={{ width: widthPixel(30) }}>
                            <ICFullNameActive />
                        </View>
                        <Text style={styles.txtTitle}>Profile</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { console.log("test") }}>
                    <View style={styles.flexBox}>
                        <View style={{ width: widthPixel(30) }}>
                            <ICBag />
                        </View>
                        <Text style={styles.txtTitle}>Order</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { console.log("test") }}>
                    <View style={styles.flexBox}>
                        <View style={{ width: widthPixel(30) }}>
                            <ICLocation />
                        </View>
                        <Text style={styles.txtTitle}>Address</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { console.log("test") }}>
                    <View style={styles.flexBox}>
                        <View style={{ width: widthPixel(30) }}>
                            <ICCreaditCard />
                        </View>
                        <Text style={styles.txtTitle}>Payment</Text>
                    </View>

                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AccountScreen

const styles = StyleSheet.create({
    txtTitle: {
        color: AppEComm.color.text,
        fontWeight: '700',
        lineHeight: 15,
        letterSpacing: 0.5,
        fontSize: fontPixel(12)
    },
    flexBox: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        gap: 16,
        paddingVertical: 16
    }
})