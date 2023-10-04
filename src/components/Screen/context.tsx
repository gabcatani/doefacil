import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent
} from 'react-native'

import Nullable from '#types/Nullable'

import { IScreenContextData, IScreenProviderProps } from './types'

const ScreenContext = createContext({} as IScreenContextData)

export const ScreenProvider: React.FC<IScreenProviderProps> = ({
  children,
  ...screen
}) => {
  const [instersectionPoint, setInstersectionPoint] =
    useState<Nullable<number>>(null)
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false)
  const [refreshing, setRefreshing] = React.useState(false)

  const handleIntersectionPointChanged = (y: number) => {
    setInstersectionPoint(y)
  }

  const onBottom = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
    action: VoidFunction
  ) => {
    const {
      nativeEvent: { contentSize, contentOffset, layoutMeasurement }
    } = event
    const distToBottom =
      contentSize.height - contentOffset.y - layoutMeasurement.height

    if (distToBottom < 30) {
      action()
    }
  }

  const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout))
  }

  const onRefresh = React.useCallback((action: () => void) => {
    setRefreshing(true)
    action()
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const checkIntersection = useCallback(
    ({ layoutMeasurement, contentOffset }: NativeScrollEvent) => {
      return (
        layoutMeasurement.height + contentOffset.y >= (instersectionPoint ?? 0)
      )
    },
    [instersectionPoint]
  )

  const handleScrollEvent = (event: NativeScrollEvent) => {
    setIsIntersecting(checkIntersection(event))
  }

  useEffect(() => {
    const windowHeight = Dimensions.get('window').height
    !!instersectionPoint && setIsIntersecting(instersectionPoint < windowHeight)
  }, [instersectionPoint])

  const value: IScreenContextData = {
    ...screen,
    onIntersectionPointChanged: handleIntersectionPointChanged,
    onScroll: handleScrollEvent,
    instersectionPoint,
    isIntersecting,
    checkConnection: screen.checkConnection ?? true,
    refreshing,
    onRefresh,
    onBottom
  }
  return (
    <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>
  )
}

export const useScreen = (): IScreenContextData => {
  const context = useContext(ScreenContext)

  if (!context)
    throw new Error('useScreen must be used within a ScreenProvider')

  return context
}
