import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AppEComm } from '../../constants/colors';

const CustomTabBarButton = (props: any) => {
    const { route, children, accessibilityState, onPress } = props;

    if (accessibilityState.selected) {
        return (
            <View style={styles.btnWrapper}>
                <View style={{ flexDirection: 'row' }}>
                    <View
                        style={[
                            styles.svgGapFiller,
                            {
                                borderTopLeftRadius: route === 'Home' ? 10 : 0,
                            },
                        ]}
                    />
                    <Svg width={71} height={58} viewBox="0 0 75 61">
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={AppEComm.color.white}
                        />
                    </Svg>
                    <View
                        style={[
                            styles.svgGapFiller,
                            {
                                borderTopRightRadius: route === 'Account' ? 10 : 0,
                            },
                        ]}
                    />
                </View>
                {/* Vòng tròn */}
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onPress}
                    style={[styles.activeBtn]}>
                    <View>{children}</View>

                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={onPress}
                style={[
                    styles.inactiveBtn,
                    {
                        borderTopLeftRadius: route === 'Home' ? 10 : 0,
                        borderTopRightRadius: route === 'Account' ? 10 : 0,
                    },
                ]}>
                <View>{children}</View>
            </TouchableOpacity>
        );
    }
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
    btnWrapper: {
        // flex: 1,

        alignItems: 'center',
        // backgroundColor: 'red',

    },
    activeBtn: {
        flex: 1,
        position: 'absolute',
        top: -22,
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: AppEComm.color.white,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        shadowColor: AppEComm.color.black,
        shadowOffset: {
            width: 0,
            height: -1,
        },
        shadowOpacity: 0.25,
        elevation: 4,
    },
    inactiveBtn: {
        flex: 1,
        backgroundColor: AppEComm.color.white,
        justifyContent: 'center',
        alignItems: 'center',
        height: 58,
    },
    svgGapFiller: {
        flex: 1,
        backgroundColor: 'pink',
        height: 50,
    },
});
