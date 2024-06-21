import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import Carousel from 'react-native-swipeable-carousel';
import { fontPixel, widthPixel } from '../../ultils/scanling';
import { AppEComm } from '../../constants/colors';

interface SliderImageProps {
    dataSliderCarousel: any;
}

const SliderImage: FC<SliderImageProps> = ({ dataSliderCarousel }) => {
    return (
        <View>
            <Carousel
                images={dataSliderCarousel}
                enableGestureSwipe={false}
                height={206}
            />
        </View>
    )
}

export default SliderImage

const styles = StyleSheet.create({
    txtPositionBackGround: {
        fontSize: fontPixel(24),
        fontWeight: '700',
        letterSpacing: 0.5,
        color: AppEComm.color.white,
        textShadowColor: '#585858',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
    },
})