import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreensTypes}  from '../../navigation/types';

const TermsOfUse = () => {
    const navigation = useNavigation<any>()

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Termos de Uso</Text>

        <Text style={styles.subtitle}>Seção 1: Introdução</Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur urna non mauris
          auctor, ac rhoncus libero volutpat. Nulla facilisi. Mauris non leo eu felis congue
          dapibus.
        </Text>

        <Text style={styles.subtitle}>Seção 2: Responsabilidades</Text>
        <Text style={styles.paragraph}>
          Vestibulum sed tellus in nisi lacinia ultrices. Aliquam tincidunt urna sed tristique
          lacinia. Sed auctor, erat non tincidunt hendrerit, lectus lacus convallis nunc, ut tempus
          enim odio sed ipsum.
        </Text>

        {/* Adicione mais conteúdo aqui, conforme necessário */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
           <Text>
             Aceito
            </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default TermsOfUse
