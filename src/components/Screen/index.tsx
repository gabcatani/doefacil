import React from 'react'
import { Platform, RefreshControl } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { useConnection } from '#contexts/connection'
import { Emitter, translate } from '#utils'
import { useTheme } from 'styled-components/native'

import { CustomStatusBar, Visibility } from '#cmp'

import Container from '../Container'
import NoConnection from '../NoConnection'
import Separator from '../Separator'
import Text from '../Text'
import Wrapper from './components/Wrapper'
import { ScreenProvider, useScreen } from './context'
import { IScreenProps, IScreenProviderProps } from './types'

const Screen: React.FC<IScreenProps> = ({
  title,
  ScrollViewProps,
  backgroundColor,
  safeAreaBackgroundColor,
  noScroll = false,
  Footer,
  children,
  scrollViewRef,
  bgStatusBar,
  extraScroll,
  noScrollContentPadding = '20px',
  refreshControlEnable = false,
  onEndReached,
  notifyOnScroll,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  wrapSafeArea = true,
  onRefreshScrollView = () => {}
}) => {
  const theme = useTheme()
  const { isOnline } = useConnection()
  const {
    onScroll,
    instersectionPoint,
    checkConnection,
    refreshing,
    onRefresh,
    onBottom
  } = useScreen()

  if (!isOnline && checkConnection) return <NoConnection />

  return (
    <Wrapper
      flex={1}
      backgroundColor={safeAreaBackgroundColor ?? backgroundColor}
      isSafeArea={wrapSafeArea}
    >
      <CustomStatusBar
        backgroundColor={
          Platform.OS === 'ios'
            ? bgStatusBar ?? theme.colors.white
            : bgStatusBar ?? backgroundColor
        }
      />
      {!!title && (
        <Container
          px="20px"
          backgroundColor={theme.components.screen.backgroundColor}
        >
          <Text fontSize="3xl" fontWeight="600">
            {translate(title)}
          </Text>

          <Separator mt="20px" />
        </Container>
      )}

      <Visibility.Root>
        <Visibility.Case condition={noScroll}>
          <Container p={noScrollContentPadding} flex={1}>
            {children}
          </Container>
        </Visibility.Case>
        <Visibility.Default>
          <KeyboardAwareScrollView
            ref={scrollViewRef}
            extraScrollHeight={extraScroll}
            enableOnAndroid={extraScroll ? true : undefined}
            enableAutomaticScroll={extraScroll ? true : undefined}
            keyboardShouldPersistTaps="handled"
            onMomentumScrollEnd={e => onEndReached && onBottom(e, onEndReached)}
            refreshControl={
              refreshControlEnable ? (
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() =>
                    onRefresh(() => {
                      onRefreshScrollView && onRefreshScrollView()
                    })
                  }
                />
              ) : undefined
            }
            contentContainerStyle={{
              padding: 20,
              ...(ScrollViewProps?.contentContainerStyle as object)
            }}
            {...ScrollViewProps}
            onScroll={({ nativeEvent }) => {
              if (instersectionPoint) {
                onScroll(nativeEvent)
              }
              if (notifyOnScroll) {
                Emitter.emit('onScroll')
              }
            }}
          >
            {children}
          </KeyboardAwareScrollView>
        </Visibility.Default>
      </Visibility.Root>
      {Footer && Footer}
    </Wrapper>
  )
}

// TODO: rever isso aqui
const ScreenComponent = ({ ...props }: IScreenProviderProps): JSX.Element => {
  return (
    <ScreenProvider>
      <Screen {...props} />
    </ScreenProvider>
  )
}

export default ScreenComponent
