import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { fontPixel } from '../../../ultils/scanling'
import { AppEComm } from '../../../constants/colors'
import { AirbnbRating } from 'react-native-ratings'
import ItemReview from '../../ReviewView/components/ItemReview'

interface ProductReviewProps {
    dataProduct?: any
    newElementReview?: any,
    ratingReview?: number,
}

const ProductReview: FC<ProductReviewProps> = ({ dataProduct, newElementReview }) => {

    return (

        <View style={{ alignItems: 'flex-start' }}>
            <AirbnbRating
                count={5}
                showRating={false}
                defaultRating={dataProduct?.rating}
                size={18}
                isDisabled={true}
                reviewColor='red'
            />
            {
                newElementReview &&
                <ItemReview newElementReview={newElementReview} />
            }

        </View>
    )
}

export default ProductReview

const styles = StyleSheet.create({
    txtSmall: {
        fontSize: fontPixel(14),
        fontWeight: '700',
        color: AppEComm.color.text,
        letterSpacing: 0.5,
        lineHeight: 15
    },
})