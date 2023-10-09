import styled from 'styled-components/native';

const Screen = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

const TextInput = styled.TextInput`
  width: 80%;
  height: 40px;
  border: 1px solid gray;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 20px;
`;

const ErrorText = styled.Text`
  color: red;
  margin-bottom: 8px;
  font-size: "12px";
`;

const ButtonSubmit = styled.Button`
  background-color: blue;
  padding: 15px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 100%;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

export { Screen, TextInput, ErrorText, ButtonSubmit, ButtonText };
