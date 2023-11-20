import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { Envelope, LockSimple, UserCircle, SignIn, UserPlus } from 'phosphor-react-native';
import auth from '@react-native-firebase/auth';
import { useToast } from '../../hooks/ui/useToast';
import { TOASTTYPE } from '../../hooks/ui/useToast/types';
import theme from '../../theme';
import { storageLocal } from '../../../App';
import firestore from '@react-native-firebase/firestore';

const schema = yup.object().shape({
  fullName: yup.string().required('Nome completo é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'As senhas não correspondem')
    .required('Confirmação de senha é obrigatória'),
});

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleLogin = async (data) => {
    console.log('data', data)
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        storageLocal.set('uid', userCredential.user.uid);
      })
      .then(() => navigation.navigate('Auth'))
      .then(() => {
        useToast({ message: 'Bem vindo!', type: TOASTTYPE.SUCCESS });
      })
      .catch(() => {
        useToast({ message: 'Tente novamente!', type: TOASTTYPE.ERROR });
      }).finally(()=> {
        setLoading(false);
      })
  };

  const handleCreateAccount = async (data) => {
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredentials) => {
        storageLocal.set('uid', userCredentials.user.uid);

        navigation.navigate('Auth');

        return firestore().collection('users').doc(userCredentials.user.uid).set(data.fullName, { merge: true })
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          useToast({ message: 'Email já utilizado!', type: TOASTTYPE.ERROR });
        }
      }).finally(()=> {
        setLoading(false);
      })
  };

  const toggleForm = () => {
    setIsCreating(!isCreating);
  };

  return (
    <Container>
      <Title>{isCreating ? 'Criar Conta' : 'Login'}</Title>
      <Form>
        {isCreating && (
          <Controller
            control={control}
            name="fullName"
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
              <InputContainer>
                <UserCircle color="gray" weight="bold" size={24} />
                <StyledTextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Nome completo"
                />
              </InputContainer>
            )}
          />
        )}
        {isCreating && <ErrorText>{errors.fullName?.message}</ErrorText>}

        <Controller
          control={control}
          name="email"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <InputContainer>
              <Envelope color="gray" weight="bold" size={24} />
              <StyledTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Email"
                keyboardType="email-address"
              />
            </InputContainer>
          )}
        />
        <ErrorText>{errors.email?.message}</ErrorText>

        <Controller
          control={control}
          name="password"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <InputContainer>
              <LockSimple color="gray" weight="bold" size={24} />
              <StyledTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Senha"
                secureTextEntry
              />
            </InputContainer>
          )}
        />
        <ErrorText>{errors.password?.message}</ErrorText>

        {isCreating && (
          <Controller
            control={control}
            name="confirmPassword"
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
              <InputContainer>
                <LockSimple color="gray" weight="bold" size={24} />
                <StyledTextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Confirme a senha"
                  secureTextEntry
                />
              </InputContainer>
            )}
          />
        )}
        {isCreating && <ErrorText>{errors.confirmPassword?.message}</ErrorText>}

        {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <Button onPress={handleSubmit(isCreating ? handleCreateAccount : handleLogin)}>
          <ButtonText>{isCreating ? 'Criar Conta' : 'Entrar'}</ButtonText>
          {isCreating ? <UserPlus color="white" weight="bold" size={24} /> : <SignIn color="white" weight="bold" size={24} />}
        </Button>
      )}
    </Form>
    {isCreating ? (
      <TextLink onPress={toggleForm}>
        Já tem uma conta? Entrar
      </TextLink>
    ) : (
      <>
        <TextLink onPress={() => navigation.navigate('RecoverPassword')}>
          Esqueceu a senha?
        </TextLink>
        <TextLink onPress={toggleForm}>
          Não tem uma conta? Cadastre-se
        </TextLink>
      </>
    )}
  </Container>
  );
};

// Estilos
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${theme.colors.background};
`;

const Title = styled.Text`
  font-size: 24px;
  color: ${theme.colors.text};
  margin-bottom: 20px;
`;

const Form = styled.View`
  width: 100%;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid #e8e8e8;
  padding: 10px 15px;
  margin-bottom: 10px;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  padding-left: 10px;
  color: ${theme.colors.text};
`;

const ErrorText = styled.Text`
  font-size: 12px;
  color: red;
  margin-bottom: 10px;
`;

const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.primary};
  padding: 10px;
  border-radius: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  margin-right: 10px;
`;

const TextLink = styled.Text`
  color: ${theme.colors.primary};
  margin-top: 20px;
`;

export default LoginScreen;
