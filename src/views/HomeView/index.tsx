import { View, Text } from 'react-native'
import React, { FC } from 'react'
import HomeScreen from './HomeScreen'
import { defaultStyle } from '../../constants/defaultStyle'

export interface HomeScreenProps {
    route: any
}
const HomeView: FC<HomeScreenProps> = ({ route }) => {
    console.log('routerouteroute :>> ', route);

    return (
        <View style={defaultStyle.containerWithHeader}>
            <HomeScreen route={route} />
        </View>
    )
}

export default HomeView