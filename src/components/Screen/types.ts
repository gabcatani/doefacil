import React, { RefObject } from 'react'
import { NativeSyntheticEvent, StatusBarStyle } from 'react-native'
import { NativeScrollEvent } from 'react-native'
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps
} from 'react-native-keyboard-aware-scroll-view'

import Nullable from '#types/Nullable'
import { NextSeoProps } from 'next-seo'
import { PaddingProps, FlexboxProps } from 'styled-system'

interface SEOProps extends NextSeoProps {
  path?: string
  title?: string
}

interface IScreenProps {
  seo?: SEOProps
  title?: string
  ContentProps?: PaddingProps & FlexboxProps
  ScrollViewProps?: KeyboardAwareScrollViewProps
  backgroundColor?: string
  extraScroll?: number
  noScroll?: boolean
  Footer?: React.ReactElement
  Header?: React.ReactElement
  maxContentWidth?: string
  scrollViewRef?: RefObject<KeyboardAwareScrollView>
  bgStatusBar?: string
  bgStatusBarStyle?: StatusBarStyle
  noScrollContentPadding?: string | number
  checkConnection?: boolean
  refreshControlEnable?: boolean
  onRefreshScrollView?: () => void
  onEndReached?: VoidFunction
  wrapSafeArea?: boolean
  titleWeb?: string
  safeAreaBackgroundColor?: string
  notifyOnScroll?: boolean
}

interface IScreenContextData extends IScreenProps {
  onIntersectionPointChanged: (y: number) => void
  onScroll: (event: NativeScrollEvent) => void
  instersectionPoint: Nullable<number>
  isIntersecting: boolean
  checkConnection: boolean
  refreshing: boolean
  onRefresh: (action: () => void) => void
  onBottom: (
    event: NativeSyntheticEvent<NativeScrollEvent>,
    action: VoidFunction
  ) => void
}

interface IScreenProviderProps extends IScreenProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any
}

interface IWrapperProps {
  flex: number
  backgroundColor?: string
  isSafeArea: boolean
}

export type {
  IScreenProps,
  IScreenContextData,
  IScreenProviderProps,
  IWrapperProps
}
