import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { useNavigation } from '@react-navigation/native';
import { heightPixel, widthPixel } from '../../ultils/scanling';
import { AppEComm } from '../../constants/colors';

interface TextHeaderProps {
    containerStyle?: {},
    controlLeft: any,
    controlRight: any,
}

const TextHeader: FC<TextHeaderProps> = ({ containerStyle, controlLeft, controlRight }) => {
    const navigation = useNavigation();

    if (!controlLeft.title) {
        controlLeft = {
            title: `Back`,
            onPressLeft: () => {
                navigation.goBack();
            },
        };
    }
    return (
        <View style={[styles.container, containerStyle]}>
            <TouchableOpacity onPress={() => controlLeft?.onPressLeft()}>
                <Text style={[styles.title]}>{controlLeft?.title}</Text>
            </TouchableOpacity>
            <View style={styles.emptyContainer}></View>
            {controlRight?.title && (
                <TouchableOpacity onPress={() => controlRight?.onPressRight()}>
                    <Text style={[styles.title, styles.redText]}>
                        {controlRight?.title}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default TextHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: Platform.OS === 'ios' ? heightPixel(50) : heightPixel(20),
        paddingBottom: heightPixel(20),
        paddingHorizontal: widthPixel(16),
        alignItems: 'center',
        backgroundColor: AppEComm.color.placeholderColor,
    },
    emptyContainer: {
        flex: 1,
    },
    title: {
        marginLeft: widthPixel(10),
        marginRight: widthPixel(10),
    },
    redText: {
        color: AppEComm.color.placeholderColor,
        fontWeight: '600',
    },
});
