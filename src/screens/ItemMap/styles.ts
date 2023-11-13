import styled from 'styled-components/native';

const Screen = styled.View`
  flex: 1;
`;

// const BackgroundContainer = styled.View`
//   /* background-color: blue; */
// `;

const Header = styled.View`
  padding-top: 20px;
  margin-bottom: 10px;
  align-items: center;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const Card = styled.View`
  flex-direction: row;
  padding: 10px;
  margin: 10px;
  border-radius: 30px;
  background-color: white;
`;

const CardTextContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-left: 10px;
`;

const ImagemContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const ItemImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 99px;
`;

const NameText = styled.Text`
  font-size: 24px;
`;

const CategoryText = styled.Text`
  font-size: 16px;
  
`;

export { 
  Screen,
  // BackgroundContainer,
  Header, 
  HeaderText,
  Card, 
  CardTextContainer,
  ImagemContainer, 
  ItemImage, 
  NameText, 
  CategoryText
};