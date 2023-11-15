import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, StyleSheet } from 'react-native';
import * as S from './styles';
import { CaretLeft } from 'phosphor-react-native';
import firestore from '@react-native-firebase/firestore';
import { IDonation } from '../ItemMap/types';
import { storageLocal } from '../../../App';

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
        padding: 10,
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
    },
    tituloAnuncio: {
        fontWeight: 'bold',
        fontSize: 18,
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

type Message = {
    text: string,
    myText: boolean,
    date: Date
}

export type ISolicitation = {
    id: string,
    donationId: string,
    donatorId: string,
    receiverId: string,
    accepted: boolean,
    rejected: boolean,
    delivered: boolean
}

type IChat = {
    date: Date,
    solicitationId: string,
    uid: string,
    value: string
}

type IParamsSolicitation = {
    id: string
}

// Componente Chat
const Solicitation = ({ route }) => {
    const [messages, setMessages] = useState<Array<Message>>([]);
    const [text, setText] = useState('');
    const [status, setStatus] = useState('pendente');
    const [delivered, setDelivered] = useState(false);
    const [solicitation, setSolicitation] = useState<ISolicitation>();

    const scrollViewRef = useRef<ScrollView>(null);

    const [donation, setDonation] = useState<IDonation>();

    const navigation = useNavigation()

    console.log('param:;:::    ', route.params);

    const { id }: IParamsSolicitation = route.params;

    useEffect(() => {        

        async function getSolicitation() {
            const soli = await firestore().collection('solicitations').doc(id).get();

            setSolicitation(soli.data() as ISolicitation);
        }

        getSolicitation()
    }, [])

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages.length]);

    useEffect(() => {
        const fetchMessages = async () => {
            const messagesSnapshot = await firestore()
                .collection('chats')
                .orderBy('date')
                .get();

            const fetchedMessages = messagesSnapshot.docs.map(doc => {
                const firebaseData = doc.data();
                const myText = firebaseData.uid === storageLocal.getString('uid');
                return {
                    text: firebaseData.value,
                    myText: myText,
                    date: firebaseData.date.toDate() // Convertendo o timestamp do Firebase para um objeto Date
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
            .orderBy('date')
            .onSnapshot(snapshot => {
                const updatedMessages = snapshot.docs.map(doc => {
                    const firebaseData = doc.data();
                    return {
                        text: firebaseData.value,
                        myText: firebaseData.uid === storageLocal.getString('uid'),
                        date: firebaseData.date.toDate()
                    };
                });
                setMessages(updatedMessages);
            });

        // Limpando o intervalo e o listener quando o componente for desmontado
        return () => {
            clearInterval(interval);
            unsubscribe();
        };
    }, []);

    useEffect(() => {

        async function getDonation() {

            console.log('SOLI', solicitation);

            const donation = await firestore()
                .collection('donations')
                .doc(solicitation!.donationId)
                .get();

            setDonation((donation.data() as IDonation))
        }

        getDonation()
    }, [solicitation])

    const goBack = () => {
        navigation.goBack();
    };

    const sendMessage = () => {
        if (text && solicitation) {

            const message: IChat = {
                date: new Date(),
                solicitationId: solicitation.id,
                uid: storageLocal.getString('uid')!,
                value: text
            }

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

        if (solicitation.delivered) {
            return 'entregue'
        }

        if (!solicitation.rejected && !solicitation.accepted) {
            return 'pendente'
        }

        if (solicitation.rejected) {
            return 'recusada'
        }

        if (solicitation.accepted) {
            return 'aceita'
        }

        return ''

    }

    const aceitarSolicitacao = (solicitation: ISolicitation) => {

        solicitation.accepted = true;
        solicitation.rejected = false;

        setSolicitation(solicitation)
        setStatus(getStatus(solicitation))

        firestore().collection('solicitations').doc(solicitation.id).update({
            accepted: true,
            rejected: false
        });
    }

    const cancelarSolicitacao = (solicitation: ISolicitation) => {

        solicitation.accepted = false;
        solicitation.rejected = true;

        setSolicitation(solicitation)
        setStatus(getStatus(solicitation))


        firestore().collection('solicitations').doc(solicitation.id).update({
            accepted: false,
            rejected: true
        });
    }

    const entregarSolicitacao = (solicitation: ISolicitation) => {

        solicitation.delivered = true;

        setDelivered(true)
        setSolicitation(solicitation)
        setStatus(getStatus(solicitation))

        firestore().collection('solicitations').doc(solicitation.id).update({
            delivered: true
        });
    }

    return (
        <View style={{ flex: 1 }}>
            <S.Header>
                <S.GoBackButton onPress={() => goBack()} >
                    <CaretLeft color="gray" weight="bold" size={32} />
                </S.GoBackButton>
            </S.Header>
            <View style={styles.header}>
                <Text style={styles.tituloAnuncio}>{donation?.itemName}</Text>
                <Text style={[styles.status, getStatusStyle(status)]}>
                    {getStatus(solicitation!).toUpperCase()}
                </Text>
            </View>

            {!!solicitation && (<View>

                {solicitation.donatorId == storageLocal.getString('uid') && !solicitation.accepted && !delivered && (
                    <Button
                        title="Aceitar solicitação"
                        onPress={() => aceitarSolicitacao(solicitation!)}
                        color="green"
                    />)}

                {solicitation.donatorId == storageLocal.getString('uid') && solicitation.accepted && !delivered && (
                    <Button
                        title="Marcar como entregue"
                        onPress={() => entregarSolicitacao(solicitation!)}
                        color="blue"
                    />)}

                {solicitation.donatorId == storageLocal.getString('uid') && solicitation.accepted && !delivered && (
                    <Button
                        title="Cancelar doação"
                        onPress={() => cancelarSolicitacao(solicitation!)}
                        color="red"
                    />)}
            </View>)}

            {delivered && (
                <Text style={styles.chatTitle}>Obrigado por realizar essa doação! Você está ajudando o mundo a se tornar um lugar melhor :D</Text>
            )}

            {!delivered && (<View style={styles.chatContainer}>
                <Text style={styles.chatTitle}>Combine a entrega</Text>
                <ScrollView style={styles.chatContainer} ref={scrollViewRef}>
                    {messages.map((msg, index) => (
                        <View key={index} style={msg.myText ? styles.minhaMensagem : styles.outraMensagem}>
                            <Text>{msg.text}</Text>
                            <Text style={styles.messageDate}>
                                {msg.date.toLocaleDateString('pt-BR')} {msg.date.toLocaleTimeString('pt-BR')}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={text}
                        onChangeText={setText}
                        placeholder="Digite uma mensagem"
                    />
                    <Button title="Enviar" onPress={sendMessage} />
                </View>
            </View>)}
        </View>
    );
};

export default Solicitation;
