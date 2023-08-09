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
        },
        { 
            id: '2', 
            title: 'Plantando para o Futuro', 
            content: 'Hoje foi um dia muito produtivo! Conseguimos plantar 10 novas mudas de Ipê em nossa reserva. É um pequeno passo, mas acreditamos que cada árvore faz a diferença para o futuro do nosso planeta.' 
        },
        { 
            id: '3', 
            title: 'Vamos Preservar', 
            content: 'Nossa equipe esteve hoje no Parque do Carmo realizando a coleta de lixo. Ficamos surpresos com a quantidade de resíduos que encontramos, mas estamos felizes por termos feito a nossa parte para manter o parque limpo. Lembre-se, cada ação conta quando se trata de preservar a natureza!' 
        },
        { 
            id: '4', 
            title: 'Natureza em Foco', 
            content: 'Foi um dia maravilhoso! Conseguimos fotografar a soltura de 20 tartarugas marinhas de volta ao oceano. É sempre emocionante ver essas criaturas retornando ao seu habitat natural. Continuaremos nossos esforços para proteger a vida selvagem.' 
        },
        { 
            id: '5', 
            title: 'Mar Limpo', 
            content: 'Este final de semana foi de muito trabalho. Realizamos a limpeza de 3km de praia, recolhendo todo o tipo de resíduos. A quantidade de plástico que encontramos é preocupante e nos lembra da importância de reduzir, reutilizar e reciclar sempre que possível.' 
        },
        { 
            id: '6', 
            title: 'Conscientização na Escola', 
            content: 'Fizemos uma palestra na Escola Municipal de Ensino Fundamental, ensinando aos alunos sobre a importância da conservação ambiental. As crianças estavam muito interessadas e acreditamos que essa é a melhor maneira de garantir um futuro mais sustentável.' 
        },
        { 
            id: '7', 
            title: 'Proteção aos Animais', 
            content: 'Resgatamos um grupo de macacos que estavam em uma área de desmatamento. Agora, eles estão seguros em nosso santuário e recebendo os cuidados necessários. Cada vida importa!' 
        },
        { 
            id: '8', 
            title: 'Energia Renovável', 
            content: 'Inauguramos um novo conjunto de painéis solares em nossa sede. Isso nos ajudará a reduzir nossa pegada de carbono e também economizar energia. Estamos orgulhosos de fazer a nossa parte para um futuro mais limpo e verde.' 
        },
        { 
            id: '9', 
            title: 'A Importância da Água', 
            content: 'Hoje realizamos uma oficina sobre conservação de água em nossa comunidade. Discutimos maneiras práticas de economizar água em nossas casas e jardins. Cada gota conta!' 
        },
        { 
            id: '10', 
            title: 'Reciclagem é Fundamental', 
            content: 'Nossa equipe coletou mais de 2 toneladas de material reciclável este mês. Estamos felizes em contribuir para a redução de resíduos e incentivar a reciclagem.' 
        },
        // Add more posts here if needed...
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
