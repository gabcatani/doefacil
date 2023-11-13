import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import * as S from './styles';
import firestore from '@react-native-firebase/firestore';
import { IDonation } from './types';
import { useNavigation } from '@react-navigation/native';
import { Marker, Callout} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageLocal } from '../../../App';

type Region = {
  latitude: number;
  longitude: number;
  // latitudeDelta: number;
  // longitudeDelta: number;
};

const ItemsList = () => {
  const [donations, setDonations] = useState<IDonation[] | null>(null)
  const [showMap, setShowMap] = useState(false)
  const [mapReady, setMapReady] = useState(false)
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);

  const handleToggle = () => {
    setShowMap(prevState => !prevState);
  };

  const getStoredLocation = () => {
    const storedLatitude = storageLocal.getNumber('latitude');
    const storedLongitude = storageLocal.getNumber('longitude');
    
    if (storedLatitude !== null && storedLatitude !== undefined && 
        storedLongitude !== null && storedLongitude !== undefined) {
      return {
        lat: storedLatitude,
        lng: storedLongitude,
      };
    }
    return null;
  };


  const calcularDistancia = (item: IDonation) => {

    console.log('ITEM', item);
   
    const loc = getStoredLocation();

    console.log('LOCC',loc)

    if(!loc || !item.address){
      return 'distância desconhecida';
    }

    console.log('loc', loc);
    
    const rad = (x: number) => (x * Math.PI) / 180;
    const R = 6371e3;
    const dLat = rad(item.address.lat - loc.lat);
    const dLong = rad(item.address.lng - loc.lng);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(loc.lat)) * Math.cos(rad(item.address.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 
  
    return `${distance.toFixed(0)} metros`;
  };

  const navigation = useNavigation();

  const handleItemPress = useCallback((item: IDonation) => {
    navigation.navigate('ItemDetails', { item });
  }, [navigation]);

  useEffect(() => {
    console.log('BUSCANDO LOCALIZACAO STORAGE', storageLocal.getNumber('latitude'))

    setCurrentRegion({latitude: storageLocal.getNumber('latitude')!, longitude: storageLocal.getNumber('longitude')!});

}, []);
  

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
          <S.CategoryText numberOfLines={1} ellipsizeMode="tail">Está a {calcularDistancia(item)} de você</S.CategoryText>
        </S.CardTextContainer>
      </S.Card>
      </TouchableOpacity>
    ),
    [currentRegion]
  );

  const renderDonationMarker = (item: IDonation) => (
    <Marker key={item.id} coordinate={{ latitude: item.address.lat, longitude: item.address.lng }}>
      <S.MarkerImage source={{ uri: item.image }} />
      <Callout>
        <S.CalloutTitle>{item.itemName}</S.CalloutTitle>
      </Callout>
    </Marker>
  );
  
  return (
    <S.Screen>
      <S.Header>
        <S.HeaderText>Doações Disponíveis</S.HeaderText>
      </S.Header>
      <S.ToggleButton onPress={handleToggle}>
        <S.ToggleText>Lista</S.ToggleText>
        <S.ToggleText>Mapa</S.ToggleText>
      </S.ToggleButton>
      {!showMap ? (
      donations ? (
        <FlatList
          data={donations}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    ) : (
        <S.MapContainer>
          <S.Map
            initialRegion={{
              latitude: currentRegion?.latitude ?? 0,
              longitude: currentRegion?.longitude ?? 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onMapReady={() => setMapReady(true)}
          >
            {mapReady && donations?.map(renderDonationMarker)}
          </S.Map>
        </S.MapContainer>
      )}
    </S.Screen>
  );
};

export default ItemsList;
