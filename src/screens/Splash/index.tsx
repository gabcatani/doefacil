import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Geolocation from '@react-native-community/geolocation';
import { MMKV } from 'react-native-mmkv';

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #DECBA3;
`;

const SplashScreen = () => {
  const navigation = useNavigation<any>()
  const [user, setUser] = useState<FirebaseAuthTypes.User | null >(null);

//   const storage = new MMKV()
  
  useEffect(() => {
    const unsubscrive = auth().onAuthStateChanged((_user) => {
      setUser(_user)
    })

    return unsubscrive
  }, [])

//   useEffect(()=> {

//     Geolocation.getCurrentPosition(
//       (position) => {
//         console.log('LOCALIZACAO',position);

//         storage.set('latitude', position.coords.latitude)
//         storage.set('longitude', position.coords.longitude)
//       },
//       (error) => {
//         // Veja o tipo de erro
//         console.log(error.code, error.message);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );

//   },[])
  
  useEffect(() => {
    const timer = setTimeout(() => {
        if (user) {
            navigation.navigate('Auth')
            return
          }
            navigation.navigate("Login")
    }, 1000); 

    return () => clearTimeout(timer);
  }, [navigation, user]);

  return (
    <CenteredView>
      <LottieView
        source={require('../../../assets/animations/splash.json')}
        autoPlay
        loop={false}
        style={{ width: 200, height: 200 }}
        resizeMode='cover'
      />
    </CenteredView>
  );
};

export default SplashScreen;
