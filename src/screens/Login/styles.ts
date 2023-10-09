import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #000;
`;

const Input = styled.TextInput`
  width: 80%;
  height: 40px;
  border-color: #ccc;
  border-width: 1px;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 0px 10px;
  background-color: #D3D3D3;
`;

const CreateAccountText = styled.Text`
  width: 80%;
  align-self: flex-end;
  font-size: 10px;
  color: #000;
  margin-bottom: 10px;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: #4287f5;
  width: 80%;
  height: 40px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const SignUpContainer = styled.View`
  flex-direction: row;
  padding-top: 8px;
`;

const Text1 = styled.Text`
  padding-right: 8px;
`;

const Text2 = styled.Text`
  color: orange;
`;

export {Container, Title, Input, CreateAccountText, LoginButton, ButtonText, SignUpContainer, Text1, Text2}