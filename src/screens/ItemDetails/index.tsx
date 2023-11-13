import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import * as S from './styles';
import { CaretLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { IParamsItem } from './types'
import MapView, { Marker, Callout} from 'react-native-maps';


const ItemDetails =  ({ route }) => {
  
  const { item }: IParamsItem = route.params;
  const [showMap, setShowMap] = useState(false)

  const navigation = useNavigation()

  const goBack = () => {
    navigation.goBack();
  };

  const handleToggle = () => {
    setShowMap(prevState => !prevState);
  };

  const mapRegion = {
    latitude: item.address.lat,
    longitude: item.address.lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  console.log('MPRegion', mapRegion)

  return (
    <S.Screen>
      <S.Header>
        <S.GoBackButton onPress={() => goBack()} >
          <CaretLeft color="gray" weight="bold" size={32}/>
        </S.GoBackButton>
        <S.HeaderText>Detalhes do Item</S.HeaderText>
      </S.Header>
      {!showMap ? (
        <S.ImagemContainer>
          <S.ItemImage source={{ uri: item.image }} />
        </S.ImagemContainer>
      ) :
      <S.MapContainer>
        <S.Map initialRegion={mapRegion}>
          {/* <Marker coordinate={mapRegion}> */}
            <S.MarkerImage
              source={{ uri: item.image }}
              />
            <Callout>
              <S.CalloutTitle>{item.itemName}</S.CalloutTitle>
            </Callout>
          {/* </Marker>  */}
        </S.Map> 
      </S.MapContainer>
       }
        <S.CardTextContainer>
          <S.NameText>
            {item.itemName}
          </S.NameText>
          <S.NameText>
            {item.description}
          </S.NameText>
          <S.NameText>
            {item.itemCategory}
          </S.NameText>
          <S.NameText>
            {item.usageTime}
          </S.NameText>
          <S.NameText>
            {item.local}
          </S.NameText>
          <S.ShowMapButton onPress={handleToggle}>
            <S.NameText>
              Ver localização no mapa
            </S.NameText>
          </S.ShowMapButton>
        </S.CardTextContainer>
    </S.Screen>
  );
};

export default ItemDetails;
