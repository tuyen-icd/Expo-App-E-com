import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import getStoredData from '../../redux/Helpers';
import { FAVORITE_REDUCER } from '../../redux/reducers/ReducerTypes';

const FavoriteProduct = () => {
  const { data: favoriteRedux } = getStoredData(FAVORITE_REDUCER);
  console.log('favoriteRedux :>> ', favoriteRedux);

  return (
    <View>
      <Text>FavoriteProduct</Text>
    </View>
  )
}

export default FavoriteProduct

const styles = StyleSheet.create({})