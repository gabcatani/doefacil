import { ReactNode, RefObject } from 'react'
import { StatusBarStyle } from 'react-native'
import Swiper, { SwiperProps as SwiperLibProps } from 'react-native-web-swiper'

import { Tutorial_tutorial } from '#graphql/server/__generatedTypes__/Tutorial'

interface IStep extends Omit<Tutorial_tutorial, '__typename'> {
  addInContent: ReactNode
}
interface ISwiperProviderProps {
  loading: boolean
  steps: IStep[]
  nextButton: boolean
  skipAllButton: boolean
  swiperRef: RefObject<Swiper>
}

interface ISwiperContextData {
  loading: boolean
  steps: IStep[]
  totalSteps: number
  swiperRef: RefObject<Swiper>
  nextButton: boolean
  skipAllButton: boolean
  goToNext: () => void
  goToLast: () => void
}

interface ISwiperProps extends SwiperLibProps, React.Component {
  statusBarStyle?: StatusBarStyle
}

interface ISwiperComponentProps extends SwiperLibProps {
  steps: IStep[]
  loading: boolean
  nextButton?: boolean
  skipAllButton?: boolean
  statusBarStyle?: StatusBarStyle
}

export type {
  IStep,
  ISwiperProviderProps,
  ISwiperContextData,
  ISwiperProps,
  ISwiperComponentProps
}
