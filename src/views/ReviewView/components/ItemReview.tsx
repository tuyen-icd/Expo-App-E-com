import { StyleSheet, Text, View, Image } from 'react-native'
import React, { FC } from 'react'
import { fontPixel, heightPixel, widthPixel } from '../../../ultils/scanling'
import { ICUser } from '../../../assets/icons'
import { AppEComm } from '../../../constants/colors'
import { capitalizeFirstLetter } from '../../../ultils/CapitalizeFirstString'
interface ItemReviewProps {
    newElementReview?: any,
    commnents?: any
}
const ItemReview: FC<ItemReviewProps> = ({ newElementReview, commnents }) => {
    return (
        <View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 16,
                paddingVertical: heightPixel(16),
            }}>
                <Image
                    source={ICUser}
                    style={{
                        backgroundColor: '#FFFF',
                        alignItems: 'center',
                        borderColor: AppEComm.color.borderColor,
                        borderWidth: widthPixel(1.5),
                        borderRadius: 100,
                        height: heightPixel(48),
                        width: widthPixel(48),
                        justifyContent: 'center',

                    }} />
                <Text style={styles.txtSmall}>{capitalizeFirstLetter(newElementReview ? newElementReview?.user?.username : commnents?.user?.username)}</Text>
            </View>
            <Text style={{
                color: AppEComm.color.placeholderColor,
                fontSize: fontPixel(12),
                fontWeight: '400',
                letterSpacing: 1,
                lineHeight: 18,
            }}>{newElementReview ? newElementReview?.body : commnents?.body}</Text>
        </View>
    )
}

export default ItemReview

const styles = StyleSheet.create({
    txtSmall: {
        fontSize: fontPixel(14),
        fontWeight: '700',
        color: AppEComm.color.text,
        letterSpacing: 0.5,
        lineHeight: 15
    },
})