import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { AppEComm } from '../../constants/colors'
import BackHeader from '../../components/Header/BackHeader'
import { ICExplore } from '../../assets/icons'
import { heightPixel, widthPixel } from '../../ultils/scanling'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../navigations/routers'

interface NotificationDetailProps{
    route: any;
}

const NotificationDetail: FC<NotificationDetailProps> = ({ route }) => {
    const { notification } = route.params;
    console.log('notification', notification);
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: AppEComm.color.white, flex: 1 }}>
                <View style={styles.header}>
                        <BackHeader title={''} />
                </View>
                <View style={{ flex: 1, paddingHorizontal: 16, paddingBottom: heightPixel(50) }}></View>
            </View>
            
            <View style={styles.container}>
                <Text>{notification?.notification}</Text>
            </View>
        </View>
  )
}

export default NotificationDetail

const styles = StyleSheet.create({
    header: {
        height: heightPixel(122),
        borderBottomColor: AppEComm.color.borderColor,
        borderBottomWidth: widthPixel(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Platform.OS == 'ios' ? heightPixel(50) : heightPixel(10),
        paddingHorizontal: widthPixel(16),
        backgroundColor: AppEComm.color.white,
    },
    container: {
        backgroundColor: AppEComm.color.white,
        paddingHorizontal: widthPixel(16),
        flex: 1,
    },
});