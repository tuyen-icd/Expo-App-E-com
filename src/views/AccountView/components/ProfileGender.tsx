import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Spacer from '../../../components/Spacer';
import { AppEComm } from '../../../constants/colors';
import Button from '../../../components/Button/Button';
import { widthPixel } from '../../../ultils/scanling';
import BackHeader from '../../../components/Header/BackHeader';
import { defaultStyle } from '../../../constants/defaultStyle';
import UserInput from '../../../components/UserInput';

const ProfileGender = () => {

    const [chooseGender, getChooseGender] = useState('MALE');
    const methodPickHandler = (data: string) => {
        if (data === 'Male') {
            getChooseGender('MALE');
        }
        if (data === 'Female') {
            getChooseGender('FEMALE');
        }
        if (data === 'Orther') {
            getChooseGender('ORTHER');
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
            <View style={defaultStyle.header}>

                <View style={defaultStyle.emptyContainer}>
                    <BackHeader title={'Gender'} />
                </View>
            </View>
            <View style={{ paddingHorizontal: widthPixel(16), flex: 1 }}>
                <View style={{ paddingTop: 16 }}>
                    <UserInput.Picker
                        title={'Choose Gender'}
                        data={['Male', 'Female', 'Other']}
                        value={'Male'}
                        containerStyle={{}}
                        onPickedData={methodPickHandler}
                        linearGradient={true}
                    />
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

export default ProfileGender

const styles = StyleSheet.create({})