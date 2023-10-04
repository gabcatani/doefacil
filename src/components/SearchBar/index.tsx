import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import useRouter from '#nav/utils/useRouter'
import { translate } from '#utils'
import { useTheme } from 'styled-components/native'

import BarcodeButton from '#cmp/BarcodeButton'
import VoiceRecognizer from '#cmp/VoiceRecognizer'

import Button from '../Button'
import Container from '../Container'
import IconButton from '../IconButton'
import SearchInput from '../SearchInput'
import Visibility from '../Visibility'
import Filter from './components/Filter'
import RecentSearches from './components/RecentSearches'
import { SearchBarProvider, useSearchBar } from './context'
import { ISearchBarProps } from './types'

const SearchBarComponent = () => {
  const {
    search,
    isInputFocused,
    onToggleInputFocused,
    onChangeSearch,
    onSubmitSearch,
    onCancel,
    recentSearches,
    inputRef,
    style,
    autoFocus,
    asHeader = true,
    showBarcode
  } = useSearchBar()
  const { colors } = useTheme()
  const router = useRouter()
  const { top } = useSafeAreaInsets()

  return (
    <Container
      pt={asHeader ? top : undefined}
      bg={!style ? 'white' : colors.client[style].backgroundColor}
    >
      <Container flexDirection="row" alignItems="center" p={2}>
        <Visibility.Root>
          <Visibility.Case condition={!isInputFocused || Boolean(autoFocus)}>
            <IconButton
              iconName="arrow-left"
              iconSize={20}
              iconColor={!style ? colors.gray[500] : colors.client[style].color}
              mr={3}
              onPress={() => router.back()}
              testID="back"
              accessibilityLabel="back"
            />
          </Visibility.Case>
        </Visibility.Root>
        <SearchInput
          ref={inputRef}
          bg="white"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          value={search}
          placeholder={translate('screen.search.search_placeholder')}
          onChangeText={val => {
            onChangeSearch(val)
          }}
          ContainerProps={{ flex: 1 }}
          testID="search"
          accessibilityLabel="search"
          onSubmitEditing={() => onSubmitSearch()}
          onFocus={() => onToggleInputFocused(true)}
          onBlur={() => onToggleInputFocused(false)}
          canClear={isInputFocused}
          autoCapitalize="none"
        >
          <VoiceRecognizer onRecognitionEnd={val => onSubmitSearch(val)} />
          <Visibility.Root>
            <Visibility.Case condition={Boolean(showBarcode)}>
              <Container ml="4px">
                <BarcodeButton />
              </Container>
            </Visibility.Case>
          </Visibility.Root>
        </SearchInput>
        <Visibility.Root>
          <Visibility.Case condition={!isInputFocused && !autoFocus}>
            <Filter />
          </Visibility.Case>
          <Visibility.Case condition={Boolean(autoFocus)}>
            <></>
          </Visibility.Case>
          <Visibility.Default>
            <Button
              testID=""
              accessibilityLabel=""
              px="8px"
              variant="default"
              size="xs"
              onPress={onCancel}
              color={!style ? undefined : colors.client[style].color}
            >
              component.button.cancel
            </Button>
          </Visibility.Default>
        </Visibility.Root>
      </Container>
      <Visibility.Root>
        <Visibility.Case
          condition={isInputFocused && recentSearches.length > 0}
        >
          <RecentSearches />
        </Visibility.Case>
      </Visibility.Root>
    </Container>
  )
}

const SearchBar = ({ ...props }: ISearchBarProps) => {
  return (
    <SearchBarProvider {...props}>
      <SearchBarComponent />
    </SearchBarProvider>
  )
}

export default SearchBar
