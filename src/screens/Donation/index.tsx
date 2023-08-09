import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

const DonationForm = () => {
  const [observations, setObservations] = useState('');
  const [weight, setWeight] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCagory] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');

  const handleFormSubmit = () => {
    // Lógica para enviar os dados ao servidor
    // Implemente aqui a lógica de envio dos dados do item de doação para o servidor
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulário de Doação</Text>
      <Text style={styles.subtitle}>Preencha os detalhes do item:</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholderTextColor='#808080'
          placeholder="Nome"
          value={cpf}
          onChangeText={text => setCPF(text)}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor='#808080'
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor='#808080'
          placeholder="Telefone"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor='#808080'
          placeholder="Data de Disponibilidade"
          value={dob}
          onChangeText={text => setDob(text)}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor='#808080'
          placeholder="Endereço"
          value={address}
          onChangeText={text => setAddress(text)}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor='#808080'
          placeholder="Categoria"
          value={category}
          onChangeText={text => setCagory(text)}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor='#808080'
          placeholder="Peso"
          value={weight}
          onChangeText={text => setWeight(text)}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor='#808080'
          placeholder="Largura"
          value={width}
          onChangeText={text => setWidth(text)}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor='#808080'
          placeholder="Altura"
          value={height}
          onChangeText={text => setHeight(text)}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor='#808080'
          placeholder="Informações adicionais"
          value={additionalInfo}
          onChangeText={text => setAdditionalInfo(text)}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor='#808080'
          placeholder="Observações"
          value={observations}
          onChangeText={text => setObservations(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
          <Text style={styles.buttonText}>Doar Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    marginTop: 70
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: 'black',
  },
  form: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    width: '90%',
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 16, // Aumenta a altura dos inputs
    borderRadius: 8,
    backgroundColor: 'white',
    color: 'black',
  },
  button: {
    backgroundColor: '#B2DFB2',
    borderRadius: 8,
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
  },
});



export default DonationForm;
