import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Spacer from '../../../components/Spacer'
import Button from '../../../components/Button/Button'
import { AppEComm } from '../../../constants/colors'
import { fontPixel, widthPixel } from '../../../ultils/scanling'
import BackHeader from '../../../components/Header/BackHeader'
import { defaultStyle } from '../../../constants/defaultStyle'
import UserInput from '../../../components/UserInput'
import InputEmail from '../../../components/Inputs/InputEmail'

const ProfileEmail = () => {
    const [formEmail, setFormEmail] = useState({
        value: "", error: null as null | { message: string }
    });
    return (
        <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
            <View style={defaultStyle.header}>

                <View style={defaultStyle.emptyContainer}>
                    <BackHeader title={'Email'} />
                </View>
            </View>
            <View style={{ paddingHorizontal: widthPixel(16), flex: 1 }}>
                <View style={{ paddingTop: 16 }}>

                    <View>
                        <Text style={styles.txtTitle}>Change Email:</Text>
                        <InputEmail
                            placeholder="Email"
                            value={formEmail.value}
                            error={formEmail.error}
                            onChangeText={(text) => {
                                setFormEmail({
                                    ...formEmail,
                                    value: text,
                                    error: null,

                                });
                            }}
                        />
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

export default ProfileEmail

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