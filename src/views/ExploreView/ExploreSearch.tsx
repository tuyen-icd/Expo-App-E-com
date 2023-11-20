import { FlatList, ScrollView, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import UserInput from '../../components/UserInput'
import { AppEComm } from '../../constants/colors'
import MainRightControl from '../../components/Header/MainRightControl'
import { ICExploreActive, IcNotFound } from '../../assets/icons'
import { styles } from "../HomeView/styles";
import BackHeader from '../../components/Header/BackHeader'
import axios from 'axios'
import { fontPixel, heightPixel, widthPixel } from '../../ultils/scanling'
import ItemProduct from '../../components/ItemProduct/ItemProduct'
import Button from '../../components/Button/Button'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '../../navigations/routers'

interface ExploreSearchProps {
    route: any,
}

const ExploreSearch: FC<ExploreSearchProps> = ({ route }) => {
    const { txtSearch } = route.params || '';
    const navigation = useNavigation();

    const [searchInput, setSearchInput] = useState(txtSearch);

    const [valueInput, setValueInput] = useState('');
    const [dataSearch, getDataSearch] = useState<any>([]);


    useEffect(() => {
        if (searchInput !== '') {
            axios.get(`https://dummyjson.com/products/search?q=${searchInput}`)
                .then((response) => getDataSearch(response.data))
                .catch(error => console.log('error :>> ', error));
        }

        return () => {
            setSearchInput('');
            setValueInput('');
        }
    }, [searchInput]);



    const handleSreachTermChange = (searchValue: string) => {
        setValueInput(searchValue);
    }
    const handleSearchSubmit = () => {
        setSearchInput(valueInput);
    }

    const handleShort = () => {
        const dataShort = dataSearch.products.sort((a: { price: number }, b: { price: number }) => b.price - a.price);
        // getDataSearch(dataShort)
    }
    return (
        <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
            <View style={styles.header}>
                <BackHeader />
                <View style={styles.emptyContainer}>
                    <UserInput.TextInput
                        leftComponent={(iconProps) => <ICExploreActive {...iconProps} />}
                        placeholder={"Search Product"}
                        containerStyle={styles.searchProduct}
                        onChangeText={handleSreachTermChange}
                        value={valueInput}
                        returnKeyType="search"
                        onSubmitEditing={handleSearchSubmit}
                    />
                </View>
                <MainRightControl visibleNotification={false} visibleFavious={false} visibleShort={true} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ paddingHorizontal: widthPixel(16) }}>
                    <View>
                        <Text
                            style={{
                                color: AppEComm.color.text,
                                fontSize: fontPixel(12),
                                fontWeight: '700',
                                lineHeight: 18,
                                letterSpacing: 0.5,
                                paddingVertical: heightPixel(16)
                            }}>
                            {dataSearch.total} Result
                        </Text>
                    </View>
                    {
                        dataSearch.total == 0 ? (
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
                        ) : (
                            <View>

                                <FlatList
                                    data={dataSearch.products}
                                    renderItem={({ item }) => (
                                        <ItemProduct
                                            id={item?.id}
                                            title={item?.title}
                                            price={item?.price}
                                            discountPercentage={item?.discountPercentage}
                                            thumbnail={item?.thumbnail}
                                            containerStyle={styles.flexItemProduct}
                                            dataProducts={item}
                                            tag={true}
                                        />
                                    )}
                                    horizontal={false}
                                    scrollEnabled={false}
                                    showsVerticalScrollIndicator={false}
                                    numColumns={2}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>

                        )
                    }
                </View >
            </ScrollView >
        </View >
    )
}

export default ExploreSearch