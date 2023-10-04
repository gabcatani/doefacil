import React, { createContext, useContext, useRef, useState } from 'react'
import { Animated, Easing } from 'react-native'

import { ICollapseProps, ICollapseContextData } from './types'

const CollapseContext = createContext({} as ICollapseContextData)

export const CollapseProvider: React.FC<ICollapseProps> = ({
  children,
  title,
  hasIcon = true,
  isInitialOpen = false,
  contentLocation = 'bottom',
  closeTitle,
  accessibilityLabel,
  testID
}) => {
  const [isOpen, setIsOpen] = useState(isInitialOpen)
  const collapseTitle = closeTitle && isOpen ? closeTitle : title

  const spinValue = useRef(new Animated.Value(isOpen ? 1 : 0)).current
  const heightValue = useRef(new Animated.Value(isOpen ? 1 : 0)).current
  const [displayValue, setDisplayValue] = useState<'flex' | 'none'>(
    isOpen ? 'flex' : 'none'
  )

  const iconSpinAnimation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  })

  const heightAnimation = heightValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  })

  const toggleCollapse = () => {
    setIsOpen(!isOpen)

    Animated.timing(spinValue, {
      toValue: isOpen ? 0 : 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true
    }).start()

    if (!isOpen) setDisplayValue('flex')

    Animated.timing(heightValue, {
      toValue: isOpen ? 0 : 1,
      duration: 400,
      delay: 0,
      useNativeDriver: false
    }).start(() => {
      if (isOpen) setDisplayValue('none')
    })
  }

  return (
    <CollapseContext.Provider
      value={{
        toggleCollapse,
        iconSpinAnimation,
        heightAnimation,
        displayValue,
        hasIcon,
        title: collapseTitle,
        contentLocation,
        accessibilityLabel,
        testID
      }}
    >
      {children}
    </CollapseContext.Provider>
  )
}

export const useCollapse = () => {
  const context = useContext(CollapseContext)

  if (!context)
    throw new Error('useProduct must be used within a ProductProvider')

  return context
}
