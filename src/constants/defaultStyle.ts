import { Platform, StyleSheet } from 'react-native';
import { AppEComm } from './colors';
import { fontPixel, heightPixel, widthPixel } from '../ultils/scanling';
export const defaultStyle = StyleSheet.create({
    containerWithHeader: {
        flex: 1,
        backgroundColor: AppEComm.color.white,
    },
    flexJustify: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
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
    body: {
        fontSize: fontPixel(13),
        lineHeight: heightPixel(24),
        fontWeight: '400',
        color: AppEComm.color.text,
    },
    emptyContainer: {
        marginRight: heightPixel(16),
    },
    flexRowStart: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    flexCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})