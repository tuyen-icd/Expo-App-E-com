import { StyleSheet } from 'react-native';
import { fontPixel, heightPixel, widthPixel } from '../../ultils/scanling';
import { AppEComm } from '../../constants/colors';

export const styles = StyleSheet.create({
    title: {
        fontSize: fontPixel(16),
        lineHeight: 15,
        textAlign: 'center',
        color: AppEComm.color.black,
        letterSpacing: 0.5,
        fontWeight: '700',
        paddingTop: 16,
        paddingBottom: 8,
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        width: widthPixel(137),
        height: heightPixel(2),
        backgroundColor: '#EBF0FF',
    },
    txt: {
        color: AppEComm.color.placeholderColor,
        letterSpacing: 0.5,
        fontSize: fontPixel(14),
        fontWeight: '700',
        textAlign: 'center',
    },
    txtForgotPassword: {
        color: AppEComm.color.blue_001,
        textAlign: 'center',
        fontSize: fontPixel(12),
        fontWeight: '700',
        lineHeight: 15,
        letterSpacing: 0.5,
    },
    section: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: heightPixel(20)
    },
    isChecked: {
        margin: 8,
        width: widthPixel(18),
        height: heightPixel(18),
        borderColor: AppEComm.color.blue_001,
    },
});
