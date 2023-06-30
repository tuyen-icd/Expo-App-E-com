import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { defaultStyle } from '../../../constants/defaultStyle'
import { fontPixel, widthPixel } from '../../../ultils/scanling'
import { AppEComm } from '../../../constants/colors'
import BackHeader from '../../../components/Header/BackHeader'
import Spacer from '../../../components/Spacer'
import Button from '../../../components/Button/Button'
import UserInput from '../../../components/UserInput'

const ProfileBrithday = () => {

    const [registerForm, setRegisterForm] = useState(() => ({
        birthday: { value: '', error: null },
    }));
    return (
        <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
            <View style={defaultStyle.header}>

                <View style={defaultStyle.emptyContainer}>
                    <BackHeader title={'Birthday'} />
                </View>
            </View>
            <View style={{ paddingHorizontal: widthPixel(16), flex: 1 }}>
                <View style={{ paddingTop: 16 }}>

                    <View>
                        <Text style={styles.txtTitle}>Your Birthday:</Text>
                        <UserInput.BirthDayPicker
                            title={'Your Birthday'}
                            mode="date"
                            error={registerForm.birthday.error}
                            containerStyle={{}}
                            onPickedDate={(text: any) => {
                                setRegisterForm({
                                    ...registerForm,
                                    birthday: {
                                        value: text,
                                        error: null,
                                    },
                                });
                            }}
                            date={registerForm.birthday.value}
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

export default ProfileBrithday

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