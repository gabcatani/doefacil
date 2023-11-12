import styled from 'styled-components/native';

const Screen = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
  padding: 20px;
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
  color: ${(props) => props.theme.text.error};
  margin-bottom: 8px;
  font-size: 12px;
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
  font-size: 8px;
`;

const UploadImageButton = styled.TouchableOpacity`
  background-color: #3498db;
  padding: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 40%;
  margin: 10px 0px;
`;

const UploadImageButtonText = styled.Text`
  color: white;
  font-size: 8px;
`;

const ImagePreview = styled.Image`
  width: 80px;
  height: 80px;
  margin: 10px 0px;
  border-radius: 10px;
`;

const Title = styled.Text`
  color: black;
  margin-bottom: 8px;
`;

export { Screen, TextInput, ErrorText, ButtonSubmit, ButtonText, UploadImageButton, UploadImageButtonText, ImagePreview, Title };
