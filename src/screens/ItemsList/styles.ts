import styled from 'styled-components/native';
import MapView from 'react-native-maps';
import { View } from 'react-native';

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
  align-items: flex-start;
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
  textAlign: left;
`;

const CategoryText = styled.Text`
  font-size: 16px;
  textAlign: left;
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
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background-color: transparent;
  border: 2px solid white;
`;

const PinShaft = styled(View)`
  width: 0; 
  height: 0; 
  borderLeftWidth: 10px; 
  borderRightWidth: 10px; 
  borderBottomWidth: 20px;
  backgroundColor: transparent;
  borderLeftColor: transparent; 
  borderRightColor: transparent; 
  borderBottomColor: black;
  alignSelf: center;
  transform: rotate(180deg);
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
  PinShaft,
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