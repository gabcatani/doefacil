import { yupResolver } from '@hookform/resolvers/yup';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Envelope } from 'phosphor-react-native';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ActivityIndicator } from 'react-native';
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
      useToast({
        message: 'Erro ao tentar redefinir a senha. Tente novamente!',
        type: TOASTTYPE.ERROR,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen>
      <HeaderTitle>Recuperação de Senha</HeaderTitle>
      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <InputWithIcon>
            <Envelope size={24} color="#ccc" />
            <StyledInput
              placeholder="Digite seu email"
              placeholderTextColor={theme.colors.secondary}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
            />
          </InputWithIcon>
        )}
      />
      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
      <SubmitButton
        onPress={handleSubmit(handleRecoverPassword)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <ButtonText>Enviar</ButtonText>
        )}
      </SubmitButton>
      <TextLink onPress={() => navigation.navigate('Login')}>
        Voltar para o Login
      </TextLink>
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

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const InputWithIcon = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 20px;
  padding: 0px 10px;
  margin-vertical: 8px;
  width: 80%;
`;

// Atualize o StyledInput para não incluir margens e paddings que agora estão no InputWithIcon
const StyledInput = styled.TextInput`
  flex: 1;
  padding-left: 10px; /* ou ajuste conforme necessário */
`;

const ErrorText = styled.Text`
  color: #ff0000;
  font-size: 14px;
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  padding: 10px;
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

const TextLink = styled.Text`
  color: ${theme.colors.primary};
  margin-top: 20px;
`;

export default RecoverPasswordScreen;
