import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackHeader from '../../../components/Header/BackHeader'
import { defaultStyle } from '../../../constants/defaultStyle'
import { AppEComm } from '../../../constants/colors'
import { heightPixel, widthPixel } from '../../../ultils/scanling'
import { ROUTES } from '../../../navigations/routers'
import { useNavigation } from '@react-navigation/native'
import { ICAddressActive } from '../../../assets/icons'
import Spacer from '../../../components/Spacer'
import Button from '../../../components/Button/Button'

const ChooseCard = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
            <View style={defaultStyle.header}>

                <View style={styles.emptyContainer}>
                    <BackHeader title={'Choose Card'} />
                </View>

                <TouchableOpacity onPress={() => console.log("abc")}>
                    <ICAddressActive />
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: widthPixel(16), flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>

                </ScrollView>


                <View style={{
                    justifyContent: 'flex-end',
                    backgroundColor: AppEComm.color.white,
                }}>
                    <Spacer height={30} />
                    <Button
                        text="Pay $766.86"
                        buttonSize="Medium"
                        onPress={() => navigation.navigate(ROUTES.ORDER_SUCCESS as never)}
                    />
                    <Spacer height={50} />
                </View>
            </View>
        </View>
    )
}

export default ChooseCard

const styles = StyleSheet.create({
    emptyContainer: {
        marginRight: heightPixel(16),
    },
})