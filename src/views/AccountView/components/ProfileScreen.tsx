import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { fontPixel, heightPixel, widthPixel } from '../../../ultils/scanling'
import { defaultStyle } from '../../../constants/defaultStyle'
import { AppEComm } from '../../../constants/colors'
import BackHeader from '../../../components/Header/BackHeader'
import { ICDateActive, ICEmailLight, ICGender, ICNextRight, ICPasswordActive, IcPhoneActiveV, ImageProfile } from '../../../assets/icons'
import Spacer from '../../../components/Spacer'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../../navigations/routers'
import { AUTH_REDUCER } from '../../../redux/reducers/ReducerTypes'
import getStoredData from '../../../redux/Helpers'

const ProfileScreen = () => {

    let { data: authLogin } = getStoredData(AUTH_REDUCER)
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
            <View style={defaultStyle.header}>

                <View style={defaultStyle.emptyContainer}>
                    <BackHeader title={'Profile'} />
                </View>
            </View>
            <View style={{ paddingHorizontal: widthPixel(16) }}>
                <TouchableOpacity onPress={() => navigation.navigate(ROUTES.PROFILE_NAME as never)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 16 }}>

                        {/* <Image style={styles.avatar} source={ImageProfile} /> */}
                        <Image style={styles.avatar} source={{ uri: authLogin?.image }} />

                        <View>
                            <Text style={styles.txtTitle}>{authLogin?.firstName} { authLogin?.lastName}</Text>
                            <Spacer height={5} />
                            <Text style={styles.txtSmall}>{authLogin?.email}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ marginTop: heightPixel(16) }}>
                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.PROFILE_GENDER as never)}>
                        <View style={[defaultStyle.flexJustify, { paddingVertical: 16 }]}>
                            <View style={[defaultStyle.flexRowStart, { gap: 16 }]}>
                                <View style={[defaultStyle.flexCenter, { width: widthPixel(30) }]}>
                                    <ICGender />
                                </View>
                                <Text style={styles.txtTitle}>Gender</Text>
                            </View>
                            <View style={[defaultStyle.flexRowStart, { gap: 16 }]}>
                                <Text style={styles.txtSmall}>Male</Text>
                                <ICNextRight />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.PROFILE_BIRTH_DAY as never)}>
                        <View style={[defaultStyle.flexJustify, { paddingVertical: 16 }]}>
                            <View style={[defaultStyle.flexRowStart, { gap: 16 }]}>
                                <View style={[defaultStyle.flexCenter, { width: widthPixel(30) }]}>
                                    <ICDateActive />
                                </View>
                                <Text style={styles.txtTitle}>Birthday</Text>
                            </View>
                            <View style={[defaultStyle.flexRowStart, { gap: 16 }]}>
                                <Text style={styles.txtSmall}>12-12-2000</Text>
                                <ICNextRight />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.PROFILE_EMAIL as never)}>
                        <View style={[defaultStyle.flexJustify, { paddingVertical: 16 }]}>
                            <View style={[defaultStyle.flexRowStart, { gap: 16 }]}>
                                <View style={[defaultStyle.flexCenter, { width: widthPixel(30) }]}>
                                    <ICEmailLight />
                                </View>
                                <Text style={styles.txtTitle}>Email</Text>
                            </View>
                            <View style={[defaultStyle.flexRowStart, { gap: 16 }]}>
                                <Text style={styles.txtSmall}>{ authLogin?.email}</Text>
                                <ICNextRight />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.PROFILE_PHONE as never)}>
                        <View style={[defaultStyle.flexJustify, { paddingVertical: 16 }]}>
                            <View style={[defaultStyle.flexRowStart, { gap: 16 }]}>
                                <View style={[defaultStyle.flexCenter, { width: widthPixel(30) }]}>
                                    <IcPhoneActiveV />
                                </View>
                                <Text style={styles.txtTitle}>Phone Number</Text>
                            </View>
                            <View style={[defaultStyle.flexRowStart, { gap: 16 }]}>
                                <Text style={styles.txtSmall}>0913454545</Text>
                                <ICNextRight />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(ROUTES.PROFILE__CHANGE_PASSWORD as never)}>
                        <View style={[defaultStyle.flexJustify, { paddingVertical: 16 }]}>
                            <View style={[defaultStyle.flexRowStart, { gap: 16 }]}>
                                <View style={[defaultStyle.flexCenter, { width: widthPixel(30) }]}>
                                    <ICPasswordActive />
                                </View>
                                <Text style={styles.txtTitle}>Change Password</Text>
                            </View>
                            <View style={[defaultStyle.flexRowStart, { gap: 16 }]}>
                                <Text style={styles.txtSmall}>**********</Text>
                                <ICNextRight />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    avatar: {
        width: widthPixel(72),
        height: heightPixel(72)
    },
    txtTitle: {
        fontSize: fontPixel(14),
        fontWeight: '700',
        lineHeight: 15,
        letterSpacing: 0.5,
        color: AppEComm.color.text,
    },
    txtSmall: {
        fontSize: fontPixel(12),
        lineHeight: 15,
        letterSpacing: 0.5,
        color: AppEComm.color.placeholderColor,
    },
})