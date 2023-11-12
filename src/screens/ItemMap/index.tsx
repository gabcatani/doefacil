import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import * as S from './styles';
import firestore from '@react-native-firebase/firestore';
import { IDonation } from './types';
import { useNavigation } from '@react-navigation/native';

const ItemMap =  ({ route }) => {
  
  const { item } = route.params;

  return (
    <S.Screen>
      <S.Header>
        <S.HeaderText></S.HeaderText>
        <S.HeaderText>{item.itemName}</S.HeaderText>
      </S.Header>
      
    </S.Screen>
  );
};

export default ItemMap;
