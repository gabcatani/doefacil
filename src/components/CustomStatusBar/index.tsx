import React from 'react'
import { StatusBar } from 'react-native'

import Color from 'color'
import { useTheme } from 'styled-components/native'

import { CustomStatusBarProps } from './types'

const CustomStatusBar: React.FC<CustomStatusBarProps> = ({
  backgroundColor
}) => {
  const theme = useTheme()
  const statusBarColor =
    backgroundColor ?? theme.colors.client.primary.backgroundColor

  const color = Color(statusBarColor)

  return (
    <StatusBar
      backgroundColor={statusBarColor}
      barStyle={color.isLight() ? 'dark-content' : 'light-content'}
      animated
    />
  )
}

export default CustomStatusBar
