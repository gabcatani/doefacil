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
        <HeaderText>Doações e solicitações</HeaderText>
      </Header>
      <ToggleContainer>
        <Option
          active={activeOption === 'doacoes'}
          onPress={() => {
            setActiveOption('doacoes');
            setShowMyDonations(true)
          }}
        >
          <OptionText active={activeOption === 'doacoes'}>Minhas doações</OptionText>
        </Option>
        <Option
          active={activeOption === 'solicitacoes'}
          onPress={() => {
            setActiveOption('solicitacoes');
            setShowMyDonations(false)
          }}
        >
          <OptionText active={activeOption === 'solicitacoes'}>Minhas solicitações</OptionText>
        </Option>
      </ToggleContainer>
      {showMyDonations && (
        <Section>
          {myDonations.map((donation, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => {
                handleItemPress(donation.id);
              }}
            >
              <Image
                source={{ uri: donation.image }}
                style={styles.itemImage}
              />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemTitle}>{donation.title}</Text>
                <Text
                  style={[styles.itemStatus, getStatusStyle(donation.status)]}
                >
                  {donation.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Section>
      )}
      {!showMyDonations && (
        <Section>
          {donationRequests.map((request, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => {
                handleItemPress(request.id);
              }}
            >
              <Image source={{ uri: request.image }} style={styles.itemImage} />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemTitle}>{request.title}</Text>
                <Text
                  style={[styles.itemStatus, getStatusStyle(request.status)]}
                >
                  {request.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Section>
      )}
      {donationRequests.length === 0 && myDonations.length === 0 && (
        <EmptyScreen>
          <StyledText>Você ainda não fez ou recebeu doações.</StyledText>
        </EmptyScreen>
      )}
    </Screen>
  );
};

const Screen = styled.View`
  flex: 1;
`;

const Section = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: '#ccc';
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
`;

const ToggleButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
`;

const ToggleText = styled.Text`
  font-size: 16px;
  margin: 10px;
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
    props.active ? '#4A8C79' : 'transparent'};
`;

const OptionText = styled.Text`
  color: ${(props) =>
    props.active ? '#fff' : '#000'};
  font-weight: bold;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noDonations: {
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  itemTextContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemStatus: {
    fontSize: 14,
    color: 'white',
    padding: 5,
    borderRadius: 5,
    position: 'absolute',
    right: 10,
  },
  aceita: {
    backgroundColor: 'green',
  },
  recusada: {
    backgroundColor: 'red',
  },
  pendente: {
    backgroundColor: 'blue',
  },
});

export default Solicitations;
