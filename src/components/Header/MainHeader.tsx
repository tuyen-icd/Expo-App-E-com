import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import MainRightControl from './MainRightControl'
import { heightPixel, widthPixel } from '../../ultils/scanling'
import { AppEComm } from '../../constants/colors'

interface MainHeaderProps {
    containerStyle?: {},
    title?: string,
}

const MainHeader: FC<MainHeaderProps> = ({ containerStyle, title }) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[styles.title]}>{title}</Text>
            <View style={styles.emptyContainer}></View>
            <MainRightControl visibleNotification={true} visibleFavious={true} />
        </View>
    )
}

export default MainHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: Platform.OS === 'ios' ? heightPixel(50) : heightPixel(20),
        paddingBottom: heightPixel(20),
        paddingHorizontal: widthPixel(10),
        alignItems: 'center',
        backgroundColor: AppEComm.color.gradientForm
    },
    emptyContainer: {
        flex: 1,
    },
    title: {
        marginLeft: widthPixel(10),
    },
});
