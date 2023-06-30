import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Spacer from '../../../components/Spacer'
import Button from '../../../components/Button/Button'
import { AppEComm } from '../../../constants/colors'
import { fontPixel, widthPixel } from '../../../ultils/scanling'
import BackHeader from '../../../components/Header/BackHeader'
import { defaultStyle } from '../../../constants/defaultStyle'
import InputPassword from '../../../components/Inputs/InputPassword'

const ProfileChangePassword = () => {
    const [formChangePassword, getFormChangePassword] = useState({
        oldPassword: { value: "", error: null as null | { message: string } },
        newPassword: { value: "", error: null as null | { message: string } },
        AgainPassword: { value: "", error: null as null | { message: string } },
    })
    return (
        <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
            <View style={defaultStyle.header}>

                <View style={defaultStyle.emptyContainer}>
                    <BackHeader title={'Change Password'} />
                </View>
            </View>
            <View style={{ paddingHorizontal: widthPixel(16), flex: 1 }}>
                <View style={{ paddingTop: 16 }}>
                    <View>
                        <Text style={styles.txtTitle}>Old Password:</Text>
                        <InputPassword
                            placeholder="Password"
                            error={formChangePassword.oldPassword.error}
                            onChangeText={(text) => {
                                getFormChangePassword({
                                    ...formChangePassword,
                                    oldPassword: {
                                        value: text,
                                        error: null,
                                    },
                                });
                            }}
                            value={formChangePassword.oldPassword.value}
                        />
                    </View>

                    <View>
                        <Text style={styles.txtTitle}>New Password:</Text>
                        <InputPassword
                            placeholder="Password"
                            error={formChangePassword.newPassword.error}
                            onChangeText={(text) => {
                                getFormChangePassword({
                                    ...formChangePassword,
                                    newPassword: {
                                        value: text,
                                        error: null,
                                    },
                                });
                            }}
                            value={formChangePassword.newPassword.value}
                        />
                    </View>

                    <View>
                        <Text style={styles.txtTitle}>New Password Again:</Text>
                        <InputPassword
                            placeholder="Password"
                            error={formChangePassword.newPassword.error}
                            onChangeText={(text) => {
                                getFormChangePassword({
                                    ...formChangePassword,
                                    newPassword: {
                                        value: text,
                                        error: null,
                                    },
                                });
                            }}
                            value={formChangePassword.newPassword.value}
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

export default ProfileChangePassword

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