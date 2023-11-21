import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { CaretLeft } from 'phosphor-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  ScrollView,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import styled from 'styled-components/native';
import { storageLocal } from '../../../App';
import theme from '../../theme';

const Screen = styled.View`
  flex: 1;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-right: 20px;
`;

const Touchable = styled.TouchableOpacity``;

const ChatTitle = styled.Text`
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  padding: 10px;
  color: ${(props) => props.theme.colors.text};
`;

const SendButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: #6091f7;
  padding: 0px 25px;
  border-radius: 12px;
`;

const TextSendButton = styled.Text`
  color: white;
`;

const TituloAnuncio = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: ${(props) => props.theme.colors.text};
`;

const DeliveredTextContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const DeliveredText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
`;

const ChatInputContainer = styled.View`
  flex-direction: row;
  padding: 10px;
`;

const TextInputStyled = styled.TextInput`
  flex: 1;
  border-color: gray;
  border-width: 1px;
  margin-right: 10px;
  border-radius: 5px;
  padding: 10px;
  color: ${(props) => props.theme.colors.text};
  text-align: center;
`;

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  minhaMensagem: {
    backgroundColor: '#dcf8c6',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    maxWidth: '70%',
    alignSelf: 'flex-end',
  },
  outraMensagem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    maxWidth: '70%',
    alignSelf: 'flex-start',
  },
  textInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 5,
    padding: 10,
    color: theme.colors.text,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  chatTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
    color: theme.colors.text,
  },
  tituloAnuncio: {
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.colors.text,
  },
  status: {
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    color: 'white',
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
  messageDate: {
    fontSize: 10,
    color: 'gray',
    alignSelf: 'flex-end',
    marginHorizontal: 5,
  },
});

interface Message {
  text: string;
  myText: boolean;
  date: Date;
}

export interface ISolicitation {
  id: string;
  donationId: string;
  donatorId: string;
  receiverId: string;
  accepted: boolean;
  rejected: boolean;
  delivered: boolean;
}

interface IChat {
  date: Date;
  solicitationId: string;
  uid: string;
  value: string;
}

interface IParamsSolicitation {
  id: string;
}

// Componente Chat
const Solicitation = ({ route }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [status, setStatus] = useState('pendente');
  const [delivered, setDelivered] = useState(false);
  const [solicitation, setSolicitation] = useState<ISolicitation>();
  const [donation, setDonation] = useState<IDonation>();

  const scrollViewRef = useRef<ScrollView>(null);

  const navigation = useNavigation();

  const { id }: IParamsSolicitation = route.params;

  useEffect(() => {
    async function getSolicitation() {
      const soliDoc = await firestore()
        .collection('solicitations')
        .doc(id)
        .get();

      const soli = soliDoc.data()! as ISolicitation;
      soli.id = soliDoc.id;

      setInitialValues(soli);

      setSolicitation(soli);
    }

    getSolicitation();
  }, [id]);

  const setInitialValues = (soli: ISolicitation) => {
    setDelivered(soli.delivered);

    setStatus(getStatus(soli));
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages.length]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesSnapshot = await firestore()
        .collection('chats')
        .where('solicitationId', '==', solicitation?.id ?? '')
        .orderBy('date')
        .get();

      if (!messagesSnapshot) {
        return;
      }

      const fetchedMessages = messagesSnapshot.docs.map((doc) => {
        const firebaseData = doc.data();
        const myText = firebaseData.uid === storageLocal.getString('uid');
        return {
          text: firebaseData.value,
          myText,
          date: firebaseData.date.toDate(), // Convertendo o timestamp do Firebase para um objeto Date
        };
      });

      setMessages(fetchedMessages);
    };

    // Buscar mensagens na montagem do componente
    fetchMessages();

    // Configurando o intervalo para buscar novas mensagens
    const interval = setInterval(() => {
      fetchMessages();
    }, 3000);

    // Configurando o listener do Firebase
    const unsubscribe = firestore()
      .collection('chats')
      .where('solicitationId', '==', solicitation?.id ?? '')
      .orderBy('date')
      .onSnapshot((snapshot) => {
        if (!snapshot) {
          return;
        }

        const updatedMessages = snapshot.docs.map((doc) => {
          const firebaseData = doc.data();
          return {
            text: firebaseData.value,
            myText: firebaseData.uid === storageLocal.getString('uid'),
            date: firebaseData.date.toDate(),
          };
        });
        setMessages(updatedMessages);
      });

    // Limpando o intervalo e o listener quando o componente for desmontado
    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, [solicitation]);

  useEffect(() => {
    async function getDonation() {
      if (!solicitation) {
        return;
      }

      const donation = await firestore()
        .collection('donations')
        .doc(solicitation.donationId)
        .get();

      setDonation(donation.data() as IDonation);
    }

    getDonation();
  }, [solicitation]);

  const goBack = () => {
    navigation.goBack();
  };

  const sendMessage = () => {
    if (text && solicitation) {
      const message: IChat = {
        date: new Date(),
        solicitationId: solicitation.id,
        uid: storageLocal.getString('uid')!,
        value: text,
      };

      firestore().collection('chats').add(message);

      setMessages([...messages, { text, myText: true, date: new Date() }]);
      setText('');
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
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

  const getStatus = (solicitation: ISolicitation) => {
    if (!solicitation) {
      return '';
    }

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

  const aceitarSolicitacao = (solicitation: ISolicitation) => {
    solicitation.accepted = true;
    solicitation.rejected = false;

    setSolicitation(solicitation);
    setStatus(getStatus(solicitation));

    firestore().collection('solicitations').doc(solicitation.id).update({
      accepted: true,
      rejected: false,
    });
  };

  const cancelarSolicitacao = (solicitation: ISolicitation) => {
    solicitation.accepted = false;
    solicitation.rejected = true;

    setSolicitation(solicitation);
    setStatus(getStatus(solicitation));

    firestore()
      .collection('solicitations')
      .doc(solicitation.id)
      .update({
        accepted: false,
        rejected: true,
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  const entregarSolicitacao = (solicitation: ISolicitation) => {
    solicitation.delivered = true;

    setDelivered(true);
    setSolicitation(solicitation);
    setStatus(getStatus(solicitation));

    firestore().collection('solicitations').doc(solicitation.id).update({
      delivered: true,
    });
  };

  return (
    <Screen>
      <Header>
        <Touchable
          onPress={() => {
            goBack();
          }}
        >
          <CaretLeft color="gray" weight="bold" size={32} />
        </Touchable>

        <Image source={{ uri: donation?.imageUrl }} style={styles.itemImage} />
        <TituloAnuncio>{donation?.itemName}</TituloAnuncio>
        <TituloAnuncio>{getStatus(solicitation).toUpperCase()}</TituloAnuncio>
      </Header>

      {!!solicitation && (
        <View>
          {solicitation.donatorId == storageLocal.getString('uid') &&
            !solicitation.accepted &&
            !delivered && (
              <Button
                title="Aceitar solicitação"
                onPress={() => {
                  aceitarSolicitacao(solicitation);
                }}
                color="green"
              />
            )}

          {solicitation.donatorId == storageLocal.getString('uid') &&
            solicitation.accepted &&
            !delivered && (
              <Button
                title="Marcar como entregue"
                onPress={() => {
                  entregarSolicitacao(solicitation);
                }}
                color="blue"
              />
            )}

          {solicitation.donatorId == storageLocal.getString('uid') &&
            solicitation.accepted &&
            !delivered && (
              <Button
                title="Cancelar doação"
                onPress={() => {
                  cancelarSolicitacao(solicitation);
                }}
                color="red"
              />
            )}
        </View>
      )}

      {delivered && (
        <DeliveredTextContainer>
          <DeliveredText>
            Obrigado por realizar essa doação! Você está ajudando o mundo a se
            tornar um lugar melhor.
          </DeliveredText>
        </DeliveredTextContainer>
      )}

      {status === 'pendente' &&
        donation?.donatorId !== storageLocal.getString('uid') && (
          <Text style={styles.chatTitle}>
            Sua doação ainda não foi aceita pelo doador. Converse com ele no
            chat abaixo.
          </Text>
        )}

      {status === 'pendente' &&
        donation?.donatorId === storageLocal.getString('uid') && (
          <Text style={styles.chatTitle}>
            Entre em contato com o solicitante pelo chat para combinar a doação.
          </Text>
        )}

      {status === 'recusada' && (
        <Text style={styles.chatTitle}>
          {
            'Infelizmente sua solicitação de doação não foi aceita pelo doador :('
          }
        </Text>
      )}

      {status === 'aceita' && (
        <Text style={styles.chatTitle}>
          {
            'Obaaa! Sua solicitação foi aceita. Agora combine a entrega com o doador! :D'
          }
        </Text>
      )}

      {!delivered && (
        <View style={styles.chatContainer}>
          <ChatTitle>C H A T</ChatTitle>
          <ScrollView style={styles.chatContainer} ref={scrollViewRef}>
            {messages.map((msg, index) => (
              <View
                key={index}
                style={msg.myText ? styles.minhaMensagem : styles.outraMensagem}
              >
                <Text style={{ color: theme.colors.text }}>{msg.text}</Text>
                <Text style={styles.messageDate}>
                  {msg.date.toLocaleDateString('pt-BR')}{' '}
                  {msg.date.toLocaleTimeString('pt-BR')}
                </Text>
              </View>
            ))}
          </ScrollView>
          <ChatInputContainer>
            <TextInputStyled
              value={text}
              onChangeText={setText}
              placeholder="Digite uma mensagem"
              placeholderTextColor={theme.colors.secondary}
            />
            <SendButton onPress={sendMessage}>
              <TextSendButton>Enviar</TextSendButton>
            </SendButton>
          </ChatInputContainer>
        </View>
      )}
    </Screen>
  );
};

export default Solicitation;
