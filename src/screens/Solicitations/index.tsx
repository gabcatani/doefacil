import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  type TextStyle,
} from 'react-native';
import styled from 'styled-components/native';
import { storageLocal } from '../../../App';
import theme from '../../theme';

interface ISolicitationItem {
  id: string;
  title: string;
  status: string;
  image: string;
}

const Solicitations = () => {
  const [donationRequests, setDonationRequests] = useState<ISolicitationItem[]>(
    [],
  );
  const [myDonations, setMyDonations] = useState<ISolicitationItem[]>([]);
  const [showMyDonations, setShowMyDonations] = useState<boolean>(true);
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const [activeOption, setActiveOption] = useState('doacoes');

  const handleItemPress = useCallback(
    (solicitationId: string) => {
      navigation.navigate('Solicitation', { id: solicitationId });
    },
    [navigation],
  );

  const getStatus = (solicitation: ISolicitation) => {
    if (solicitation.delivered) {
      return 'entregue';
    }

    if (!solicitation.rejected && !solicitation.accepted) {
      return 'pendente';
    }

    if (solicitation.rejected) {
      return 'recusada';
    }

    if (solicitation.accepted) {
      return 'aceita';
    }

    return '';
  };

  const getStatusStyle = (status: string): TextStyle => {
    switch (status.toLowerCase()) {
      case 'aceita':
        return styles.aceita;
      case 'entregue':
        return styles.aceita;
      case 'recusada':
        return styles.recusada;
      case 'pendente':
        return styles.pendente;
      default:
        return {};
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'aceita':
        return '#6DA2B8'; // Variação mais clara e vibrante
      case 'entregue':
        return '#3A5D72'; // Variação mais escura e saturada
      case 'recusada':
        return '#8F6D7A'; // Variação mais avermelhada
      case 'pendente':
        return '#748F9D'; // Variação mais desaturada/neutra
      default:
        return 'transparent'; // Transparente por padrão
    }
  };

  useEffect(() => {
    const userId = storageLocal.getString('uid');

    const solicitationsRef = firestore().collection('solicitations');
    const donationsRef = firestore().collection('donations');

    solicitationsRef
      .where('donatorId', '==', userId)
      .get()
      .then((querySnapshot) => {
        const promises = [];

        querySnapshot.forEach((solicitation) => {
          const solicitationData = solicitation.data() as ISolicitation;

          const promise = donationsRef
            .doc(solicitationData.donationId)
            .get()
            .then((donationDoc) => {
              if (donationDoc.exists) {
                const donation = donationDoc.data() as IDonation;
                return {
                  id: solicitation.id,
                  image: donation.imageUrl,
                  title: donation.itemName,
                  status: getStatus(solicitationData).toUpperCase(),
                };
              }
            });

          promises.push(promise);
        });

        Promise.all(promises).then((results) => {
          const newMyDonations = results.filter((item) => item != null);
          setMyDonations(newMyDonations);
        });
      });

    solicitationsRef
      .where('receiverId', '==', userId)
      .get()
      .then((querySnapshot) => {
        const promises = [];

        querySnapshot.forEach((solicitation) => {
          const solicitationData = solicitation.data() as ISolicitation;

          const promise = donationsRef
            .doc(solicitationData.donationId)
            .get()
            .then((donationDoc) => {
              if (donationDoc.exists) {
                const donation = donationDoc.data() as IDonation;
                return {
                  image: donation.imageUrl,
                  title: donation.itemName,
                  status: getStatus(solicitationData).toUpperCase(),
                  id: solicitation.id,
                };
              }
            });

          promises.push(promise);
        });

        Promise.all(promises).then((results) => {
          const newDonationRequests = results.filter((item) => item != null);
          setDonationRequests(newDonationRequests);
        });
      });
  }, [isFocused]);

  console.log('request', donationRequests);
  console.log('myDonations', myDonations);

  return (
    <Screen>
      <Header>
        <HeaderText>Doações e Solicitações</HeaderText>
      </Header>
      <ToggleContainer>
        <Option
          active={activeOption === 'doacoes'}
          onPress={() => {
            setActiveOption('doacoes');
            setShowMyDonations(true);
          }}
        >
          <OptionText active={activeOption === 'doacoes'}>Doações</OptionText>
        </Option>
        <Option
          active={activeOption === 'solicitacoes'}
          onPress={() => {
            setActiveOption('solicitacoes');
            setShowMyDonations(false);
          }}
        >
          <OptionText active={activeOption === 'solicitacoes'}>
            Solicitações
          </OptionText>
        </Option>
      </ToggleContainer>
      {showMyDonations && (
        <>
          {myDonations.length === 0 ? (
            <EmptyScreen>
              <StyledText>Você ainda não fez doações.</StyledText>
            </EmptyScreen>
          ) : (
            <>
              {myDonations.map((donation, index) => (
                <Item
                  key={index}
                  onPress={() => {
                    handleItemPress(donation.id);
                  }}
                >
                  <ItemImage source={{ uri: donation.image }} />
                  <ItemTextContainer>
                    <ItemTitle>{donation.title}</ItemTitle>
                    <ItemStatus active={getStatusColor(donation.status)}>
                      {donation.status}
                    </ItemStatus>
                  </ItemTextContainer>
                </Item>
              ))}
            </>
          )}
        </>
      )}
      {!showMyDonations && (
        <>
          {donationRequests.length === 0 ? (
            <EmptyScreen>
              <StyledText>Você ainda não fez doações.</StyledText>
            </EmptyScreen>
          ) : (
            <>
              {donationRequests.map((request, index) => (
                <Item
                  key={index}
                  onPress={() => {
                    handleItemPress(request.id);
                  }}
                >
                  <ItemImage source={{ uri: request.image }} />
                  <ItemTextContainer>
                    <ItemTitle>{request.title}</ItemTitle>
                    <ItemStatus active={getStatusColor(request.status)}>
                      {request.status}
                    </ItemStatus>
                  </ItemTextContainer>
                </Item>
              ))}
            </>
          )}
        </>
      )}
    </Screen>
  );
};

const Screen = styled.View`
  flex: 1;
`;

const EmptyScreen = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-size: 20px;
  text-align: center;
  text-align-vertical: center;
  color: ${(props) => props.theme.colors.text};
`;

const Header = styled.View`
  padding-top: 20px;
  margin-bottom: 10px;
  align-items: center;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
`;

const ToggleContainer = styled.View`
  flex-direction: row;
  margin: 15px 0px;
`;

const Option = styled.TouchableOpacity`
  flex: 1;
  margin: 0px 20px;
  padding: 10px 30px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => (props.active ? '#4D748F' : 'transparent')};
`;

const OptionText = styled.Text`
  color: ${(props) => (props.active ? '#fff' : '#000')};
  font-weight: bold;
`;

const Item = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #f0f0f0;
  padding: 10px;
  margin-vertical: 5px;
  align-items: center;
`;

const ItemImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
`;

const ItemTextContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const ItemTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
`;

const ItemStatus = styled.Text`
  font-size: 14px;
  color: white;
  padding: 5px;
  border-radius: 5px;
  position: absolute;
  right: 10px;
  background-color: ${(props) => (props.active ? props.active : 'transparent')};
`;

export default Solicitations;
