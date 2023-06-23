import React from 'react'
import FlashSaleScreen from './FlashSaleScreen'
import { View } from 'react-native'
import { defaultStyle } from '../../constants/defaultStyle'

const FlashSaleView = () => {
    return (
        <View style={defaultStyle.containerWithHeader}>
            <FlashSaleScreen />
        </View>
    )
}

export default FlashSaleView