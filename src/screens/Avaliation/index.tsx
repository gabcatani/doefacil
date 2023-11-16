import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useToast } from '../../hooks/ui/useToast';
import { TOASTTYPE } from '../../hooks/ui/useToast/types';

const questions = [
  {
    question: 'Como você avaliaria a facilidade de uso do aplicativo?',
    options: [
      'Muito fácil de usar',
      'Relativamente fácil, com alguns desafios',
      'Difícil de usar',
      'Muito difícil de usar',
    ],
  },
  {
    question:
      'Quão satisfeito(a) você está com as funcionalidades oferecidas pelo aplicativo?',
    options: [
      'Muito satisfeito(a)',
      'Satisfeito(a), mas há espaço para melhorias',
      'Insatisfeito(a)',
      'Muito insatisfeito(a)',
    ],
  },
  {
    question:
      'Como você classificaria a estabilidade e desempenho do aplicativo?',
    options: [
      'Excelente, sem problemas de desempenho',
      'Bom, com pequenos problemas ocasionais',
      'Regular, com problemas frequentes',
      'Ruim, com problemas constantes',
    ],
  },
  {
    question:
      'Descreva quais recursos adicionais você gostaria de ver no aplicativo e como eles melhorariam sua experiência de uso.',
    input: true,
  },
  {
    question:
      'Compartilhe qualquer experiência específica (positiva ou negativa) que você teve ao usar o aplicativo e como isso afetou sua percepção geral sobre ele.',
    input: true,
  },
];

const Avaliation = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [inputAnswers, setInputAnswers] = useState({});
  const navigation = useNavigation();

  const handleSelectOption = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleInputChange = (questionIndex, text) => {
    setInputAnswers({ ...inputAnswers, [questionIndex]: text });
  };

  const handleSubmit = async () => {
    const allOptionsSelected = answers.every((answer, index) => {
      return questions[index].options ? answer !== null : true;
    });

    const allInputsFilled = questions.every((question, index) => {
      return question.input
        ? inputAnswers[index] && inputAnswers[index].trim() !== ''
        : true;
    });

    if (!allOptionsSelected || !allInputsFilled) {
      useToast({
        message: 'Por favor, responda todas as perguntas.',
        type: TOASTTYPE.ERROR,
      });
      return;
    }

    const allAnswers = answers.map((answer, index) => {
      if (questions[index].options) {
        return questions[index].options[answer];
      }
      return inputAnswers[index];
    });

    navigation.navigate('AvaliationReturn');
    useToast({ message: 'Respostas enviadas!', type: TOASTTYPE.SUCCESS });
    try {
      const userEmail = auth().currentUser?.email;

      await firestore().collection('avaliations').add({
        email: userEmail,
        answers: allAnswers,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

      navigation.navigate('AvaliationReturn');
      useToast({ message: 'Respostas enviadas!', type: TOASTTYPE.SUCCESS });
      setAnswers(Array(questions.length).fill(null));
      setInputAnswers({});
    } catch (error) {
      console.error('Erro ao salvar respostas:', error);
      useToast({ message: 'Tente novamente', type: TOASTTYPE.ERROR });
    }
  };

  // const handleSignOut = () => {
  //   auth()
  //     .signOut()
  //     .then(() => {
  //       navigation.navigate('Login');
  //     })
  //     .then(() => {
  //       useToast({ message: 'Você saiu do app', type: TOASTTYPE.SUCCESS });
  //     })
  //     .catch(() => {
  //       useToast({ message: 'Tente novamente', type: TOASTTYPE.ERROR });
  //     });
  // };

  return (
    <Screen>
      <ScreenTitle>Avalie o APP!</ScreenTitle>
      <ScrollView showsVerticalScrollIndicator={false}>
        {questions.map((question, questionIndex) => (
          <QuestionContainer key={questionIndex}>
            <QuestionText>{question.question}</QuestionText>
            {question.options ? (
              question.options.map((option, optionIndex) => (
                <OptionButton
                  key={optionIndex}
                  selected={answers[questionIndex] === optionIndex}
                  onPress={() => {
                    handleSelectOption(questionIndex, optionIndex);
                  }}
                >
                  <OptionText>{option}</OptionText>
                </OptionButton>
              ))
            ) : (
              <StyledTextInput
                value={inputAnswers[questionIndex] || ''}
                onChangeText={(text) => {
                  handleInputChange(questionIndex, text);
                }}
                placeholder="Digite sua resposta aqui"
              />
            )}
          </QuestionContainer>
        ))}
        <ButtonSubmit title="Enviar Respostas" onPress={handleSubmit} />
        {/* <ButtonSubmit title='Sair' onPress={handleSignOut} /> */}
      </ScrollView>
    </Screen>
  );
};

export default Avaliation;

// Styled Components
const Screen = styled.View`
  flex: 1;
  background-color: white;
  padding: 20px;
`;

const QuestionContainer = styled.View`
  margin-bottom: 20px;
`;

const ScreenTitle = styled.Text`
  font-size: 32px;
  margin-bottom: 20px;
  text-align: center;
`;

const QuestionText = styled.Text`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

const OptionButton = styled.TouchableOpacity`
  background-color: ${(props) => (props.selected ? 'blue' : 'gray')};
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
`;

const OptionText = styled.Text`
  color: white;
  font-size: 16px;
`;

const ButtonSubmit = styled.Button`
  margin-top: 20px;
`;

const StyledTextInput = styled.TextInput`
  width: 100%;
  height: 140px;
  border: 1px solid gray;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 5px;
  text-align-vertical: top;
`;
