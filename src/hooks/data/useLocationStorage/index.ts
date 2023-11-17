import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { MMKV } from 'react-native-mmkv';

interface Location {
  latitude: number;
  longitude: number;
}

const storage = new MMKV();

const useLocationStorage = () => {
  const [location, setLocation] = useState<Location | null>(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLocation: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        storage.set('location', JSON.stringify(currentLocation));
        setLocation(currentLocation);
      },
      (error) => {
        console.error(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const getGoogleMapsAddress = async (
    latitude: number,
    longitude: number,
  ): Promise<string> => {
    const apiKey = 'AIzaSyBnb3_YFy1mvVbB6GV5YBc44_ZjXZ2fNNE'; // Use sua própria chave da API
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      console.log('response', response)
      return (
        response.data.results[0]?.formatted_address || 'Endereço não encontrado'
      );
    } catch (error) {
      console.error(error);
      return 'Erro ao buscar endereço';
    }
  };

  useEffect(() => {
    requestLocationPermission().then(getLocation);
  }, []);

  return { location, getGoogleMapsAddress };
};

export default useLocationStorage;
