import { FlatList, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppEComm } from '../../constants/colors'
import { fontPixel, heightPixel, widthPixel } from '../../ultils/scanling'
import BackHeader from '../../components/Header/BackHeader'
import { ICExplore, ICExploreActive } from '../../assets/icons'
import SliderImage from '../../components/SliderBox/SliderImage'
import axios from 'axios'
import ItemProduct from '../../components/ItemProduct/ItemProduct'
import UserInput from '../../components/UserInput'
import { Skeleton } from '@nlazzos/react-native-skeleton'

const FlashSaleScreen = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [flagSearch, setFlagSearch] = useState(false)
    const [flashSale, setFlashSale] = useState<any>([]);
    const [dataSliderCarousel, setDataSliderCarousel] = useState([]);
    useEffect(() => {
        const dataFlashSale = axios.get('https://dummyjson.com/products?limit=20&skip=35&select=id,title,price,description,discountPercentage,rating,stock,brand,category,thumbnail,images')
            .then((response) => {
                setFlashSale(response.data.products)
            })

        const dataSlider = axios.get('https://dummyjson.com/products?limit=5&skip=1&select=thumbnail')
            .then((response) => {
                const result = response.data.products.map((item: { thumbnail: string }) => item.thumbnail);
                setDataSliderCarousel(result)
            })
    }, [])

    const handleSreachTermChange = (e: string) => {
        setSearchTerm(e);
    };
    const handleSearchSubmit = () => {
        setFlagSearch(false);
        console.log("abc")
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                {
                    !flagSearch ? <BackHeader title={'Super Flash Sale'} /> : ''
                }

                <TouchableOpacity onPress={() => setFlagSearch(true)}>
                    {
                        !flagSearch ? <ICExplore /> :
                            <View style={styles.emptyContainer}>
                                <UserInput.TextInput
                                    rightComponent={iconProps => <ICExploreActive {...iconProps} />}
                                    placeholder={'Search Product'}
                                    containerStyle={styles.searchProduct}
                                    onChangeText={handleSreachTermChange}
                                    value={searchTerm}
                                    returnKeyType="search"
                                    onSubmitEditing={handleSearchSubmit}
                                />
                            </View>
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingTop: heightPixel(16) }}>
                        {
                            !dataSliderCarousel ?
                                <Skeleton style={{
                                    width: widthPixel(343),
                                    height: heightPixel(206)
                                }} /> :
                                <View>
                                    <SliderImage dataSliderCarousel={dataSliderCarousel} />
                                    <View style={{ position: 'absolute', top: '30%', left: widthPixel(24), width: widthPixel(209) }}>
                                        <Text style={styles.txtPositionBackGround}>Super Flash Sale 50% Off</Text>
                                    </View>
                                </View>
                        }


                    </View>

                    <View style={{ marginTop: heightPixel(16), paddingBottom: heightPixel(150) }}>
                        <FlatList
                            data={flashSale}
                            renderItem={({ item }) =>
                                <ItemProduct
                                    id={item?.id}
                                    title={item?.title}
                                    price={item?.price}
                                    discountPercentage={item?.discountPercentage}
                                    thumbnail={item?.thumbnail}
                                    containerStyle={styles.flexItemProduct}
                                    dataProducts={item}
                                    tag={true}
                                />}
                            horizontal={false}
                            scrollEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            numColumns={2}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                </ScrollView>
            </View>
        </View>
    )
}

export default FlashSaleScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppEComm.color.white,
        paddingHorizontal: widthPixel(16),
    },
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
    txtPositionBackGround: {
        fontSize: fontPixel(24),
        fontWeight: '700',
        letterSpacing: 0.5,
        color: AppEComm.color.white,
        textShadowColor: '#585858',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
    },
    flexItemProduct: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    emptyContainer: {
        paddingTop: heightPixel(16),
        marginRight: heightPixel(16),
    },
    searchProduct: {
        borderColor: AppEComm.color.borderColor,
        borderRadius: widthPixel(5),
        width: widthPixel(340),
        height: heightPixel(46),
    },
})