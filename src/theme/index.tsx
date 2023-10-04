import React from 'react'

import { useApp } from '#contexts/app/index'
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native'

import { configTheme } from './configTheme'
import { parseColors } from './tokens/colors'
import { parseComponents } from './tokens/components'
import { parseScreens } from './tokens/screens'

export const ThemeProvider: React.FC = ({ children }) => {
  const { configuration } = useApp()

  const clientColors = configuration?.consumerApp?.assets?.app?.colors

  const colors = parseColors(clientColors)

  const components = parseComponents({
    compositionComponents: clientColors?.composition.components,
    colors
  })

  const screens = parseScreens(colors)

  const theme = configTheme({ colors, components, screens })

  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
}
