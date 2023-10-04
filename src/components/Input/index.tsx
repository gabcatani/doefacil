import React, { forwardRef, Fragment } from 'react'
import { Controller } from 'react-hook-form'
import { ActivityIndicator, Platform, TextInput } from 'react-native'

import { translate } from '#utils'
import * as masks from '#utils/masks'
import { useTheme } from 'styled-components/native'

import { Visibility } from '#cmp'

import Container from '../Container'
import IconButton from '../IconButton'
import Text from '../Text'
import Styles from './styles'
import { IInputProps, InputRef } from './types'

const Input: React.ForwardRefRenderFunction<TextInput, IInputProps> = (
  {
    label,
    ContainerProps,
    SuffixComponent,
    AfterComponent,
    name,
    control,
    showError = true,
    loading,
    testID,
    accessibilityLabel,
    mask,
    isUppercase = false,
    onChangeText,
    bottomSheet,
    canClear,
    removeAccents,
    ErrorContainerProps,
    required,
    characterCount = false,
    maxLength,
    ...props
  },
  ref
) => {
  const theme = useTheme()

  const inputAccessibilityLabel = accessibilityLabel || name
  const inputTestID = testID || name

  const _label = translate(label)

  const _labelClean = _label
    ? required
      ? _label.replace(/:|\*/g, '')
      : _label.replace(/:/g, '')
    : ''

  const handleOnChangeText = (
    value: string,
    onChange: (...event: string[]) => void
  ) => {
    let newValue = value

    switch (mask) {
      case 'CPF_CNPJ':
        newValue = masks.username(value, false)
        break
      case 'CNPJ':
        newValue = masks.cnpj(value)
        break
      case 'CPF':
        newValue = masks.cpf(value)
        break
      case 'CURRENCY': {
        let onlyNum = Number(masks.onlyNumbers(value))
        onlyNum /= 100
        newValue = masks.currency(onlyNum)
        break
      }
      case 'CEP':
        newValue = masks.cep(value)
        break
      case 'CREDIT_CARD':
        newValue = masks.creditCard(value)
        break
      case 'EXPIRATION_DATE':
        newValue = masks.expirationDate(value)
        break
      case 'DATE':
        newValue = masks.date(value)
        break
      case 'PHONE':
        newValue = masks.phone(value)
        break
      case 'USERNAME':
        newValue = masks.username(value)
        break
      case 'NO_SPECIAL_CHARACTERS':
        newValue = masks.noSpecialCharacters(value)
        break
      case 'ONLY_NUMBERS':
        value !== '' ? (newValue = masks.onlyNumbers(value)) : value
        break
    }

    if (Platform.OS !== 'android') {
      if (isUppercase) newValue = newValue.toUpperCase()
      if (removeAccents)
        newValue = newValue
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/\d/g, '')
    }

    onChange(newValue)
    if (onChangeText) onChangeText(newValue)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value, onBlur, ref: fieldRef },
        fieldState: { error }
      }) => (
        <Container mb="20px" {...ContainerProps}>
          <Visibility.Root>
            <Visibility.Case condition={!!_labelClean}>
              <Text
                color={props.editable === false ? 'gray.500' : 'gray.800'}
                fontWeight="600"
                mb="5px"
                accessibilityLabel={`${inputAccessibilityLabel}Label`}
                testID={`${inputTestID}Label`}
                raw
              >
                {required ? `${_labelClean}*:` : `${_labelClean}:`}
              </Text>
            </Visibility.Case>
          </Visibility.Root>
          <Container flexDirection="row" position="relative">
            {bottomSheet && (
              <Styles.BottomSheetInput
                {...props}
                value={value}
                onBlur={onBlur}
                onChangeText={text => handleOnChangeText(text, onChange)}
                ref={ref ?? (fieldRef as InputRef)}
                accessibilityRole="text"
                accessibilityLabel={inputAccessibilityLabel}
                testID={inputTestID}
                disabled={props.editable === false ? true : false}
                hasError={!!error && !!error.message}
                textAlignVertical={props.multiline ? 'top' : undefined}
                fontWeight="400"
              />
            )}
            {!bottomSheet && (
              <Styles.Input
                {...props}
                placeholderTextColor={theme.colors.gray[400]}
                value={value}
                onBlur={onBlur}
                onChangeText={text => handleOnChangeText(text, onChange)}
                ref={ref ?? (fieldRef as InputRef)}
                disabled={props.editable === false ? true : false}
                accessibilityRole="text"
                accessibilityLabel={inputAccessibilityLabel}
                testID={inputTestID}
                hasError={!!error && !!error.message}
                textAlignVertical={props.multiline ? 'top' : undefined}
                pr={canClear ?? SuffixComponent ?? loading ? '36px' : '16px'}
                fontWeight="400"
              />
            )}
            {loading && (
              <Container
                position="absolute"
                right="15px"
                justifyContent="center"
                height="100%"
              >
                <ActivityIndicator
                  size="small"
                  color={theme.colors.client.primary.backgroundColor}
                  accessibilityLabel={`${inputAccessibilityLabel}Loading`}
                  testID={`${inputTestID}Loading`}
                />
              </Container>
            )}
            {SuffixComponent && !loading && (
              <Container
                position="absolute"
                right="5px"
                justifyContent="center"
                height="100%"
              >
                <SuffixComponent />
              </Container>
            )}
            {canClear &&
              !SuffixComponent &&
              !loading &&
              props.editable != false &&
              !!value && (
                <Container
                  position="absolute"
                  right="15px"
                  justifyContent="center"
                  height="100%"
                >
                  <IconButton
                    iconName="xmark"
                    iconSize={16}
                    color={theme.screens.register.clear_button_icon_color}
                    onPress={() => handleOnChangeText('', onChange)}
                    accessibilityLabel={`${accessibilityLabel}-clear`}
                    testID={`${testID}-clear`}
                  />
                </Container>
              )}
          </Container>
          <Container
            flexDirection="row"
            justifyContent="space-between"
            mt="5px"
          >
            <Container flexShrink={1} {...ErrorContainerProps}>
              {showError && error ? (
                <Text
                  fontSize="sm"
                  fontWeight="500"
                  color="error"
                  accessibilityLabel={`${inputAccessibilityLabel}Error`}
                  testID={`${inputTestID}Error`}
                >
                  {error.message}
                </Text>
              ) : (
                <></>
              )}
            </Container>
            {AfterComponent && <AfterComponent />}
            <Visibility.Root>
              <Visibility.Case condition={characterCount}>
                <Text textAlign="right" raw>
                  {translate('component.input.charactersCount', {
                    quantity: value?.length,
                    maxQuantity: maxLength
                  })}
                </Text>
              </Visibility.Case>
            </Visibility.Root>
          </Container>
        </Container>
      )}
    />
  )
}

export default forwardRef(Input)
