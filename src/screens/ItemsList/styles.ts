import styled from 'styled-components/native';
import MapView from 'react-native-maps';

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

const Toggle = styled.View`
  /* flex: 1; */
  flex-direction: row;
  justify-content: center;
`;

const ToggleButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
`;

const ToggleText = styled.Text`
  font-size: 16px;
  margin: 10px;
`
const Map = styled(MapView)`
  flex: 1
`;

const MarkerImage = styled.Image`
  width: 50px;
  height: 50px;
`;

const CalloutTitle = styled.Text`
  font-size: 16px;
`;

const MapContainer = styled.View`
  flex: 1;
  margin: 20px;
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
  CategoryText,
  Toggle,
  ToggleButton,
  ToggleText,
  Map,
  MarkerImage,
  CalloutTitle,
  MapContainer
};