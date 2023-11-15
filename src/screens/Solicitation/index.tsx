import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, StyleSheet } from 'react-native';
import * as S from './styles';
import { CaretLeft } from 'phosphor-react-native';
import firestore from '@react-native-firebase/firestore';
import { IDonation } from '../ItemMap/types';
import { storageLocal } from '../../../App';

// Estilos
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
});

type Message = {
    text: string,
    myText: boolean,
    date: Date
}

type Solicitation = {
    id: string,
    donationId: string,
    donatorId: string,
    receiverId: string,
    accepted: boolean,
    rejected: boolean,
    delivered: boolean
}

// Componente Chat
const Solicitation = () => {
    const [messages, setMessages] = useState<Array<Message>>([]);
    const [text, setText] = useState('');
    const [status, setStatus] = useState('pendente');
    const [delivered, setDelivered] = useState(false);
    const [solicitation, setSolicitation] = useState<Solicitation>({
        id: 'ae6Yi4htQCu2xTVdBvLH',
        donationId: '7Tuek5aJ41xLXOkD68Hi',
        donatorId: 'OPGO44lRhXVzpNpqqwZBWcwaPoR2',
        receiverId: 'OPGO44lRhXVzpNpqqwZBWcwaPoR2',
        rejected: false,
        accepted: false,
        delivered: false
    });



    const [donation, setDonation] = useState<IDonation>();

    const navigation = useNavigation()

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
    }, [])

    const goBack = () => {
        navigation.goBack();
    };

    const sendMessage = () => {
        if (text) {

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

    const getStatus = (solicitation: Solicitation) => {

        console.log('SOLI 2', solicitation);

        if(solicitation.delivered){
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

    const aceitarSolicitacao = (solicitation: Solicitation) => {

        solicitation.accepted = true;

        setSolicitation(solicitation)
        setStatus(getStatus(solicitation))


        firestore().collection('solicitations').doc(solicitation.id).update({
            accepted: true
        });
    }

    const cancelarSolicitacao = (solicitation: Solicitation) => {

        solicitation.accepted = false;
        solicitation.rejected = true;

        setSolicitation(solicitation)
        setStatus(getStatus(solicitation))


        firestore().collection('solicitations').doc(solicitation.id).update({
            accepted: false,
            rejected: true
        });
    }

    const entregarSolicitacao = (solicitation: Solicitation) => {

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

            {delivered && (
                <Text style={styles.chatTitle}>Obrigado por realizar essa doação! Você está ajudando o mundo a se tornar um lugar melhor :D</Text>
            )}

            {!delivered && (<View  style={styles.chatContainer}>
                <Text style={styles.chatTitle}>Combine a entrega</Text>
                <ScrollView style={styles.chatContainer}>
                    {messages.map((msg, index) => (
                        <Text key={index} style={msg.myText ? styles.minhaMensagem : styles.outraMensagem}>
                            {msg.text}
                        </Text>
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
