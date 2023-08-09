import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const WelcomeScreen = () => {
    const navigation = useNavigation<any>()
  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://media.istockphoto.com/id/1049270704/vector/reuse-reduce-recycle-vector-illustration.jpg?s=612x612&w=0&k=20&c=L8cZoTG0ZrvsAE0CLIEtj7Uxpp_lvgYWtvd_LjV_8BY='}}
        style={styles.backgroundImage}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
           <Text>
             .
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
