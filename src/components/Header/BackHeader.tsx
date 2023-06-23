import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ICBack } from '../../assets/icons'
import { fontPixel, heightPixel, widthPixel } from '../../ultils/scanling'
import { AppEComm } from '../../constants/colors'

const BackHeader = ({
    containerStyle = {},
    title = '',
    children = undefined,
    goBackHandle = () => { },
}) => {
    const navigation: any = useNavigation()
    return (
        <View style={styles.flexRow}>
            <TouchableOpacity onPress={() => {
                if (navigation.canGoBack()) {
                    navigation.goBack()
                } else {
                    navigation.navigate('UserTab' as any);
                }
                goBackHandle && goBackHandle();
            }}>
                <ICBack />
            </TouchableOpacity>
            <Text style={styles.txtTileHeader}>{title}</Text>
            {children && children}
        </View>
    )
}

export default BackHeader

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: widthPixel(20),
    },
    container: {
        flexDirection: 'row',
        paddingTop: Platform.OS === 'ios' ? heightPixel(50) : heightPixel(20),
        paddingBottom: heightPixel(20),
        paddingHorizontal: widthPixel(16),
        alignItems: 'center',
        backgroundColor: AppEComm.color.red,
    },
    txtTileHeader: {
        fontSize: fontPixel(16),
        fontWeight: '700',
        // lineHeight: 15,
        letterSpacing: 0.5,
        color: AppEComm.color.text,
    },
});