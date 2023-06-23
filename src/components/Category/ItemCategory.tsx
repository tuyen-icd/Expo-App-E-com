import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { AppEComm } from '../../constants/colors'
import { fontPixel, heightPixel, widthPixel } from '../../ultils/scanling'

interface ItemCategoryProps {
    title: string,
    id: number,
    image: any,
}

const ItemCategory: FC<ItemCategoryProps> = ({ title, id, image }) => {

    return (
        <TouchableOpacity>
            <View style={{ alignItems: 'center', paddingRight: widthPixel(13) }}>
                <View style={styles.itemCategory}>{image}</View>
                <Text
                    style={{
                        color: AppEComm.color.placeholderColor,
                        fontWeight: '400',
                        fontSize: fontPixel(10),
                        lineHeight: 15,
                        letterSpacing: 0.5,
                        marginTop: heightPixel(8)
                    }}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ItemCategory

const styles = StyleSheet.create({
    itemCategory: {
        borderColor: AppEComm.color.borderColor,
        borderWidth: widthPixel(1),
        borderRadius: 100,
        flex: 0,
        padding: heightPixel(23),
        height: heightPixel(70),
        width: widthPixel(70),
        alignItems: 'center',
        justifyContent: 'center',
    }
})