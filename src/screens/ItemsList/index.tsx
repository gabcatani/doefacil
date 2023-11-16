import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { MMKV } from 'react-native-mmkv';
import styled from 'styled-components/native';
interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface IDonation {
  id: string;
  itemName: string;
  itemCategory: string;
  local: string;
  address: {
    lat: number;
    lng: number;
  };
  description: string;
  image: string;
  usageTime: string;
}

const ItemsList = () => {
  const [donations, setDonations] = useState<IDonation[] | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);

  const isFocused = useIsFocused();

  const storage = new MMKV();
  const navigation = useNavigation<any>();

  const handleToggle = () => {
    setShowMap((prevState) => !prevState);
  };
  
  const calcularDistancia = (item: IDonation) => {
    
    if (!currentRegion || !item.address) {
      return 0;
    }

    const rad = (x: number) => (x * Math.PI) / 180;
    const R = 6371e3;
    const dLat = rad(item.address.lat - currentRegion.latitude);
    const dLong = rad(item.address.lng - currentRegion.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(currentRegion.latitude)) * Math.cos(rad(item.address.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 

    return distance.toFixed(0);
  };

  const handleItemPress = useCallback(
    (item: IDonation) => {
      navigation.navigate('ItemDetails', { item });
    },
    [navigation],
  );

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
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const querySnapshot = await firestore().collection('donations').get();
        const donationsPromises = querySnapshot.docs.map(async (doc) => {
          const solicitations = await firestore()
            .collection('solicitations')
            .where('donationId', '==', doc.id)
            .where('accepted', '==', true)
            .get();

          if (solicitations.docs.length === 0) {
            return { ...doc.data(), id: doc.id };
          }
          return null;
        });

        const filteredDonations = (await Promise.all(donationsPromises)).filter(
          (doc) => doc !== null,
        ) as IDonation[];

        setDonations(filteredDonations);
      } catch (error) {
        console.error('Erro ao buscar doações: ', error);
      }
    };
    fetchDonations();
  }, [isFocused]);

  const renderItem = useCallback(
    ({ item, index }: { item: IDonation; index: number }) => (
      <TouchableOpacity
        onPress={() => {
          handleItemPress(item);
        }}
      >
        <Card key={index}>
          <ImagemContainer>
            <ItemImage source={{ uri: item.image }} />
          </ImagemContainer>
          <CardTextContainer>
            <NameText>{item.itemName}</NameText>
            <CategoryText numberOfLines={1} ellipsizeMode="tail">Está a {calcularDistancia(item)} metros de você</CategoryText>
          </CardTextContainer>
        </Card>
      </TouchableOpacity>
    ),
    [currentRegion],
  );

  const renderDonationMarker = (item: IDonation) => (
    <Marker
      key={item.id}
      coordinate={{ latitude: item.address.lat, longitude: item.address.lng }}
      anchor={{ x: 0.5, y: 1 }}
    >
      <View>
        <MarkerImage source={{ uri: item.image }} />
        <PinShaft />
      </View>
      <Callout>
        <CalloutTitle>{item.itemName}</CalloutTitle>
      </Callout>
    </Marker>
  );

  return (
    <Screen>
      <Header>
        <HeaderText>Doações Disponíveis</HeaderText>
      </Header>
      <ToggleButton onPress={handleToggle}>
        <ToggleText>Lista</ToggleText>
        <ToggleText>Mapa</ToggleText>
      </ToggleButton>
      {!showMap ? (
        donations ? (
          <FlatList
            data={donations}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <ActiveIndicatorContainer>
            <ActivityIndicator size="large" color="#0000ff" />
          </ActiveIndicatorContainer>
        )
      ) : (
        <MapContainer>
          <Map
            initialRegion={{
              latitude: currentRegion?.latitude ?? 0,
              longitude: currentRegion?.longitude ?? 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onMapReady={() => {
              setMapReady(true);
            }}
          >
            {mapReady && donations?.map(renderDonationMarker)}
          </Map>
        </MapContainer>
      )}
    </Screen>
  );
};

export default ItemsList;

const Screen = styled.View`
  flex: 1;
`;

const ActiveIndicatorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Header = styled.View`
  padding-top: 20px;
  margin-bottom: 10px;
  align-items: center;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const Card = styled.View`
  flex-direction: row;
  padding: 10px;
  margin: 10px;
  border-radius: 30px;
  background-color: white;
`;

const CardTextContainer = styled.View`
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
  margin-left: 10px;
`;

const ImagemContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const ItemImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 99px;
`;

const NameText = styled.Text`
  font-size: 24px;
  textalign: left;
`;

const CategoryText = styled.Text`
  font-size: 16px;
  textalign: left;
`;

const Toggle = styled.View`
  /* flex: 1; */
  flex-direction: row;
  justify-content: center;
`;

const ToggleButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
`;

const ToggleText = styled.Text`
  font-size: 16px;
  margin: 10px;
`;
const Map = styled(MapView)`
  flex: 1;
`;

const MarkerImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background-color: transparent;
  border: 2px solid white;
`;

const PinShaft = styled(View)`
  width: 0;
  height: 0;
  borderleftwidth: 10px;
  borderrightwidth: 10px;
  borderbottomwidth: 20px;
  backgroundcolor: transparent;
  borderleftcolor: transparent;
  borderrightcolor: transparent;
  borderbottomcolor: black;
  alignself: center;
  transform: rotate(180deg);
`;

const CalloutTitle = styled.Text`
  font-size: 16px;
`;

const MapContainer = styled.View`
  flex: 1;
  margin: 20px;
`;
