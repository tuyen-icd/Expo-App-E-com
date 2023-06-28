import { Platform, StyleSheet } from 'react-native';
import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../ultils/scanling';
import { AppEComm } from '../../constants/colors';
import { defaultStyle } from '../../constants/defaultStyle';

export const styles = StyleSheet.create({
    errorMessage: {
        color: AppEComm.color.error,
        fontSize: fontPixel(12),
        lineHeight: heightPixel(18),
        marginBottom: 16,
        marginTop: 8,
    },
    userInputWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: widthPixel(12),
        height: heightPixel(48),
        borderWidth: widthPixel(1.5),
        padding: 0,
    },
    textArea: {
        paddingVertical: pixelSizeVertical(10),
        minHeight: heightPixel(100),
    },
    input: {
        ...defaultStyle.body,
        lineHeight: Platform.OS === 'ios' ? null : undefined,
        padding: 0,
        flex: 1,
        height: '100%',
        marginHorizontal: pixelSizeHorizontal(14),
        fontSize: fontPixel(14),
        color: AppEComm.color.placeholderColor,
    },
    pickerWrap: {
        marginLeft: pixelSizeHorizontal(14),
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        height: '100%',
    },
    pickerText: {
        ...defaultStyle.body,
    },
})

