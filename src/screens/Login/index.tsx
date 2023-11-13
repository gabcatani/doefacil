import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as S from './styles'
import auth from '@react-native-firebase/auth';
import {useToast} from '../../hooks/ui/useToast'
import { TOASTTYPE } from '../../hooks/ui/useToast/types';
import { MMKV } from 'react-native-mmkv';
import { storageLocal } from '../../../App';

const LoginScreen = () => {
  const [signIn, setSignIn] = useState(true)
  const navigation = useNavigation<any>()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    auth().createUserWithEmailAndPassword(email, password).then((userCredentials) => {
    navigation.navigate('Auth')}).catch( error => { 
      if (error.code === 'auth/email-already-in-use'){
        useToast({message: "Email já utilizado!", type: TOASTTYPE.ERROR})
      }
      })
    }

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => storageLocal.set('uid', userCredential.user.uid))
      .then(() => navigation.navigate('Auth'))
      .then(() => useToast({message: "Bem vindo!", type: TOASTTYPE.SUCCESS}))
      .catch(() =>  useToast({message: "Tente novamente!", type: TOASTTYPE.ERROR}))
  };

  const handleToggle = () => {
    setSignIn(prevState => !prevState);
  };

  return (
    signIn ? (
        <S.Container>
        <Text style={styles.title}>Dados de acesso</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          />

        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          />
  
          <Text style={styles.createAccountText} onPress={() =>  navigation.navigate('RecoverPassword')}>Esqueceu a senha?</Text>
  
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.text1}>Não tem uma conta ?</Text>
          <Text style={styles.text2} onPress={handleToggle}>Cadastre-se</Text>
        </View>
  
        </S.Container>
    ) : (
      <View style={styles.container}>
        <Text style={styles.title}>Cadastre-se</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          />

        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          />

        <TextInput
          placeholder="Confirme sua Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          />
  
        <TouchableOpacity style={styles.loginButton} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.text1}>Já tem uma conta ?</Text>
          <Text style={styles.text2} onPress={handleToggle}>Entrar</Text>
        </View>
  
        </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#D3D3D3',
  },
  createAccountText: {
    width: "80%",
    alignSelf: "flex-end",
    fontSize: 10,
    color: '#000',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#4287f5',
    width: '80%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    paddingTop: 8
  },
  text1: {
    paddingRight: 8
  },
  text2: {
    color: "orange"
  }
});

export default LoginScreen;
