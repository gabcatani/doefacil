import React from 'react'
import { Controller } from 'react-hook-form'
import { TextStyle } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

import { useTheme } from 'styled-components/native'

import AwesomeIcon from '#cmp/AwesomeIcon'

import Container from '../Container'
import Text from '../Text'
import { ISelectProps } from './types'

const Select = ({
  label,
  inputAccessibilityLabel,
  inputTestID,
  control,
  name,
  ContainerProps,
  items,
  disabled = false
}: ISelectProps) => {
  const theme = useTheme()
  const inputStyles: TextStyle = {
    height: 35,
    marginLeft: 5,
    borderWidth: 0,
    marginRight: 32,
    fontSize: 12,
    borderRadius: 8,
    color: disabled ? theme.colors.gray['400'] : theme.colors.gray['800']
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value, ref: fieldRef },
        fieldState: { error }
      }) => (
        <Container {...ContainerProps} mb="20px">
          <Text
            color={disabled ? 'gray.500' : 'gray.800'}
            fontWeight="600"
            mb="5px"
            accessibilityLabel={`${inputAccessibilityLabel}Label`}
            testID={`${inputTestID}Label`}
          >
            {label}
          </Text>
          <Container
            borderWidth="1px"
            borderRadius="16px"
            borderColor={
              error ? theme.input.borderErrorColor : theme.input.borderColor
            }
            py="8px"
          >
            <RNPickerSelect
              ref={fieldRef}
              disabled={disabled}
              value={value as string}
              items={items}
              onValueChange={onChange}
              placeholder={{ label: '' }}
              useNativeAndroidPickerStyle={false}
              style={{
                inputAndroid: inputStyles,
                inputIOS: inputStyles
              }}
              Icon={
                disabled
                  ? () => <></>
                  : () => (
                      <Container pr="8px" pt="8px">
                        <AwesomeIcon icon="chevron-down" size={16} />
                      </Container>
                    )
              }
            />
          </Container>
          <Container
            flexDirection="row"
            justifyContent="space-between"
            mt="5px"
          >
            <Container flexShrink={1}>
              {error ? (
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
          </Container>
        </Container>
      )}
    />
  )
}

export default Select
