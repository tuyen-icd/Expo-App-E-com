import { Platform, StyleSheet } from 'react-native';
import {
    fontPixel,
    heightPixel,
    pixelSizeHorizontal,
    widthPixel,
} from '../../../ultils/scanling';
import { AppEComm } from '../../../constants/colors';

export const styles = StyleSheet.create({
    userInputWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: widthPixel(10),
        height: heightPixel(48),
        borderWidth: widthPixel(1.5),
        padding: 0,
    },
    input: {
        lineHeight: Platform.OS === 'ios' ? null : undefined,
        padding: 0,
        flex: 1,
        height: '100%',
        marginHorizontal: pixelSizeHorizontal(14),
        fontSize: fontPixel(13),
        fontWeight: '700',
        color: AppEComm.color.placeholderColor,
    },
    errorMessage: {
        color: AppEComm.color.error,
        fontSize: fontPixel(12),
        lineHeight: heightPixel(18),
        marginBottom: 16,
        marginTop: 8,
    },
});
