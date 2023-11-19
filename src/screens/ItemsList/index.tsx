import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Ruler, Cube } from 'phosphor-react-native';
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
  address: {
    bairro: string;
    city: string;
    number: string;
    street: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  donatorId: string;
  imageUrl: string;
  itemCategory: string;
  itemName: string;
  usageTime: string;
}

const ItemsList = () => {
  const [donations, setDonations] = useState<IDonation[] | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [activeOption, setActiveOption] = useState('list');
  const [mapReady, setMapReady] = useState(false);
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);

  const isFocused = useIsFocused();

  const storage = new MMKV();
  const navigation = useNavigation<any>();

  const calculateDistance = (item: IDonation) => {
    if (!currentRegion || !item.coordinates) return;

    const rad = (x: number) => (x * Math.PI) / 180;

    const R = 6371e3;
    const dLat = rad(item.coordinates.lat - currentRegion.latitude);
    const dLong = rad(item.coordinates.lng - currentRegion.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(currentRegion.latitude)) *
        Math.cos(rad(item.coordinates.lat)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    if (distance < 1000) {
      return distance.toFixed(0) + ' Metros';
    } else {
      const distanceKm = (distance / 1000).toFixed(1);
      return distanceKm + ' Km';
    }
  };

  const navigationToDetails = useCallback(
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

        const donationsDistance = filteredDonations.map((donation) => ({
          donation,
          distance: calculateDistance(donation),
        }));

        donationsDistance.sort((a, b) => a.distance - b.distance);

        setDonations(
          donationsDistance.map(
            (donationDistance) => donationDistance.donation,
          ),
        );
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
          navigationToDetails(item);
        }}
      >
        <Card key={index}>
          <ImagemContainer>
            <ItemImage source={{ uri: item.imageUrl }} />
          </ImagemContainer>
          <CardTextContainer>
            <NameText>
              <Cube color="gray" weight="bold" size={20} />
              {item.itemName}
            </NameText>

            <CategoryText numberOfLines={1} ellipsizeMode="tail">
              <Ruler color="gray" weight="bold" size={15} />
              {calculateDistance(item)}
            </CategoryText>
          </CardTextContainer>
        </Card>
      </TouchableOpacity>
    ),
    [currentRegion],
  );

  const renderDonationMarker = (item: IDonation) => (
    <Marker
      key={item.donatorId}
      coordinate={{
        latitude: item.coordinates.lat,
        longitude: item.coordinates.lng,
      }}
      anchor={{ x: 0.5, y: 1 }}
    >
      <View>
        <MarkerImage source={{ uri: item.imageUrl }} />
        <PinShaft />
      </View>
      <Callout
        onPress={() => {
          navigationToDetails(item);
        }}
      >
        <CalloutTitle>{item.itemName}</CalloutTitle>
      </Callout>
    </Marker>
  );

  return (
    <Screen>
      <Header>
        <HeaderText>Doações disponíveis</HeaderText>
      </Header>

      <ToggleContainer>
        <Option
          active={activeOption === 'list'}
          onPress={() => {
            setActiveOption('list');
            setShowMap(false);
          }}
        >
          <OptionText active={activeOption === 'list'}>Lista</OptionText>
        </Option>
        <Option
          active={activeOption === 'mapa'}
          onPress={() => {
            setActiveOption('mapa');
            setShowMap(true);
          }}
        >
          <OptionText active={activeOption === 'mapa'}>Mapa</OptionText>
        </Option>
      </ToggleContainer>

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
  color: ${props => props.theme.colors.text};
`;

const ToggleContainer = styled.View`
  flex-direction: row;
`;

const Option = styled.TouchableOpacity`
  flex: 1;
  margin: 0px 20px;
  padding: 10px 30px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${(props) =>
    props.active ? '#4A8C79' : 'transparent'}; /* Cor de fundo ativa ajustada */
`;

const OptionText = styled.Text`
  color: ${(props) =>
    props.active ? '#fff' : '#000'}; /* Cores do texto ajustadas */
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
  flexShrink: 1;
`;

const ImagemContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const ItemImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 20px;
`;

const NameText = styled.Text`
  font-size: 20px;
  text-align: left;
  color: ${props => props.theme.colors.text};
  maxWidth: 100%;
`;

const CategoryText = styled.Text`
  font-size: 16px;
  text-align: left;
  color: ${props => props.theme.colors.text};
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
  border-left-width: 10px;
  border-left-width: 10px;
  border-right-width: 10px;
  border-bottom-width: 20px;
  background-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: black;
  align-self: center;
  transform: rotate(180deg);
`;

const CalloutTitle = styled.Text`
  font-size: 16px;
`;

const MapContainer = styled.View`
  flex: 1;
  margin: 20px;
`;
