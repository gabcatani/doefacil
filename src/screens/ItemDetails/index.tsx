import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { CaretLeft, GlobeHemisphereWest } from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import styled from 'styled-components/native';
import { storageLocal } from '../../../App';
import { useToast } from '../../hooks/ui/useToast';
import { TOASTTYPE } from '../../hooks/ui/useToast/types';

interface IParamsItem {
  item: IDonation;
}
interface IDonation {
  addresss: {
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

const screenDimensions = Dimensions.get('window');

const ItemDetails = ({ route }: any) => {
  const { item }: IParamsItem = route.params;
  const [showMap, setShowMap] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [solicitado, setSolicitado] = useState(false);
  const [isMyDonation, setIsMyDonation] = useState(true);

  const navigation = useNavigation();
  const screenDimensions = Dimensions.get('window');

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setIsMyDonation(item.donatorId == storageLocal.getString('uid'));

    async function fetchData() {
      const solicitacaoFeita = await firestore()
        .collection('solicitations')
        .where('donationId', '==', item.id)
        .where('receiverId', '==', storageLocal.getString('uid'))
        .get();

      if (solicitacaoFeita.docs?.length) {
        setSolicitado(true);
      }
    }

    fetchData();
  }, [item.donatorId]);

  const handleDelete = async (item: IDonation) => {
    firestore().collection('donations').doc(item.id).delete();

    useToast({
      message: 'Anúncio removido com sucesso!',
      type: TOASTTYPE.SUCCESS,
    });

    navigation.navigate('Maps');
  };

  const handleSolicitar = async (item: IDonation) => {
    const solicitacao = {
      donationId: item.id,
      donatorId: item.donatorId,
      receiverId: storageLocal.getString('uid'),
      accepted: false,
      rejected: false,
      delivered: false,
    };

    try {
      await firestore().collection('solicitations').add(solicitacao);
      setSolicitado(true);
      useToast({ message: 'Solicitação realizada', type: TOASTTYPE.SUCCESS });
    } catch (error) {
      console.error('Erro ao adicionar doação:', error);
      useToast({ message: 'Tente Novamente', type: TOASTTYPE.ERROR });
    }
  };

  const handleToggle = () => {
    setShowMap((prevState) => !prevState);
  };

  const mapRegion = {
    latitude: item.coordinates.lat,
    longitude: item.coordinates.lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const fullAddress =
    item.addresss.street +
    ' - ' +
    item.addresss.number +
    ' - ' +
    item.addresss.bairro +
    ' - ' +
    item.addresss.city;

  return (
    <Screen showsVerticalScrollIndicator={false}>
      <Header>
        <GoBackButton onPress={goBack}>
          <CaretLeft color="gray" weight="bold" size={32} />
        </GoBackButton>
        <HeaderText>{item.itemName}</HeaderText>
      </Header>
      {!showMap ? (
        <>
          <ImagemContainer>
            <ItemImage source={{ uri: item.imageUrl }} />
          </ImagemContainer>
          <CardTextContainer>
            <NameText>
              <BoldText>Descrição:</BoldText> {item.description}
            </NameText>
            <NameText>
              <BoldText>Categoria:</BoldText> {item.itemCategory}
            </NameText>
            <NameText>
              <BoldText>Tempo de uso:</BoldText> {item.usageTime}
            </NameText>
            <NameText>
              <BoldText>Endereço:</BoldText> {fullAddress}
            </NameText>
          </CardTextContainer>
        </>
      ) : (
        <MapContainer screenDimensions={screenDimensions}>
          <Map
            initialRegion={mapRegion}
            onMapReady={() => {
              setMapReady(true);
            }}
          >
            {mapReady && (
              <Marker coordinate={mapRegion}>
                <MarkerImage source={{ uri: item.imageUrl }} />
                <Callout>
                  <CalloutTitle>{item.itemName}</CalloutTitle>
                </Callout>
              </Marker>
            )}
          </Map>
        </MapContainer>
      )}
      <ButtonContainer>
        <StyledButton onPress={handleToggle} backgroundColor="orange">
          <ButtonText color="white">{!showMap ? 'Mapa' : 'Item'}</ButtonText>
          <GlobeHemisphereWest
            color="gray"
            weight="bold"
            size={32}
            style={{ marginLeft: 10 }}
          />
        </StyledButton>
        {!isMyDonation &&
          (!solicitado ? (
            <StyledButton
              onPress={async () => {
                await handleSolicitar(item);
              }}
              backgroundColor="green"
            >
              <ButtonText color="white">Solicitar</ButtonText>
              <GlobeHemisphereWest
                color="gray"
                weight="bold"
                size={32}
                style={{ marginLeft: 10 }}
              />
            </StyledButton>
          ) : (
            <StyledButton backgroundColor="white">
              <ButtonText color="gray">Solicitada</ButtonText>
              <GlobeHemisphereWest
                color="gray"
                weight="bold"
                size={32}
                style={{ marginLeft: 10 }}
              />
            </StyledButton>
          ))}
        {isMyDonation && (
          <StyledButton
            onPress={async () => {
              await handleDelete(item);
            }}
          >
            <ButtonText color="white">Deletar anúncio</ButtonText>
            <GlobeHemisphereWest
              color="gray"
              weight="bold"
              size={32}
              style={{ marginLeft: 10 }}
            />
          </StyledButton>
        )}
      </ButtonContainer>
    </Screen>
  );
};

export default ItemDetails;

const Screen = styled.ScrollView`
  flex: 1;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const GoBackButton = styled.TouchableOpacity`
  position: absolute;
  left: 2%;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const ImagemContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin: 25px;
  border-radius: 20px;
`;

const ItemImage = styled.Image`
  width: 300px;
  height: 300px;
  border-radius: 20px;
`;

const CardTextContainer = styled.View`
  background-color: #e0e0e0;
  border-radius: 20px;
  padding: 20px;
  margin: 20px;
`;

const BoldText = styled.Text`
  font-weight: bold;
`;

const NameText = styled.Text`
  font-size: 24px;
`;

const MapContainer = styled.View`
  flex: 1;
  height: ${(props) => props.screenDimensions.height - 160 || '1px'};
  width: ${(props) => props.screenDimensions.width - 10 || '1px'};
  margin: 20px;
`;

const Map = styled(MapView)`
  flex: 1;
`;

const MarkerImage = styled.Image`
  width: 50px;
  height: 50px;
`;

const CalloutTitle = styled.Text`
  font-size: 16px;
`;

const ButtonContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backgroundColor || 'red'};
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
`;

const ButtonText = styled.Text`
  font-size: 24px;
  color: ${(props) => props.color || 'black'};
  text-align: center;
`;
