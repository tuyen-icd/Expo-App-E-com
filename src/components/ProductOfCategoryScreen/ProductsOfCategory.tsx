import { FlatList, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { fontPixel, heightPixel, widthPixel } from '../../ultils/scanling'
import { AppEComm } from '../../constants/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BackHeader from '../Header/BackHeader'
import { ICExplore, ICExploreActive, IcNotFound } from '../../assets/icons'
import UserInput from '../UserInput'
import ItemProduct from '../ItemProduct/ItemProduct'
import axios from 'axios'
import { truncateString } from '../../ultils/truncateString'
import { capitalizeFirstLetter } from '../../ultils/CapitalizeFirstString'
import Button from '../Button/Button'
import { ROUTES } from '../../navigations/routers'
import { useNavigation } from '@react-navigation/native'

interface ProductsOfCategoryProps {
    route: any,
}

const ProductsOfCategory: FC<ProductsOfCategoryProps> = ({ route }) => {
    const { title } = route.params;
    const navigation = useNavigation();
    const [searchTerm, setSearchTerm] = useState('');
    const [flagSearch, setFlagSearch] = useState(false);
    const [dataCallApi, getDataCallApi] = useState<any>([]);

    useEffect(() => {
        const productsOfCategory = axios.get(`https://dummyjson.com/products/category/${title}`)
            .then((response) => getDataCallApi(response.data))
    }, [])

    const handleSreachTermChange = (e: string) => {
        setSearchTerm(e);
    };
    const handleSearchSubmit = () => {
        setFlagSearch(false);
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                {
                    !flagSearch
                        ? <BackHeader title={truncateString(capitalizeFirstLetter(title), 50)} />
                        : ''
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
                    {/* <View style={{ paddingTop: heightPixel(16) }}>
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
                     */}
                    {
                        dataCallApi.total === 0 ?
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingTop: heightPixel(100)
                                }}>
                                <IcNotFound />
                                <Text
                                    style={{
                                        color: AppEComm.color.black,
                                        fontSize: fontPixel(24),
                                        fontWeight: '700',
                                        letterSpacing: 0.5
                                    }}>Product Not Found</Text>
                                <Text
                                    style={{
                                        color: AppEComm.color.placeholderColor,
                                        fontSize: fontPixel(12),
                                        letterSpacing: 1,
                                        lineHeight: 15,
                                        paddingVertical: 8
                                    }}>Thank you for shopping using lafyuu</Text>
                                <Button
                                    text="Back to Home"
                                    buttonSize="Medium"
                                    onPress={() => navigation.navigate(ROUTES.HOME as never)}
                                />
                            </View>
                            : <View style={{ marginTop: heightPixel(16), paddingBottom: heightPixel(150) }}>
                                <FlatList
                                    data={dataCallApi.products}
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
                    }


                </ScrollView>
            </View>
        </View>
    )
}

export default ProductsOfCategory

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