import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text } from 'react-native';

// Styled components
const UploadArea = styled.TouchableOpacity`
  border-style: dashed;
  border-width: 2px;
  border-color: #ccc;
  border-radius: 10px;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const InstructionText = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
  text-align: center;
`;

const FileTypeText = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
  text-align: center;
`;

// Component
const FileUploader = ({ chooseImage }) => {
  return (
    <UploadArea onPress={chooseImage}>
      <InstructionText>Selecione um arquivo ou arraste e solte aqui</InstructionText>
      <FileTypeText>Envie arquivos .pdf, .png, .jpg ou .jpeg | Tam. máx.: 25 MB.</FileTypeText>
    </UploadArea>
  );
};

export default FileUploader;
