import React, { useEffect, useRef } from 'react'
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar'

import { BasicConfigs } from '#graphql/server'
import { Router } from 'next/router'
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native'

import { configTheme } from './configTheme'
import { parseColors } from './tokens/colors'
import { parseComponents } from './tokens/components'
import { parseScreens } from './tokens/screens'

type IThemeProviderProps = {
  ssConfigs: BasicConfigs
}

export const ThemeProvider: React.FC<IThemeProviderProps> = ({
  children,
  ssConfigs
}) => {
  const loadingRef = useRef<LoadingBarRef>(null)

  const clientColors =
    ssConfigs?.configuration?.consumerApp?.assets?.web?.colors

  const colors = parseColors(clientColors)

  const components = parseComponents({
    compositionComponents: clientColors?.composition.components,
    colors
  })

  const screens = parseScreens(colors)

  const theme = configTheme({ colors, components, screens })

  const _startLoading = () => {
    loadingRef.current?.continuousStart()
  }
  const _completeLoading = () => {
    loadingRef.current?.complete()
  }
  useEffect(() => {
    Router.events.on('routeChangeStart', _startLoading)
    Router.events.on('routeChangeComplete', _completeLoading)
    Router.events.on('routeChangeError', _completeLoading)

    return () => {
      Router.events.off('routeChangeStart', _startLoading)
      Router.events.off('routeChangeComplete', _completeLoading)
      Router.events.off('routeChangeError', _completeLoading)
    }
  }, [])

  return (
    <StyledThemeProvider theme={theme}>
      {/* //TODO: Não é responsabilidade do tema fazer isso, mover para um local mais adequado */}
      <LoadingBar
        color={theme.colors.client.secondary.backgroundColor}
        ref={loadingRef}
        shadow
        height={4}
      />

      {children}
    </StyledThemeProvider>
  )
}
