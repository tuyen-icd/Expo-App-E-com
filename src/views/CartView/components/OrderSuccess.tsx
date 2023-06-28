import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ICSuccess } from '../../../assets/icons'
import Button from '../../../components/Button/Button'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../../navigations/routers'
import { fontPixel, widthPixel } from '../../../ultils/scanling'
import { AppEComm } from '../../../constants/colors'

const OrderSuccess = () => {
    const navigation = useNavigation();
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingHorizontal: widthPixel(16)
        }}>
            <ICSuccess />
            <Text style={{
                fontSize: fontPixel(24),
                fontWeight: '700',
                letterSpacing: 0.5,
                color: AppEComm.color.text
            }}>Success</Text>
            <Text style={{
                fontSize: fontPixel(12),
                lineHeight: 15,
                letterSpacing: 0.5,
                color: AppEComm.color.placeholderColor,
                paddingVertical: widthPixel(8)
            }}>Thank you for shopping using lafyuu</Text>
            <Button
                text="Back To Order"
                buttonSize="Medium"
                onPress={() => navigation.navigate(ROUTES.HOME as never)}
            />
        </View>
    )
}

export default OrderSuccess

const styles = StyleSheet.create({})