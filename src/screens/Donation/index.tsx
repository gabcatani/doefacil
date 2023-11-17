import { yupResolver } from '@hookform/resolvers/yup';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { AnchorSimple, CaretLeft } from 'phosphor-react-native';
import React, { useState, useEffect } from 'react';
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
import useLocationStorage from '../../hooks/data/useLocationStorage';
import { useToast } from '../../hooks/ui/useToast';
import { TOASTTYPE } from '../../hooks/ui/useToast/types';

interface IFormInput {
  itemName: string;
  itemCategory: string;
  usageTime: string;
  description: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
}
interface IAddress {
  street: string;
  number: string;
  bairro: string;
  city: string;
}

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
  const navigation = useNavigation<any>();
  const [addresss, setAddresss] = useState<IAddress>({
    street: '',
    number: '',
    bairro: '',
    city: '',
  });
  const { location, getGoogleMapsAddress } = useLocationStorage();

  useEffect(() => {
    if (location) {
      getGoogleMapsAddress(location.latitude, location.longitude).then(
        (address) => {
          const parts = address.split(', ');
          const street = parts[0];
          const number = parts[1].split(' - ')[0];
          const bairro = parts[1].split(' - ')[1];
          const city = parts[2].split(', ')[0];
          setAddresss({
            street,
            number,
            bairro,
            city,
          });
        },
      );
    }
  }, [location]);

  console.log('USESTATE', addresss);
  const [currentStep, setCurrentStep] = useState(1);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const totalSteps = 3;

  const categories = [
    'Móveis',
    'Roupas',
    'Eletrônicos',
    'Brinquedos',
    'Livros',
    'Alimentos',
    'Artigos de Higiene Pessoal',
    'Material Escolar',
    'Outros',
  ];

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

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: IFormInput) => {
    console.log('data', data);

    const { itemName, itemCategory, description, usageTime } = data;

    if (currentStep < 3) {
      nextStep();
      return;
    }

    const imageRef = storage().ref(`images/${data.itemName}`);
    await imageRef.putFile(imageUri ?? '');
    const imageUrl = await imageRef.getDownloadURL();

    // if (getStoredLocation()) {
    //   useToast({
    //     message: 'Localização não disponível.',
    //     type: TOASTTYPE.ERROR,
    //   });
    //   return;
    // }

    useToast({ message: 'Doação Cadastrada', type: TOASTTYPE.SUCCESS });

    try {
      await firestore()
        .collection('donations')
        .add({
          donatorId: 'mock-donator-id-123',
          itemName,
          itemCategory,
          usageTime,
          description,
          addresss,
          coordinates: {
            lat: location?.latitude,
            lng: location?.longitude,
          },
          imageUrl,
        });
      reset();
      setImageUri(null);
      useToast({ message: 'Doação Cadastrada', type: TOASTTYPE.SUCCESS });
      navigation.navigate('ItemLIst');
    } catch (error) {
      console.error('Erro ao adicionar doação:', error);
      useToast({ message: 'Tente Novamente', type: TOASTTYPE.ERROR });
    }
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
                    onValueChange={(itemValue) => {
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
                name="itemCategory"
                defaultValue="Móveis"
              />

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <IconTextInput
                    onBlur={onBlur}
                    onChangeText={(value) => {
                      onChange(value);
                    }}
                    value={value}
                    placeholder="Tempo de Uso"
                    icon={<AnchorSimple color="gray" weight="bold" size={24} />}
                  />
                )}
                name="usageTime"
                defaultValue=""
              />

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    multiline
                    height="150"
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
              <StyledButton onPress={nextStep} backgroundColor="blue">
                <ButtonText>Próximo</ButtonText>
              </StyledButton>
            </>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment key="step2">
            <ButtonContainer>
              <StyledButton onPress={prevStep} backgroundColor="white">
                <CaretLeft color="gray" weight="bold" size={32} />
              </StyledButton>
              <ButtonText color="black">Endereço</ButtonText>
            </ButtonContainer>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IconTextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Cidade"
                  icon={<AnchorSimple color="gray" weight="bold" size={24} />}
                />
              )}
              name="city"
              defaultValue={addresss.city}
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IconTextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Bairro"
                  icon={<AnchorSimple color="gray" weight="bold" size={24} />}
                />
              )}
              name="neighborhood"
              defaultValue={addresss.bairro}
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IconTextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Rua"
                  icon={<AnchorSimple color="gray" weight="bold" size={24} />}
                />
              )}
              name="street"
              defaultValue={addresss.street}
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IconTextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Número"
                  icon={<AnchorSimple color="gray" weight="bold" size={24} />}
                />
              )}
              name="number"
              defaultValue={addresss.number}
            />

            <StyledButton onPress={nextStep} backgroundColor="blue">
              <ButtonText>Próximo</ButtonText>
            </StyledButton>
          </React.Fragment>
        );
      case 3:
        return (
          <React.Fragment key="step3">
            <ButtonContainer>
              <StyledButton onPress={prevStep} backgroundColor="white">
                <CaretLeft color="gray" weight="bold" size={32} />
              </StyledButton>
              <ButtonText color="black">Imagem</ButtonText>
            </ButtonContainer>

            {!imageUri && (
              <StyledButton onPress={chooseImage} backgroundColor="blue">
                <ButtonText>Escolher imagem</ButtonText>
              </StyledButton>
            )}

            {imageUri && <ImagePreview source={{ uri: imageUri }} />}

            {loading ? (
              <ActivityIndicator />
            ) : (
              <ButtonContainer>
                <StyledButton
                  onPress={() => {
                    console.log('remove');
                  }}
                  disabled={!imageUri}
                  backgroundColor={!imageUri ? 'white' : 'red'}
                >
                  <ButtonText color={!imageUri ? 'black' : 'white'}>
                    Alterar Imagem
                  </ButtonText>
                </StyledButton>
                <StyledButton
                  onPress={handleSubmit(onSubmit)}
                  disabled={!imageUri}
                  backgroundColor={!imageUri ? 'white' : 'coral'}
                >
                  <ButtonText color={!imageUri ? 'black' : 'white'}>
                    Doar
                  </ButtonText>
                </StyledButton>
              </ButtonContainer>
            )}
          </React.Fragment>
        );
      default:
        return null;
    }
  };

  const renderPagination = () => {
    return (
      <PaginationWrapper>
        {Array.from({ length: totalSteps }, (_, index) => (
          <PaginationDot
            key={index}
            style={
              currentStep === index + 1 ? { backgroundColor: 'blue' } : null
            }
          />
        ))}
      </PaginationWrapper>
    );
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
        <Screen>
          {renderStep()}
          {renderPagination()}
        </Screen>
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

const TextInput = styled.TextInput`
  width: 100%;
  height: ${(props) => props.height || 50}px;
  border: 1px solid black;
  margin-bottom: 16px;
  padding: 20px 15px;
  border-radius: 8px;
  font-size: 16px;
  color: black;
  text-align-vertical: top;
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

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
`;

const StyledButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.backgroundColor || 'red'};
  border-radius: ${(props) => props.borderRadius || 20}px;
  padding: ${(props) => props.padding || 10}px;
  margin: ${(props) => props.margin || 10}px;
`;

const ButtonText = styled.Text`
  font-size: 24px;
  color: ${(props) => props.color || 'white'};
  text-align: center;
`;

const PaginationWrapper = styled.View`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  align-self: center;
`;

const PaginationDot = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: gray;
  margin-horizontal: 8px;
`;
