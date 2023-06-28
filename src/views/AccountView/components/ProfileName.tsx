import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BackHeader from '../../../components/Header/BackHeader'
import { fontPixel, heightPixel, widthPixel } from '../../../ultils/scanling'
import { AppEComm } from '../../../constants/colors'
import { defaultStyle } from '../../../constants/defaultStyle'
import UserInput from '../../../components/UserInput'
import Spacer from '../../../components/Spacer'
import Button from '../../../components/Button/Button'

const ProfileName = () => {

    const [formName, setFormName] = useState({
        firstName: { value: "", error: null as null | { message: string } },
        lastName: { value: "", error: null as null | { message: string } },
    })
    return (
        <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
            <View style={defaultStyle.header}>

                <View style={defaultStyle.emptyContainer}>
                    <BackHeader title={'Name'} />
                </View>
            </View>
            <View style={{ paddingHorizontal: widthPixel(16), flex: 1 }}>
                <View style={{ paddingTop: 16 }}>
                    <View>
                        <Text style={styles.txtTitle}>First Name:</Text>
                        <UserInput.TextInput
                            value={formName.firstName}
                            placeholder={`First Name    `}
                            error={formName.firstName.error}
                            onChangeText={(text) => {
                                setFormName({
                                    ...formName,
                                    firstName: {
                                        value: text,
                                        error: null,
                                    },
                                });
                            }}
                            containerStyle={styles.inputs}
                        />
                    </View>

                    <View>
                        <Text style={styles.txtTitle}>Last Name:</Text>
                        <UserInput.TextInput
                            value={formName.lastName}
                            placeholder={`Last Name`}
                            error={formName.lastName.error}
                            onChangeText={(text) => {
                                setFormName({
                                    ...formName,
                                    lastName: {
                                        value: text,
                                        error: null,
                                    },
                                });
                            }}
                            containerStyle={styles.inputs}
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

export default ProfileName

const styles = StyleSheet.create({
    txtTitle: {
        color: AppEComm.color.text,
        fontSize: fontPixel(14),
        fontWeight: '700',
        lineHeight: 15,
        letterSpacing: 0.4,
        paddingBottom: 12,
    },
    inputs: {
        borderColor: AppEComm.color.borderColor,
        borderRadius: widthPixel(5),
        width: '100%',
        height: heightPixel(48),
    },
})