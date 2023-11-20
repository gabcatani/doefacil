import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import styled from 'styled-components/native';
import useLocationStorage from '../../../hooks/data/useLocationStorage';
import { ActivityIndicator } from 'react-native';
import {
  MapPin,
} from 'phosphor-react-native';

const ContainerLoading = styled.View`
  height: 70%;
  width: 100%;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  height: 70%;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledMap = styled(MapView)`
  flex: 1;
`;

const MapPicker = ({ onLocationSelected }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { location } = useLocationStorage();

  const handlePress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    if (onLocationSelected) {
      onLocationSelected({ latitude, longitude });
    }
  };

  if (!location) {
    return (
      <ContainerLoading>
        <ActivityIndicator size="large" />
      </ContainerLoading>
    );
  }

  return (
    <Container>
      <StyledMap
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handlePress}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation}>
            <MapPin size={40} color="#49888B" />
          </Marker>
        )}
      </StyledMap>
    </Container>
  );
};

export default MapPicker;
