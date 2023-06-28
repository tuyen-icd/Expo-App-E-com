import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Spacer from '../../../components/Spacer';
import { AppEComm } from '../../../constants/colors';
import Button from '../../../components/Button/Button';
import { widthPixel } from '../../../ultils/scanling';
import BackHeader from '../../../components/Header/BackHeader';
import { defaultStyle } from '../../../constants/defaultStyle';

const ProfileGender = () => {
    return (
        <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
            <View style={defaultStyle.header}>

                <View style={defaultStyle.emptyContainer}>
                    <BackHeader title={'Gender'} />
                </View>
            </View>
            <View style={{ paddingHorizontal: widthPixel(16), flex: 1 }}>
                <View style={{ paddingTop: 16 }}>

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