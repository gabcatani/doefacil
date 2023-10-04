import React from 'react'
import { Controller } from 'react-hook-form'

import { useTheme } from 'styled-components/native'

import { Container, Text } from '#cmp'

import Styles from './styles'
import { IItems, ISelectProps } from './types'

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

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value, ref: fieldRef },
        fieldState: { error }
      }) => (
        <Container {...ContainerProps} mb={'20px'}>
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
            borderRadius={'16px'}
            borderColor={
              error ? theme.input.borderErrorColor : theme.input.borderColor
            }
            py="8px"
          >
            <Styles.Select
              onValueChange={onChange}
              ref={fieldRef}
              selectedValue={value}
              disabled={disabled}
              hasError={!!error}
            >
              {items.map((item: IItems) => {
                return (
                  <Styles.Select.Item
                    key={item.value}
                    value={item.value.toString()}
                    label={item.label}
                  />
                )
              })}
            </Styles.Select>
          </Container>
          <Container
            flexDirection={'row'}
            justifyContent={'space-between'}
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
