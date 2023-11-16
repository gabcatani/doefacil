import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { CaretLeft } from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import styled from 'styled-components/native';
import { storageLocal } from '../../../App';
import { useToast } from '../../hooks/ui/useToast';
import { TOASTTYPE } from '../../hooks/ui/useToast/types';

interface IParamsItem {
  item: IDonation;
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
  }, [item.donatorId, item.id]);

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
    latitude: item.address.lat,
    longitude: item.address.lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <Screen>
      <Header>
        <GoBackButton onPress={goBack}>
          <CaretLeft color="gray" weight="bold" size={32} />
        </GoBackButton>
        <HeaderText>{item.itemName}</HeaderText>
      </Header>
      {!showMap ? (
        <ImagemContainer>
          <ItemImage source={{ uri: item.image }} />
        </ImagemContainer>
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
                <MarkerImage source={{ uri: item.image }} />
                <Callout>
                  <CalloutTitle>{item.itemName}</CalloutTitle>
                </Callout>
              </Marker>
            )}
          </Map>
        </MapContainer>
      )}
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
          <BoldText>Endereço:</BoldText> {item.local}
        </NameText>
      </CardTextContainer>

      <ShowMapButton onPress={handleToggle}>
        <ShowMapText>
          {!showMap ? 'Ver localização no mapa' : 'Ver Imagem Do Item'}
        </ShowMapText>
      </ShowMapButton>

      {!solicitado ? (
        <RequestButton onPress={() => handleSolicitar(item)}>
          <RequestText>Solicitar doação</RequestText>
        </RequestButton>
      ) : (
        <RequestConfirmText>Doação solicitada</RequestConfirmText>
      )}

      {!isMyDonation && 
        <DeleteButton onPress={() => handleDelete(item)}>
          <DeleteText>
            Deletar anúncio
          </DeleteText>
        </DeleteButton>
      }
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
  margin-top: 25px;
`;

const ItemImage = styled.Image`
  width: 300px;
  height: 300px;
`;

const CardTextContainer = styled.View`
  background-color: #d9cdcd;
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
`;

const BoldText = styled.Text`
  font-weight: bold;
`;

const NameText = styled.Text`
  font-size: 24px;
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

const MapContainer = styled.View`
  flex: 1;
  margin: 20px;
`;

const ShowMapButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ShowMapText = styled.Text`
  font-size: 24px;
  color: white;
  background-color: coral;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  width: 70%;
`;

const RequestButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const RequestText = styled.Text`
  font-size: 24px;
  color: white;
  background-color: coral;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  width: 70%;
`;

const RequestConfirmText = styled.Text`
  align-self: center;
  font-size: 24px;
  color: black;
  background-color: #e2e0df;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  width: 70%;
`;

const DeleteButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const DeleteText = styled.Text`
  font-size: 24px;
  color: white;
  background-color: #ff6a50;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  width: 70%;
`;

const DeleteConfirmText = styled.Text`
  align-self: center;
  font-size: 24px;
  color: black;
  background-color: #e2e0df;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  width: 70%;
`;