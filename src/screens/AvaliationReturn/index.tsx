import React from 'react';
import styled from 'styled-components/native';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const CompletionScreen = () => {
    const navigation = useNavigation<any>()

    const handleGoFinish = () => {
        navigation.navigate('Maps')
    }

  return (
    <ScreenContainer>
      <TopSection>
        <LottieView
          source={require('../../../assets/animations/trophy.json')}
          autoPlay
          loop
          style={{ width: 400, height: 400 }}
          resizeMode='cover'
        />
        <CongratsText>Obrigado!</CongratsText>
        <ScoreText>100% Coletadas</ScoreText>
        <CompletionText>Você respondeu completamente.</CompletionText>
        <DetailsText>
          Todas as suas repostas serão utilizadas para melhorar o app.
        </DetailsText>
      </TopSection>
      <ShareText>Envie outro feedback:</ShareText>
        <HomeButton onPress={handleGoFinish}>
            <ButtonText>Finalizar</ButtonText>
        </HomeButton>
    </ScreenContainer>
  );
};

export default CompletionScreen;

// Styled Components
const ScreenContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 20px;
`;

const TopSection = styled.View`
  align-items: center;
  justify-content: center;
`;

const CongratsText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 10px;
`;

const ScoreText = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 10px;
`;

const CompletionText = styled.Text`
  font-size: 18px;
  color: #333;
  margin-bottom: 5px;
`;

const DetailsText = styled.Text`
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
`;

const ShareText = styled.Text`
  font-size: 16px;
  color: #333;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: white;
`;

const HomeButton = styled.TouchableOpacity`
    margin: 10px;
    padding: 10px;
    border-radius: 8px;
    background-color: #7d7dc2;
`;
