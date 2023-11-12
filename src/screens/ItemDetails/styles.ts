import styled from 'styled-components/native';
import MapView from 'react-native-maps';

const Screen = styled.View`
  flex: 1;
`;

const Header = styled.View`
  flex-direction: row;
  padding-top: 20px;
  margin-bottom: 10px;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  /* position: absolute; */
  /* width: 100%; */
  text-align: center;
  top: 20px;
`;

const GoBackButton = styled.TouchableOpacity`
`;

const ShowMapButton = styled.TouchableOpacity`
`;

const Card = styled.View`
  flex-direction: row;
  padding: 10px;
  margin: 10px;
  border-radius: 30px;
  background-color: white;
`;

const ImagemContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  `;

const ItemImage = styled.Image`
  width: 300px;
  height: 300px;
  `;

  const CardTextContainer = styled.View`

  `;

const NameText = styled.Text`
  font-size: 24px;
`;

const CategoryText = styled.Text`
  font-size: 16px;
`;

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
  GoBackButton,
  Header, 
  HeaderText,
  Card, 
  CardTextContainer,
  ImagemContainer, 
  ItemImage, 
  NameText, 
  CategoryText,
  ShowMapButton,
  Map,
  MarkerImage,
  CalloutTitle,
  MapContainer
};