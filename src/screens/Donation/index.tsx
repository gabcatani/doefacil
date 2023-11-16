import { yupResolver } from '@hookform/resolvers/yup';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { AnchorSimple, CaretLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  launchImageLibrary,
  type ImagePickerResponse,
  type MediaType,
} from 'react-native-image-picker';
import styled from 'styled-components/native';
import * as yup from 'yup';
import { storageLocal } from '../../../App';
import { useToast } from '../../hooks/ui/useToast';
import { TOASTTYPE } from '../../hooks/ui/useToast/types';

interface IDonationForms {
  id: string;
  name: string;
  category: string;
  address: string;
}

interface IFormInput {
  itemName: string;
  category: string;
  usageTime: string;
  description: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
}

const apiKey = 'AIzaSyBnb3_YFy1mvVbB6GV5YBc44_ZjXZ2fNNE';

const validationSchema = yup.object().shape({
  name: yup.string(),
  category: yup.string(),
  usageTime: yup.string(),
  description: yup.string(),
  city: yup.string(),
  neighborhood: yup.string(),
  street: yup.string(),
  number: yup.string(),
});

const DonationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const categories = [
    'Roupas',
    'Eletrônicos',
    'Brinquedos',
    'Livros',
    'Outros',
  ];

  const getStoredLocation = (): any => {
    const storedLatitude = storageLocal.getNumber('latitude');
    const storedLongitude = storageLocal.getNumber('longitude');

    console.log('STORED', { storedLatitude, storedLongitude });

    if (
      storedLatitude !== null &&
      storedLatitude !== undefined &&
      storedLongitude !== undefined
    ) {
      return {
        lat: storedLatitude,
        lng: storedLongitude,
      };
    }
    return null;
  };

  const chooseImage = (): any => {
    const options = {
      mediaType: 'photo' as MediaType,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets?.[0].uri;
        if (uri) {
          setImageUri(uri);
        }
      }
    });
  };

  const getAddressCoordinates = async (address: string) => {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`,
    );

    if (response.data.results && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    } else {
      useToast({
        message: 'Endereço não encontrado, Tente novamente!',
        type: TOASTTYPE.ERROR,
      });
      throw new Error(
        'Nenhum resultado de geocodificação encontrado para o endereço fornecido.',
      );
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(validationSchema), mode: 'onSubmit' });

  const onSubmit = async (data: any) => {
    console.log('submit', data);
    // setLoading(true);

    // if (currentStep < 3) {
    //   nextStep();
    //   return;
    // }

    // const { city, neighborhood, street, number } = data;
    // const address = `${city}-SC,${neighborhood},${street}-${number}`;

    // const { lat, lng } = await getAddressCoordinates(address);

    // const imageRef = storage().ref(`images/${data.name}`);
    // await imageRef.putFile(imageUri ?? '');
    // const imageUrl = await imageRef.getDownloadURL();

    // if (getStoredLocation()) {
    //   useToast({
    //     message: 'Localização não disponível.',
    //     type: TOASTTYPE.ERROR,
    //   });
    //   return;
    // }

    // useToast({ message: 'Doação Cadastrada', type: TOASTTYPE.SUCCESS });

    // try {
    //   await firestore()
    //     .collection('donations')
    //     .add({
    //       itemName: data.name,
    //       itemCategory: data.category,
    //       donatorId: storageLocal.getString('uid'),
    //       usageTime: data.usageTime,
    //       description: data.description,
    //       local: address,
    //       address: {
    //         lat,
    //         lng,
    //       },
    //       image: imageUrl ?? '',
    //     });
    //   reset();
    //   setImageUri(null);
    //   useToast({ message: 'Doação Cadastrada', type: TOASTTYPE.SUCCESS });
    // } catch (error) {
    //   console.error('Erro ao adicionar doação:', error);
    //   useToast({ message: 'Tente Novamente', type: TOASTTYPE.ERROR });
    // } finally {
    //   setLoading(false);
    // }
    // setLoading(false);
  };

  const IconTextInput = ({ icon, ...props }) => {
    return (
      <InputContainer>
        <StyledTextInput {...props} />
        <AnchorSimple color="gray" weight="bold" size={24} />
      </InputContainer>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <React.Fragment key="step1">
          <>
            <Title>Dados da Doação</Title>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IconTextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Nome do item"
                  icon={<AnchorSimple color="gray" weight="bold" size={24} />}
                />
              )}
              name="itemName"
              defaultValue=""
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedCategory(itemValue);
                    onChange(itemValue);
                  }}
                  onBlur={onBlur}
                  style={{
                    width: '100%',
                    height: 50,
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 4,
                    padding: 10,
                    marginBottom: 10,
                    color: '#000',
                  }}
                  itemStyle={{
                    color: '#000',
                  }}
                >
                  {categories.map((category, index) => (
                    <Picker.Item
                      key={index}
                      label={category}
                      value={category}
                    />
                  ))}
                </Picker>
              )}
              name="category"
              defaultValue=""
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                  }}
                  value={value}
                  placeholder="Tempo de Uso"
                />
              )}
              name="usageTime"
              defaultValue=""
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                  }}
                  value={value}
                  placeholder="Observações"
                />
              )}
              name="description"
              defaultValue=""
            />
            <ButtonNextStep onPress={nextStep}>
              <ButtonText>Próximo</ButtonText>
            </ButtonNextStep>
          </>
            </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment key="step2">
            <HeaderContainer>
              <ButtonSubmit onPress={prevStep}>
                <CaretLeft color="gray" weight="bold" size={32} />
              </ButtonSubmit>
              <TitleSecondStep>Endereço</TitleSecondStep>
            </HeaderContainer>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                  }}
                  value={value}
                  placeholder="Cidade"
                />
              )}
              name="city"
              defaultValue=""
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                  }}
                  value={value}
                  placeholder="Bairro"
                />
              )}
              name="neighborhood"
              defaultValue=""
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                  }}
                  value={value}
                  placeholder="Rua"
                />
              )}
              name="street"
              defaultValue=""
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                  }}
                  value={value}
                  placeholder="Número"
                />
              )}
              name="number"
              defaultValue=""
            />
            <ButtonNextStep onPress={nextStep}>
              <ButtonText>Próximo</ButtonText>
            </ButtonNextStep>
          </React.Fragment>
        );
      case 3:
        return (
          <React.Fragment key="step3">
            <HeaderContainer>
              <ButtonSubmit onPress={prevStep}>
                <CaretLeft color="gray" weight="bold" size={32} />
              </ButtonSubmit>
              <TitleSecondStep>Imagem </TitleSecondStep>
            </HeaderContainer>
            {!imageUri && (
              <UploadImageButton onPress={chooseImage}>
                <UploadImageButtonText>Escolher imagem</UploadImageButtonText>
              </UploadImageButton>
            )}

            {imageUri && <ImagePreview source={{ uri: imageUri }} />}

            {loading ? (
              <ActivityIndicator />
              ) : (
                <ButtonSubmit
                onPress={handleSubmit(onSubmit)}
                disabled={!imageUri}
                >
                <ButtonText isImageUriPresent={!!imageUri}>Doar</ButtonText>
              </ButtonSubmit>
            )}
            </React.Fragment>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Screen>{renderStep()}</Screen>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DonationForm;

const Screen = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
`;

const TextInput = styled.TextInput`
  width: 100%;
  height: 50px;
  border: 1px solid #e8e8e8;
  margin-bottom: 16px;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 16px;
  color: #000;
`;

const UploadImageButton = styled.TouchableOpacity`
  margin: 20px 0px;
`;

const UploadImageButtonText = styled.Text`
  background-color: #36a2b7;
  border-radius: 15px;
  color: black;
  font-size: 24px;
  padding: 10px 50px;
`;

const ButtonSubmit = styled.TouchableOpacity``;

const ButtonText = styled.Text`
  background-color: ${(props) =>
    props.isImageUriPresent ? '#b7b736' : 'grey'};
  border-radius: 15px;
  color: black;
  font-size: 24px;
  padding: 10px 50px;
`;

const ButtonNextStep = styled.Text`
  background-color: #b7b736;
  border-radius: 15px;
  color: black;
  font-size: 24px;
  padding: 10px 50px;
`;

const ImagePreview = styled.Image`
  width: 200px;
  height: 200px;
  margin: 10px 0px;
  border-radius: 10px;
`;

const Title = styled.Text`
  color: black;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 18px;
`;

const TitleSecondStep = styled.Text`
  color: black;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 18px;
`;

const InputContainer = styled.View`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  border: 1px solid #e8e8e8;
  margin-bottom: 16px;
  padding-right: 25px;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  padding: 10px 15px;
`;
