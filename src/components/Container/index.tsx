import React, { useMemo } from 'react'

import { useColorScheme } from '#hooks/ui/theme/useColorScheme'

import Styles from './styles'
import { IContainerProps } from './types'

const Container = ({
  colorScheme,
  schemeMode,
  reverseScheme,
  compositeColorScheme,
  children,
  ...rest
}: IContainerProps) => {
  const { composeClientColors } = useColorScheme()

  const compositeClientColors = useMemo(() => {
    return composeClientColors({
      colorScheme,
      compositeColorScheme,
      reverseScheme,
      schemeMode
    })
  }, [colorScheme, schemeMode, reverseScheme, compositeColorScheme])

  return (
    <Styles.Container
      bg={compositeClientColors?.backgroundColor}
      display="flex"
      flexDirection="column"
      {...rest}
    >
      {children}
    </Styles.Container>
  )
}

export default Container
