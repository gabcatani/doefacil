import React, { useState } from 'react';
import {validationSchema} from './validation'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as S from './styles'
import {useToast} from '../../hooks/ui/useToast'
import { TOASTTYPE } from '../../hooks/ui/useToast/types';
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';
import { IDonationForms } from './types'
import storage from '@react-native-firebase/storage';
import axios from 'axios';
import { MMKV } from 'react-native-mmkv';

const apiKey = "AIzaSyBnb3_YFy1mvVbB6GV5YBc44_ZjXZ2fNNE";

const DonationForm = () => {
  
  const [imageUri, setImageUri] = useState<string | null>(null);

  const storage = new MMKV()

  const getStoredLocation = () => {
    const storedLatitude = storage.getString('latitude');
    const storedLongitude = storage.getString('longitude');
    if (storedLatitude !== null && storedLatitude !== undefined && 
        storedLongitude !== null && storedLongitude !== undefined) {
      return {
        lat: JSON.parse(storedLatitude),
        lng: JSON.parse(storedLongitude),
      };
    }
    return null;
  };
  
  

  const chooseImage = () => {
    const options = {
      mediaType: 'photo' as MediaType,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets && response.assets[0].uri;
        if (uri) {
          setImageUri(uri);
        }
      }
    });
  };

  const getAddressCoordinates = async (address: string) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`);
    
    if (response.data.results && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    } else {
      useToast({ message: "Endereço não encontrado, Tente novamente!", type: TOASTTYPE.ERROR });
      throw new Error('Nenhum resultado de geocodificação encontrado para o endereço fornecido.');
    }
  };
  
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

  const onSubmit = async (data: any) => {
    if (!data) return useToast({message: "Tente Novamente", type:TOASTTYPE.ERROR})
    
    if (!imageUri) {
      useToast({ message: "Por favor, selecione uma imagem antes de enviar.", type: TOASTTYPE.ERROR });
      return;
    }

    const {city, neighborhood, street, number } = data
    const address = `${city}-SC,${neighborhood},${street}-${number}`

    const { lat, lng } = await getAddressCoordinates(address);

    const imageRef = storage().ref(`images/${data.name}`);
    await imageRef.putFile(imageUri ?? '');
    const imageUrl = await imageRef.getDownloadURL();

    const storedLocation = getStoredLocation();

    if (!storedLocation) {
      useToast({ message: "Localização não disponível.", type: TOASTTYPE.ERROR });
      return;
    }
  

    try {
      await firestore()
        .collection('donations')
        .add({
          itemName: data.name,
          itemCategory: data.category,
          usageTime: data.usageTime,
          description: data.description,
          local: address,
          address: {
            lat: storedLocation.lat,
            lng: storedLocation.lng,
          },
          image: imageUrl ?? ''
        });
      // reset();
      // setImageUri(null)
      useToast({ message: "Doação Cadastrada", type: TOASTTYPE.SUCCESS });
    } catch (error) {
      console.error("Erro ao adicionar doação:", error);
      useToast({ message: "Tente Novamente", type: TOASTTYPE.ERROR });
    }
  };

  return (
    <S.Screen>
      <S.Title>
        Dados do item
      </S.Title>
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <S.TextInput
          onBlur={onBlur}
          onChangeText={(value) => onChange(value)}
          value={value}
          placeholder='Nome do item'
        />
      )}
      name="name"
      defaultValue=""
    />
    {errors.name && <S.ErrorText>{errors.name.message}</S.ErrorText>}

    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <S.TextInput
          onBlur={onBlur}
          onChangeText={(value) => onChange(value)}
          value={value}
          placeholder='Categoria do item'
        />
      )}
      name="category"
      defaultValue=""
    />
    {errors.category && <S.ErrorText>{errors.category.message}</S.ErrorText>}

    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <S.TextInput
          onBlur={onBlur}
          onChangeText={(value) => onChange(value)}
          value={value}
          placeholder='Tempo de Uso'
        />
      )}
      name="usageTime"
      defaultValue=""
    />
    {errors.category && <S.ErrorText>{errors.category.message}</S.ErrorText>}
    
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <S.TextInput
          onBlur={onBlur}
          onChangeText={(value) => onChange(value)}
          value={value}
          placeholder='Observações'
        />
      )}
      name="description"
      defaultValue=""
    />
    {errors.category && <S.ErrorText>{errors.category.message}</S.ErrorText>}

    
    <S.Title>Endereço</S.Title>
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <S.TextInput
          onBlur={onBlur}
          onChangeText={(value) => onChange(value)}
          value={value}
          placeholder='Cidade'
        />
      )}
      name="city"
      defaultValue=""
    />
    {errors.category && <S.ErrorText>{errors.category.message}</S.ErrorText>}
    
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <S.TextInput
          onBlur={onBlur}
          onChangeText={(value) => onChange(value)}
          value={value}
          placeholder='Bairro'
        />
      )}
      name="neighborhood"
      defaultValue=""
    />
    {errors.category && <S.ErrorText>{errors.category.message}</S.ErrorText>}
   
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <S.TextInput
          onBlur={onBlur}
          onChangeText={(value) => onChange(value)}
          value={value}
          placeholder='Rua'
        />
      )}
      name="street"
      defaultValue=""
    />
    {errors.category && <S.ErrorText>{errors.category.message}</S.ErrorText>}
   
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <S.TextInput
          onBlur={onBlur}
          onChangeText={(value) => onChange(value)}
          value={value}
          placeholder='Número'
        />
      )}
      name="number"
      defaultValue=""
    />
    {errors.category && <S.ErrorText>{errors.category.message}</S.ErrorText>}

    <S.UploadImageButton onPress={chooseImage}>
        <S.UploadImageButtonText>
          {imageUri ? 'Imagem selecionada' : 'Escolher imagem'}
        </S.UploadImageButtonText>
      </S.UploadImageButton>

      {imageUri && <S.ImagePreview source={{ uri: imageUri }} />}

    <S.ButtonSubmit title="Doar" onPress={handleSubmit(onSubmit)} />
  
  </S.Screen>
  )
};




export default DonationForm;
