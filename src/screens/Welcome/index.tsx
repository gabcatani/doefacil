import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
// import {StyledText, StyledView} from './styles'
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = () => {
    const navigation = useNavigation<any>()
    const [user, setUser] = useState<FirebaseAuthTypes.User | null >(null);

    useEffect(() => {
      const unsubscrive = auth().onAuthStateChanged((_user) => {
        setUser(_user)
      })

      return unsubscrive
    }, [])

    useEffect(() => {
      console.log('Chamando localização');
      Geolocation.getCurrentPosition(
        (position) => {
          console.log('Posição obtida:', position);
          const { latitude, longitude } = position.coords;
          AsyncStorage.setItem('localizacao', JSON.stringify({ latitude, longitude }));
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }, []);

    const handleNextStep = () => {
      if (user) {
        navigation.navigate('Auth')
        return
      }
        navigation.navigate("Login")
    }

  return (
    <View style={styles.container}>
      {/* <Image
        source={{uri: 'https://media.istockphoto.com/id/1049270704/vector/reuse-reduce-recycle-vector-illustration.jpg?s=612x612&w=0&k=20&c=L8cZoTG0ZrvsAE0CLIEtj7Uxpp_lvgYWtvd_LjV_8BY='}}
        style={styles.backgroundImage}
      /> */}
      <TouchableOpacity onPress={handleNextStep}>
           <Text>
             Bem - Vindo !
            </Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  backgroundImage: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

export default WelcomeScreen;



// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { TouchableOpacity } from 'react-native';
// import * as S from './styles'
// import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

// const WelcomeScreen = () => {
//     const navigation = useNavigation<any>()
//     const [user, setUser] = useState<FirebaseAuthTypes.User | null >(null);

//     useEffect(() => {
//       const unsubscrive = auth().onAuthStateChanged((_user) => {
//         setUser(_user)
//       })

//       return unsubscrive
//     }, [])

//     const handleNextStep = () => {
//       if (user) {
//         navigation.navigate('Auth')
//         return
//       }
//         navigation.navigate("Login")
//     }

//   return (
//     <S.Container>
//       <S.WescolmeButton title=" Bem - Vindo !" onPress={handleNextStep} />
//     </S.Container>
//   );
// };

// export default WelcomeScreen;
