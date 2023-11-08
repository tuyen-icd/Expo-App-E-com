import { View, Text } from 'react-native'
import React from 'react'
import FavoriteProduct from './FavoriteProduct'
import { useNavigation } from '@react-navigation/native';
import { AppEComm } from '../../constants/colors';
import { defaultStyle } from '../../constants/defaultStyle';
import BackHeader from '../../components/Header/BackHeader';

const FavoriteView = () => {
    const navigation = useNavigation();
  return (
      <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
          <View style={defaultStyle.header}>

              <View style={defaultStyle.emptyContainer}>
                  <BackHeader title={'Favorite Product'} />
              </View>
          </View>

          <FavoriteProduct/>
      </View>
  )
}

export default FavoriteView