import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import {
  CaretLeft,
  GlobeHemisphereWest,
  MapPin,
  SpinnerGap,
  UserList,
  Trash,
} from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
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

const ItemDetails = ({ route }: any) => {
  const { item }: IParamsItem = route.params;
  const [showMap, setShowMap] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [solicitado, setSolicitado] = useState(false);
  const [isMyDonation, setIsMyDonation] = useState(true);

  const navigation = useNavigation();

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
    <Screen>
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
        <MapContainer>
          <Map
            initialRegion={mapRegion}
            onMapReady={() => {
              setMapReady(true);
            }}
          >
            {mapReady && (
              <Marker coordinate={mapRegion}>
                <ImageContainer>
                  <MarkerImage source={{ uri: item.imageUrl }} />
                </ImageContainer>
                <Callout>
                  <CalloutTitle>{item.itemName}</CalloutTitle>
                </Callout>
              </Marker>
            )}
          </Map>
        </MapContainer>
      )}

      <ButtonContainerMap>
        <StyledButton onPress={handleToggle} backgroundColor="#4A748C">
          <ButtonText color="white">{!showMap ? 'Mapa' : 'Dados'}</ButtonText>
          {!showMap ? (
            <MapPin
              color="white"
              weight="bold"
              size={30}
              style={{ marginLeft: 10 }}
            />
          ) : (
            <UserList
              color="white"
              weight="bold"
              size={30}
              style={{ marginLeft: 10 }}
            />
          )}
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
                color="white"
                weight="bold"
                size={30}
                style={{ marginLeft: 10 }}
              />
            </StyledButton>
          ) : (
            <StyledButton backgroundColor="white">
              <ButtonText color="gray">Solicitado</ButtonText>
              <SpinnerGap
                color="gray"
                weight="bold"
                size={30}
                style={{ marginLeft: 10 }}
              />
            </StyledButton>
          ))}

        {isMyDonation && (
          <StyledButton
            onPress={async () => {
              await handleDelete(item);
            }}
            backgroundColor="#c13c3f"
          >
            <ButtonText>Excluir</ButtonText>
            <Trash
              color="white"
              weight="bold"
              size={32}
              style={{ marginLeft: 10 }}
            />
          </StyledButton>
        )}
      </ButtonContainerMap>
    </Screen>
  );
};

export default ItemDetails;

const Screen = styled.View`
  flex: 1;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
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
`;

const Map = styled(MapView)`
  flex: 1;
`;

const ImageContainer = styled.View``;

const MarkerImage = styled.Image`
  width: 100px;
  height: 100px;
`;

const CalloutTitle = styled.Text`
  font-size: 24px;
`;

// const ButtonContainer = styled.View`
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 20px;
// `;

const ButtonContainerMap = styled.View`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backgroundColor || '#49888bc8'};
  border-color: ${(props) => props.backgroundColor || '#49888bc8'};
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
`;

const ButtonText = styled.Text`
  font-size: 24px;
  color: ${(props) => props.color || 'white'};
`;
