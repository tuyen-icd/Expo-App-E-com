import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import {  ICFavious, ICNotification, ICNotificationActive, IcShort } from '../../assets/icons';
import { fontPixel, heightPixel, widthPixel } from '../../ultils/scanling';
import { AppEComm } from '../../constants/colors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../navigations/routers';
import { getNotification } from '../../configs';

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
        <View><Text>Test this here!</Text></View>
    ) : (
        <></>
    );
};

interface MainRightControlProps {
    visibleNotification?: boolean,
    visibleFavious?: boolean,
    visibleShort?: boolean,
}

const MainRightControl: FC<MainRightControlProps> = ({
    visibleNotification ,
    visibleFavious ,
    visibleShort ,
}) => {

    let shakeAnimation = new Animated.Value(0);
    const navigation: any = useNavigation();
    const [dataNotification, setDataNotification] = useState<any>(null);

    const getNotificationTestApp = async () => {
        try {
            const response = await getNotification();
            if (response) {
                setDataNotification(response)
            } else {
                console.error('Received data is not an array', response);
            }
        } catch (error) {
            console.log("error_getNotificationTestApp", error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            // This effect will run when the screen is focused
            console.log('HomeScreen is focused');
            getNotificationTestApp();

            return () => {
                // This cleanup function will run when the screen is unfocused
                console.log('HomeScreen is unfocused');
            };
        }, [])
    );



    return (
        <>
            {visibleFavious && (
                <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
                    <TouchableOpacity
                        style={[styles.icon, { marginRight: 20 }]}
                        onPress={() => navigation.navigate(ROUTES.FAVORITE_PRODUCT as never)}>
                        <ICFavious />
                        <NotiNumber number={0} />
                    </TouchableOpacity>
                </Animated.View>
            )}
            {visibleNotification && (
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => navigation.navigate(ROUTES.NOTIFICATION as never, { dataGetNotification: dataNotification?.data } as never)}
                >
                    {
                        !dataNotification?.isRead ? <ICNotificationActive /> : <ICNotification />
                    }
                </TouchableOpacity>
            )}
            {visibleShort && (
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => console.log("short")}>
                    <IcShort />
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
