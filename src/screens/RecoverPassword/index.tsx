import { yupResolver } from '@hookform/resolvers/yup';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { CaretLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import * as yup from 'yup';
import { useToast } from '../../hooks/ui/useToast';
import { TOASTTYPE } from '../../hooks/ui/useToast/types';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Insira um email válido')
    .required('Não pode ser vazio'),
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

  const handleRecoverPassword = (email: string) => {
    setIsLoading(true);
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        useToast({
          message: 'Verifique seu e-mail para redefinir sua senha',
          type: TOASTTYPE.SUCCESS,
        });
        navigation.navigate('Login');
      })
      .catch(() => {
        useToast({ message: 'Tente novamente!', type: TOASTTYPE.ERROR });
      })
      .finally(() => {
        setIsLoading(false); // Desativa o indicador de carregamento
      });
  };

  const onSubmit = (data) => {
    handleRecoverPassword(data.email);
  };

  return (
    <Screen>
      <HeaderContainer>
        <HeaderButton
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <CaretLeft color="gray" weight="bold" size={32} />
        </HeaderButton>
        <TitleText>Recuperação de Senha</TitleText>
      </HeaderContainer>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <StyledInput
            placeholder="Digite seu email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
        defaultValue=""
      />
      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

      <StyledButton onPress={handleSubmit(onSubmit)} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="blue" />
        ) : (
          <ButtonText>Enviar</ButtonText>
        )}
      </StyledButton>
    </Screen>
  );
};

const Screen = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
`;

const HeaderButton = styled.TouchableOpacity``;

const TitleText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 32px;
`;

const StyledInput = styled.TextInput`
  width: 80%;
  height: 50px;
  border: 1px solid #ccc;
  margin-bottom: 16px;
  padding: 10px;
  border-radius: 8px;
`;

const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
  margin-bottom: 8px;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: ${({ disabled }) => (disabled ? 'white' : '#4287f5')};
  width: 80%;
  height: 5%;
  min-height: 40px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export default RecoverPasswordScreen;
