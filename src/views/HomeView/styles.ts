import { Platform, StyleSheet } from "react-native";
import { AppEComm } from "../../constants/colors";
import { fontPixel, heightPixel, widthPixel } from "../../ultils/scanling";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: AppEComm.color.white,
        paddingHorizontal: widthPixel(16),
    },
    header: {
        height: heightPixel(122),
        borderBottomColor: AppEComm.color.borderColor,
        borderBottomWidth: widthPixel(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS == 'ios' ? heightPixel(50) : heightPixel(10),
        paddingHorizontal: widthPixel(16),
        backgroundColor: AppEComm.color.white,
    },
    emptyContainer: {
        paddingTop: heightPixel(16),
        marginRight: heightPixel(16),
    },
    searchProduct: {
        borderColor: AppEComm.color.borderColor,
        borderRadius: widthPixel(5),
        width: widthPixel(263),
        height: heightPixel(46),
    },
    slider: {
        borderRadius: 10,
    },
    txtPositionBackGround: {
        fontSize: fontPixel(24),
        fontWeight: '700',
        letterSpacing: 0.5,
        color: AppEComm.color.white,
        textShadowColor: '#585858',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
    },
    imgBackground: {
        borderRadius: widthPixel(5),
        height: heightPixel(206),
    },
    txtSlider: {
        position: "absolute",
        top: '35%',
        left: widthPixel(24),
        right: 0,
        width: widthPixel(208)
    },
    flexItemProduct: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})