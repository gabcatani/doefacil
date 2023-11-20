import { yupResolver } from '@hookform/resolvers/yup';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { CaretLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ActivityIndicator, View, TouchableOpacity, TextInput, Text } from 'react-native';
import styled from 'styled-components/native';
import * as yup from 'yup';
import { useToast } from '../../hooks/ui/useToast';
import { TOASTTYPE } from '../../hooks/ui/useToast/types';
import theme from '../../theme';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Insira um email válido')
    .required('O campo de email é obrigatório'),
});

const RecoverPasswordScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleRecoverPassword = async (data) => {
    setIsLoading(true);
    try {
      await auth().sendPasswordResetEmail(data.email);
      useToast({
        message: 'Verifique seu e-mail para redefinir sua senha',
        type: TOASTTYPE.SUCCESS,
      });
      navigation.navigate('Login');
    } catch (error) {
      useToast({ message: 'Erro ao tentar redefinir a senha. Tente novamente!', type: TOASTTYPE.ERROR });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen>
      <HeaderContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CaretLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <HeaderTitle>Recuperação de Senha</HeaderTitle>
      </HeaderContainer>
      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <StyledInput
            placeholder="Digite seu email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
      <SubmitButton onPress={handleSubmit(handleRecoverPassword)} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <ButtonText>Enviar</ButtonText>
        )}
      </SubmitButton>
    </Screen>
  );
};

// Estilos
const Screen = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  flex: 1;
`;

const StyledInput = styled.TextInput`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-vertical: 8px;
  width: 80%;
`;

const ErrorText = styled.Text`
  color: #ff0000;
  font-size: 14px;
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin-top: 8px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
`;

export default RecoverPasswordScreen;
