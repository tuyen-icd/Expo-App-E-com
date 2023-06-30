import { Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import Spacer from '../../../components/Spacer'
import Button from '../../../components/Button/Button'
import { AppEComm } from '../../../constants/colors'
import { fontPixel, widthPixel } from '../../../ultils/scanling'
import BackHeader from '../../../components/Header/BackHeader'
import { defaultStyle } from '../../../constants/defaultStyle'
import { IcPhoneActiveV, IcPhoneV } from '../../../assets/icons'
import UserInput from '../../../components/UserInput'


const ProfilePhone = () => {
    const [formPhone, setFormPhone] = useState({
        value: "", error: null as null | { message: string }
    })

    return (
        <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
            <View style={defaultStyle.header}>

                <View style={defaultStyle.emptyContainer}>
                    <BackHeader title={'Phone Number'} />
                </View>
            </View>
            <View style={{ paddingHorizontal: widthPixel(16), flex: 1 }}>
                <View style={{ paddingTop: 16 }}>
                    <View>
                        <Text style={styles.txtTitle}>Phone Number:</Text>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                            {/* <ScrollView keyboardShouldPersistTaps="handled"> */}
                            <UserInput.TextInput
                                leftComponent={(valueIsNotEmpty) =>
                                    valueIsNotEmpty ? (
                                        <IcPhoneActiveV />
                                    ) : (
                                        <IcPhoneV />
                                    )
                                }
                                keyboardType="number-pad"
                                placeholder={'Phone Number'}
                                error={formPhone.error}
                                onChangeText={(value: string) => {
                                    setFormPhone({
                                        ...formPhone,
                                        value: value, error: null
                                    });
                                }}
                                returnKeyType="done"
                            />
                            {/* </ScrollView> */}
                        </TouchableWithoutFeedback>
                    </View>

                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    backgroundColor: AppEComm.color.white,
                }}>
                    <Spacer height={30} />
                    <Button
                        text="Save"
                        buttonSize="Medium"
                        onPress={() => console.log("test")}
                    />
                    <Spacer height={50} />
                </View>
            </View>
        </View>
    )
}

export default ProfilePhone

const styles = StyleSheet.create({
    txtTitle: {
        color: AppEComm.color.text,
        fontSize: fontPixel(14),
        fontWeight: '700',
        lineHeight: 15,
        letterSpacing: 0.4,
        paddingBottom: 12,
    },
})