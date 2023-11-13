import React, { useState } from 'react';
import * as S from './styles';
import { CaretLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { IParamsItem } from './types'
import { Marker, Callout } from 'react-native-maps';


const ItemDetails = ({ route }) => {

  const { item }: IParamsItem = route.params;
  const [showMap, setShowMap] = useState(false)
  const [mapReady, setMapReady] = useState(false)

  const navigation = useNavigation()

  const goBack = () => {
    navigation.goBack();
  };

  const handleSolicitar = () => {
    
  }

  const handleToggle = () => {
    setShowMap(prevState => !prevState);
  };

  const mapRegion = {
    latitude: item.address.lat,
    longitude: item.address.lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <S.Screen>
      <S.Header>
        <S.GoBackButton onPress={() => goBack()} >
          <CaretLeft color="gray" weight="bold" size={32} />
        </S.GoBackButton>
        <S.HeaderText>{item.itemName}</S.HeaderText>
      </S.Header>
      {!showMap ? (
        <S.ImagemContainer>
          <S.ItemImage source={{ uri: item.image }} />
        </S.ImagemContainer>
      ) :
        <S.MapContainer>
          <S.Map initialRegion={mapRegion} onMapReady={() => setMapReady(true)}>
            {mapReady &&
              <Marker coordinate={mapRegion}>
                {/* <S.MarkerImage
              source={{ uri: item.image }}
              /> */}
                <Callout>
                  <S.CalloutTitle>{item.itemName}</S.CalloutTitle>
                </Callout>
              </Marker>
            }
          </S.Map>
        </S.MapContainer>
      }
      <S.CardTextContainer>
        <S.NameText>
          <S.BoldText>Descrição:</S.BoldText> {item.description}
        </S.NameText>
        <S.NameText>
          <S.BoldText>Categoria:</S.BoldText> {item.itemCategory}
        </S.NameText>
        <S.NameText>
          <S.BoldText>Tempo de uso:</S.BoldText> {item.usageTime}
        </S.NameText>
        <S.NameText>
          <S.BoldText>Endereço:</S.BoldText> {item.local}
        </S.NameText>
        <S.ShowMapButton onPress={handleToggle}>
          <S.NameText>
            Ver localização no mapa
          </S.NameText>
        </S.ShowMapButton>
        <S.ButtonSolicitar title="Solicitar" onPress={handleSolicitar()} />
      </S.CardTextContainer>
    </S.Screen>
  );
};

export default ItemDetails;
