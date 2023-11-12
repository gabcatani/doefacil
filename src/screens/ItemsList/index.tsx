import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import * as S from './styles';
import firestore from '@react-native-firebase/firestore';
import { IDonation } from './types';
import { useNavigation } from '@react-navigation/native';
import { Marker, Callout} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { MMKV } from 'react-native-mmkv';

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const ItemsList = () => {
  const [donations, setDonations] = useState<IDonation[] | null>(null)
  const [showMap, setShowMap] = useState(false)
  const [mapReady, setMapReady] = useState(false)
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);

  const storage = new MMKV();

  const handleToggle = () => {
    setShowMap(prevState => !prevState);
  };

  const navigation = useNavigation();

  const handleItemPress = useCallback((item: IDonation) => {
    navigation.navigate('ItemDetails', { item });
  }, [navigation]);


  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('position', position);
        const { latitude, longitude } = position.coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
  
        storage.set('latitude', JSON.stringify(latitude));
        storage.set('longitude', JSON.stringify(longitude));
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
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
          <S.CategoryText numberOfLines={1} ellipsizeMode="tail">{item.local}</S.CategoryText>
        </S.CardTextContainer>
      </S.Card>
      </TouchableOpacity>
    ),
    []
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
