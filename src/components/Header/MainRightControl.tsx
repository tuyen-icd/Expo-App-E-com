import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { ICCart, ICFavious, ICNotification } from '../../assets/icons';
import { fontPixel, heightPixel, widthPixel } from '../../ultils/scanling';
import { AppEComm } from '../../constants/colors';

interface NotiNumberProps {
    number: number,
}

interface NotiDotProps {
    isVisible: boolean,
}

const NotiNumber: FC<NotiNumberProps> = ({ number }) => {
    return number > 0 ? (
        <View>
            <Text>{number}</Text>
        </View>
    ) : (
        <View />
    );
};

const NotiDot: FC<NotiDotProps> = ({ isVisible }) => {
    return isVisible ? (
        <View></View>
    ) : (
        <></>
    );
};

const MainRightControl = ({
    visibleNotification = true,
    visibleFavious = true,

}) => {
    let shakeAnimation = new Animated.Value(0);
    return (
        <>
            {visibleFavious && (
                <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
                    <TouchableOpacity
                        style={[styles.icon, { marginRight: 20 }]}
                        onPress={() => console.log("xyz")}>
                        <ICFavious />
                        <NotiNumber number={0} />
                    </TouchableOpacity>
                </Animated.View>
            )}
            {visibleNotification && (
                <TouchableOpacity style={styles.icon} onPress={() => console.log("abc")}>
                    <ICNotification />
                    <NotiDot
                        isVisible={true}
                    />
                </TouchableOpacity>
            )}

        </>
    )
}

export default MainRightControl

const styles = StyleSheet.create({
    icon: {
        marginRight: widthPixel(16),
    },
    notiNumberContainer: {
        position: 'absolute',
        top: -8,
        right: -8,
        height: heightPixel(19),
        width: heightPixel(19),
        backgroundColor: AppEComm.color.gradientForm,
        borderRadius: 100,
    },
    notiDotContainer: {
        position: 'absolute',
        top: heightPixel(0),
        right: widthPixel(1),
        height: heightPixel(10),
        width: heightPixel(10),
        backgroundColor: AppEComm.color.gradientForm,
        borderRadius: 100,
    },
    notiNumber: {
        fontSize: fontPixel(10),
    },
});