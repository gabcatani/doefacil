import React from 'react'

import { translate } from '#utils'

import Container from '#cmp/Container'
import IconButton from '#cmp/IconButton'
import Input from '#cmp/Input'
import Select from '#cmp/Select'
import Text from '#cmp/Text'

import Shimmer from './components/Shimmer'
import { AddressFormProvider, useAddressForm } from './context'
import { IAddressFormProps } from './types'

const AddressFormScreen: React.FC = () => {
  const {
    form: {
      control,
      formState: { errors },
      getValues
    },
    show,
    onNext,
    postalCodeRef,
    onPostalCodeChange,
    isPostalCodeLoading,
    cityNameRef,
    cityNameIsEnabled,
    neighborhoodRef,
    states,
    citiesParser,
    streetRef,
    numberRef,
    complementRef,
    isHomeActive,
    onHomePress,
    isOtherActive,
    onOtherPress,
    isWorkActive,
    onWorkPress,
    fetched
  } = useAddressForm()

  if (!show) return null

  return (
    <>
      <Text fontSize="3xl" fontWeight="600">
        screen.address_form.address
      </Text>
      <Text pb={'24px'}>
        screen.register.natural_person_validation.description
      </Text>
      <Shimmer fetched={fetched}>
        <Container>
          <Input
            name="postalCode"
            mask="CEP"
            control={control}
            ref={postalCodeRef}
            returnKeyType="next"
            label="screen.address_form.postal_code"
            keyboardType="number-pad"
            onChangeText={onPostalCodeChange}
            onSubmitEditing={onNext(cityNameRef)}
            loading={isPostalCodeLoading}
            testID={translate(
              `accessibility.component.address_form.postal_code`
            )}
            accessibilityLabel={translate(
              `accessibility.component.address_form.postal_code`
            )}
            canClear
            blurOnSubmit={false}
          />

          {cityNameIsEnabled ? (
            <Input
              name="cityName"
              control={control}
              label="screen.address_form.city"
              ref={cityNameRef}
              returnKeyType="next"
              onSubmitEditing={onNext(neighborhoodRef)}
              testID={translate(
                `accessibility.component.address_form.city_name`
              )}
              accessibilityLabel={translate(
                `accessibility.component.address_form.city_name`
              )}
              canClear
              editable={false}
            />
          ) : (
            <Container flexDirection={'row'}>
              <Select
                name="state"
                label="screen.address_form.state"
                control={control}
                items={states}
                inputTestID={translate(
                  `accessibility.component.address_form.state_name`
                )}
                inputAccessibilityLabel={translate(
                  `accessibility.component.address_form.state_name`
                )}
                ContainerProps={{
                  flex: 1,
                  marginRight: '8px'
                }}
              />
              <Select
                name="cityId"
                label="screen.address_form.city"
                control={control}
                items={citiesParser}
                inputTestID={translate(
                  `accessibility.component.address_form.city_name`
                )}
                inputAccessibilityLabel={translate(
                  `accessibility.component.address_form.city_name`
                )}
                disabled={!getValues('federativeUnit')}
                ContainerProps={{
                  flex: 2
                }}
              />
            </Container>
          )}

          <Input
            name="neighborhood"
            control={control}
            label="screen.address_form.neighborhood"
            ref={neighborhoodRef}
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={onNext(streetRef)}
            testID={translate(
              `accessibility.component.address_form.neighborhood`
            )}
            accessibilityLabel={translate(
              `accessibility.component.address_form.neighborhood`
            )}
            canClear
          />

          <Container flexDirection="row">
            <Input
              name="street"
              control={control}
              label="screen.address_form.street"
              ContainerProps={{ flex: 1, mr: '10px' }}
              ref={streetRef}
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={onNext(numberRef)}
              testID={translate(
                `accessibility.component.address_form.street_name`
              )}
              accessibilityLabel={translate(
                `accessibility.component.address_form.street_name`
              )}
              canClear
            />

            <Container width="80px">
              <Input
                name="number"
                control={control}
                label="screen.address_form.number"
                ContainerProps={{ flexBasis: '80px', mb: '0px' }}
                ref={numberRef}
                returnKeyType="next"
                onSubmitEditing={onNext(complementRef)}
                testID={translate(
                  `accessibility.component.address_form.address_number`
                )}
                accessibilityLabel={translate(
                  `accessibility.component.address_form.address_number`
                )}
                mask="NO_SPECIAL_CHARACTERS"
                ErrorContainerProps={{ ml: '-40px' }}
              />
            </Container>
          </Container>

          <Input
            name="complement"
            control={control}
            label="screen.address_form.complement"
            ref={complementRef}
            returnKeyType="done"
            testID={translate(
              `accessibility.component.address_form.address_complement`
            )}
            accessibilityLabel={translate(
              `accessibility.component.address_form.address_complement`
            )}
            canClear
          />

          <Container mb="20px">
            <Text fontSize="md" fontWeight="600" mb="5px">
              screen.address_form.address_type
            </Text>
            <Container
              flexDirection="row"
              justifyContent="space-between"
              flexWrap="wrap"
              pb={'16px'}
            >
              <IconButton
                variant="form"
                iconName="home"
                label="screen.address_form.home"
                testID={translate(
                  `accessibility.component.address_form.icon_button.home`
                )}
                accessibilityLabel={translate(
                  `accessibility.component.address_form.icon_button.home`
                )}
                active={isHomeActive}
                onPress={onHomePress}
              />
              <IconButton
                variant="form"
                iconName="briefcase"
                label="screen.address_form.work"
                testID={translate(
                  `accessibility.component.address_form.icon_button.work`
                )}
                accessibilityLabel={translate(
                  `accessibility.component.address_form.icon_button.work`
                )}
                active={isWorkActive}
                onPress={onWorkPress}
              />
              <IconButton
                variant="form"
                label="screen.address_form.other"
                testID={translate(
                  `accessibility.component.address_form.icon_button.other`
                )}
                accessibilityLabel={translate(
                  `accessibility.component.address_form.icon_button.other`
                )}
                active={isOtherActive}
                onPress={onOtherPress}
              />
            </Container>
          </Container>
          {errors && errors.type && (
            <Text
              fontSize="sm"
              fontWeight="500"
              color="error"
              textAlign="left"
              mt="-15px"
              mb="20px"
            >
              {errors.type.message}
            </Text>
          )}
        </Container>
      </Shimmer>
    </>
  )
}

const AddressForm: React.FC<IAddressFormProps> = props => {
  return (
    <AddressFormProvider {...props}>
      <AddressFormScreen />
    </AddressFormProvider>
  )
}

export default AddressForm
export * from './types'
