import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as S from './styles'
import auth from '@react-native-firebase/auth';
import {useToast} from '../../hooks/ui/useToast'
import { TOASTTYPE } from '../../hooks/ui/useToast/types';
import {validationSchema} from './validation'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const RecoverPassword = () => {
  const [signIn, setSignIn] = useState(true)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>()

  const handleSendRecoverEmail = () => {
    auth()
    .sendPasswordResetEmail(email)
    .then(() => useToast({message: "Enviamos um email para você", type: TOASTTYPE.SUCCESS}))
    .catch(() => useToast({message: "Ocorreu um error, tente novamente", type: TOASTTYPE.ERROR}))
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: any) => {
    console.log(data);
    handleSendRecoverEmail()
    reset()
  };


  return (
        // <View style={styles.container}>
        // <Text style={styles.title}>Dados de acesso</Text>
        // <TextInput
        //   placeholder="Email"
        //   value={email}
        //   onChangeText={setEmail}
        //   style={styles.input}
        //   />
        // <TouchableOpacity style={styles.loginButton} onPress={handleSendRecoverEmail}>
        //   <Text style={styles.buttonText}>Enviar</Text>
        // </TouchableOpacity>
       
  
        // </View>

        <S.Screen>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <S.TextInput
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="email"
          defaultValue=""
        />
        {errors.email && <S.ErrorText>{errors.email.message}</S.ErrorText>}
    
        <S.ButtonSubmit title="Enviar" onPress={handleSubmit(onSubmit)} />

        <View style={styles.signUpContainer}>
          <Text style={styles.text1}>Não tem uma conta ?</Text>
          <Text style={styles.text2} onPress={() =>  navigation.navigate('Login')}>Cadastre-se</Text>
        </View>
      
      </S.Screen>
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

export default RecoverPassword;
