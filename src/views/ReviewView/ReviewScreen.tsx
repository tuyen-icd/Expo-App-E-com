import { Platform, StyleSheet, View } from 'react-native'
import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import { AppEComm } from '../../constants/colors'
import { heightPixel, widthPixel } from '../../ultils/scanling'
import BackHeader from '../../components/Header/BackHeader'
import axios from 'axios'
import ItemReview from './components/ItemReview'
import { FlatList } from 'react-native-gesture-handler'
import Button from '../../components/Button/Button'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../navigations/routers'

export interface ReviewScreenProps {
    route?: any
}

const ReviewScreen: FC<ReviewScreenProps> = ({ route }) => {
    const navigation: any = useNavigation();
    const { allComments, postId } = route.params;

    return (

        <View style={{ backgroundColor: AppEComm.color.white, flex: 1 }}>
            <View style={styles.header}>
                <BackHeader title={`${allComments.total} Review`} />
            </View>
            <View style={{ paddingHorizontal: widthPixel(16), flex: 1 }}>
                <FlatList
                    data={allComments.comments}
                    renderItem={({ item }) => <ItemReview commnents={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                />
            </View>
            <View style={{ paddingBottom: heightPixel(50), paddingHorizontal: widthPixel(16) }}>

                <Button
                    text="Write Review"
                    buttonSize="Medium"
                    onPress={() => navigation.navigate(ROUTES.WRITE_REVIEW as never, { postId: postId } as never)}
                />
            </View>
        </View>
    )
}

export default ReviewScreen

const styles = StyleSheet.create({
    header: {
        height: heightPixel(122),
        borderBottomColor: AppEComm.color.borderColor,
        borderBottomWidth: widthPixel(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Platform.OS == 'ios' ? heightPixel(50) : heightPixel(10),
        paddingHorizontal: widthPixel(16),
        backgroundColor: AppEComm.color.white,
    },
})