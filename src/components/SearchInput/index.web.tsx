import React from 'react'
import { ActivityIndicator, TextInput } from 'react-native'

import { translate } from '#utils'
import { useTheme } from 'styled-components/native'

import Container from '../Container'
import IconButton from '../IconButton'
import Styles from './styles'
import ISearchInputProps from './types'

const SearchInput: React.ForwardRefRenderFunction<
  TextInput,
  ISearchInputProps
> = (
  {
    value,
    onChangeText,
    ContainerProps,
    SearchButtonProps,
    placeholder,
    testID,
    accessibilityLabel,
    loading,
    canClear = true,
    ...props
  },
  ref
) => {
  const theme = useTheme()

  return (
    <Container
      flexDirection="row"
      position="relative"
      alignItems="center"
      {...ContainerProps}
    >
      <Styles.Input
        {...props}
        hasValue={!!value}
        accessibilityRole="text"
        accessibilityLabel={accessibilityLabel}
        testID={testID}
        placeholderTextColor={theme.colors.gray[600]}
        value={value}
        onChangeText={text => onChangeText && onChangeText(text)}
        placeholder={!placeholder ? undefined : translate(placeholder)}
        loading={loading}
        autoCompleteType="off"
        autoCorrect={false}
        fontWeight="400"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
      />
      {loading && (
        <Container position="absolute" right="30px" top="15px" zIndex={1}>
          <ActivityIndicator
            size="small"
            color={theme.colors.client.primary.backgroundColor}
            accessibilityLabel="searchLoading"
            testID="searchLoading"
          />
        </Container>
      )}
      {!!value && canClear && (
        <Container position="absolute" right="70px" zIndex={1}>
          <IconButton
            iconName="xmark"
            iconSize={16}
            onPress={() => onChangeText && onChangeText('')}
            accessibilityLabel={`${accessibilityLabel}-clear`}
            testID={`${testID}-clear`}
            iconColor={theme.colors.gray['600']}
          />
        </Container>
      )}
      <IconButton
        {...SearchButtonProps}
        position="absolute"
        testID="searchButton"
        alignItems="center"
        justifyContent="center"
        accessibilityLabel="searchButton"
        right="0"
        height="50px"
        width="60px"
        iconName="search"
        borderTopRightRadius="12px"
        borderBottomRightRadius="12px"
      />
    </Container>
  )
}

export default React.forwardRef(SearchInput)
