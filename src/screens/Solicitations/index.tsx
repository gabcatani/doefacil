import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextStyle } from 'react-native';
import { storageLocal } from '../../../App';
import firestore from '@react-native-firebase/firestore';
import Solicitation, { ISolicitation } from '../Solicitation';
import { IDonation } from '../ItemMap/types';
import { useIsFocused, useNavigation } from '@react-navigation/native';

type ISolicitationItem = {
    id: string,
    title: string,
    status: string,
    image: string
}

const Solicitations = () => {
    const [donationRequests, setDonationRequests] = useState<ISolicitationItem[]>([]);
    const [myDonations, setMyDonations] = useState<ISolicitationItem[]>([]);

    const navigation = useNavigation<any>()

    const isFocused = useIsFocused();

    const handleItemPress = useCallback((solicitationId: string) => {

        navigation.navigate('Solicitation', { id: solicitationId });
      }, [navigation]);

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
        console.log('USE EFFECT');
        const userId = storageLocal.getString('uid');
    
        const solicitationsRef = firestore().collection('solicitations');
        const donationsRef = firestore().collection('donations');
    
        let newMyDonations: ISolicitationItem[] = [];
        let newDonationRequests: ISolicitationItem[] = [];
    
        solicitationsRef.where('donatorId', '==', userId).get().then((querySnapshot) => {
            querySnapshot.forEach((solicitation) => {

                console.log('SOLIC', solicitation.data());
                

                const solicitationData = solicitation.data() as ISolicitation;
                donationsRef.doc(solicitationData.donationId).get().then((donationDoc) => {
                    if (donationDoc.exists) {
                        const donation = donationDoc.data() as IDonation;
                        const solicitationItem: ISolicitationItem = {
                            id: solicitation.id,
                            image: donation.image,
                            title: donation.itemName,
                            status: getStatus(solicitationData).toUpperCase()
                        }
                        newMyDonations.push(solicitationItem);
                        setMyDonations(newMyDonations); // Atualiza o estado aqui
                    }
                });
            });
        });
    
        solicitationsRef.where('receiverId', '==', userId).get().then((querySnapshot) => {
            querySnapshot.forEach((solicitation) => {
                const solicitationData = solicitation.data() as ISolicitation;
                donationsRef.doc(solicitationData.donationId).get().then((donationDoc) => {
                    if (donationDoc.exists) {
                        const donation = donationDoc.data() as IDonation;
                        const solicitationItem: ISolicitationItem = {
                            image: donation.image,
                            title: donation.itemName,
                            status: getStatus(solicitationData).toUpperCase(),
                            id: solicitation.id
                        }
                        newDonationRequests.push(solicitationItem);
                        setDonationRequests(newDonationRequests); // Atualiza o estado aqui
                    }
                });
            });
        });
    }, [isFocused]);

    return (
        <ScrollView style={styles.container}>
            {!!myDonations.length && (<View style={styles.section}>
                <Text style={styles.sectionTitle}>Minhas doações</Text>
                {myDonations.map((donation, index) => (
                    <TouchableOpacity key={index} style={styles.item} onPress={()=> handleItemPress(donation.id)}> 
                        <Image source={{ uri: donation.image }} style={styles.itemImage}  />
                        <View style={styles.itemTextContainer}>
                            <Text style={styles.itemTitle}>{donation.title}</Text>
                            <Text style={[styles.itemStatus, getStatusStyle(donation.status)]}>
                                {donation.status}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>)}
            {!!donationRequests.length && (<View style={styles.section}>
                <Text style={styles.sectionTitle}>Minhas solicitações</Text>
                {donationRequests.map((request, index) => (
                    <TouchableOpacity key={index} style={styles.item} onPress={()=> handleItemPress(request.id)}>
                        <Image source={{ uri: request.image }} style={styles.itemImage}  />
                        <View style={styles.itemTextContainer}>
                            <Text style={styles.itemTitle}>{request.title}</Text>
                            <Text style={[styles.itemStatus, getStatusStyle(request.status)]}>
                                {request.status}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>)}
            {!donationRequests.length && !myDonations.length &&(<Text style={styles.noDonations}>Você ainda não fez ou recebeu doações.</Text>)}
        </ScrollView>
    );
};

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
        textAlign: 'center'
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    noDonations: {
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center'
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
