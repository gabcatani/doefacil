import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import styled from 'styled-components/native';

const Container = styled.View`
  height: 70%;
  width: 90%;
  margin-bottom: 20px;
`;

const StyledMap = styled(MapView)`
  flex: 1;
`;

const MapPicker = ({ onLocationSelected }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handlePress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    if (onLocationSelected) {
      onLocationSelected({ latitude, longitude });
    }
  };

  return (
    <Container>
      <StyledMap
        initialRegion={{
          latitude: -23.55052,
          longitude: -46.633308,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handlePress}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </StyledMap>
    </Container>
  );
};

export default MapPicker;
