import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import * as S from './styles';
import firestore from '@react-native-firebase/firestore';
import { IDonation } from './types';
import { useNavigation } from '@react-navigation/native';

const ItemsList = () => {
  const [donations, setDonations] = useState<IDonation[] | null>(null)

  const navigation = useNavigation();

  const handleItemPress = useCallback((item: IDonation) => {
    navigation.navigate('ItemDetails', { item });
  }, [navigation]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const querySnapshot = await firestore().collection('donations').get();
        const data = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        })) as IDonation[]
        setDonations(data);
      } catch (error) {
        console.error("Erro ao buscar doações: ", error);
      }
    };
    fetchDonations();
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: IDonation; index: number }) => (
      <TouchableOpacity onPress={() => handleItemPress(item)}>
      <S.Card key={index}>
        <S.ImagemContainer>
          <S.ItemImage source={{ uri: item.image }} />
        </S.ImagemContainer>
        <S.CardTextContainer>
          <S.NameText>{item.itemName}</S.NameText>
          <S.CategoryText numberOfLines={1} ellipsizeMode="tail">{item.local}</S.CategoryText>
        </S.CardTextContainer>
      </S.Card>
      </TouchableOpacity>
    ),
    []
  );

  
  return (
    <S.Screen>
      <S.Header>
        <S.HeaderText>Doações Disponiveis</S.HeaderText>
      </S.Header>
      <FlatList
        data={donations}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </S.Screen>
  );
};

export default ItemsList;
