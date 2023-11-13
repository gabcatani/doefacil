import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Mural = () => {
    const navigation = useNavigation();

    const fakePosts = [
        { 
            id: '1', 
            title: 'Ecologia Sem Fronteiras', 
            content: 'Nossa equipe de "Ecologia Sem Fronteiras" realizou a doação de 5 árvores para o Parque do Carmo. Estamos muito animados para ver essas árvores crescerem e proporcionarem um ambiente mais verde e saudável para todos.' 
        }
    ];
    
    

    return (
        <View style={[styles.container, { backgroundColor: '#E7F9E9' }]}>
             <View style={styles.titleContainer}>
                <Text style={styles.title}>Doações e Ações</Text>
            </View>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {fakePosts.map((post) => (
                    <View key={post.id} style={styles.postContainer}>
                        <Text style={styles.postTitle}>{post.title}</Text>
                        <Text style={styles.postContent}>{post.content}</Text>
                        <TouchableOpacity 
                            style={styles.viewPostButton} 
                            onPress={() => console.log('das')}
                        >
                            <Text style={styles.viewPostButtonText}>Ver postagem</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button
                    title="Adicionar Postagem"
                    onPress={() => console.log('das')}
                    color="blue"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 60
    },
    titleContainer: {
        paddingVertical: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },

    scrollView: {
        marginHorizontal: 10,
    },
    postContainer: {
        backgroundColor: '#E7F9E9',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    postContent: {
        fontSize: 14,
        marginBottom: 10,
    },
    viewPostButton: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
    },
    viewPostButtonText: {
        color: 'gray',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
});

export default Mural;
