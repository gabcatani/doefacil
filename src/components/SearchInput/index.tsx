import React, { useEffect } from 'react'
import { ActivityIndicator, Platform, TextInput } from 'react-native'

import { translate } from '#utils'
import { useTheme } from 'styled-components/native'

import AwesomeIcon from '#cmp/AwesomeIcon'

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
    placeholder,
    testID,
    accessibilityLabel,
    loading,
    canClear = true,
    children,
    ...props
  },
  ref
) => {
  const theme = useTheme()

  useEffect(() => {
    if (Platform.OS !== 'android' || !props.autoFocus) return

    // @ts-ignore
    setTimeout(() => ref?.current?.focus(), 500)
  }, [])

  return (
    <Container
      flexDirection="row"
      position="relative"
      alignItems="center"
      {...ContainerProps}
    >
      <Container position="absolute" left="10px" zIndex={1}>
        <AwesomeIcon icon="search" color={theme.colors.gray['500']} size={20} />
      </Container>

      <Styles.Input
        {...props}
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
      <Container
        position="absolute"
        width={!value ? undefined : '0px'}
        overflow="hidden"
        right="10px"
        zIndex={1}
        flexDirection="row"
        alignItems="center"
      >
        {children}
      </Container>
      {!!value && canClear && (
        <Container position="absolute" right="10px" zIndex={1}>
          <IconButton
            iconName="xmark"
            iconSize={16}
            onPress={() => onChangeText && onChangeText('')}
            accessibilityLabel={`${accessibilityLabel}-clear`}
            testID={`${testID}-clear`}
          />
        </Container>
      )}
    </Container>
  )
}

export default React.forwardRef(SearchInput)
