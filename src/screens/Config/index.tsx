import React, { useState } from 'react';
import { Linking } from 'react-native';
import * as S from './styles'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {useToast} from '../../hooks/ui/useToast'
import { TOASTTYPE } from '../../hooks/ui/useToast/types';


const Config = () => {
  const navigation = useNavigation<any>()

  const openGoogleForm = () => {
    const url = 'https://www.google.com';
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Não foi possível abrir o link: " + url);
        }
      })
      .catch(() => useToast({message: "Tente novamente", type: TOASTTYPE.ERROR}))
  };
  
  
  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => navigation.navigate('Login'))
      .then(() => useToast({message: "Você saiu do app", type: TOASTTYPE.SUCCESS}))
      .catch(() => useToast({message: "Tente novamente", type: TOASTTYPE.ERROR}))
  }

  return (
    <S.Screen>
      <S.ButtonSubmit title='Avalie o app' onPress={openGoogleForm} />
      <S.ButtonSubmit title='Sair' onPress={handleSignOut} />
    </S.Screen>
  )
}

export default Config;
