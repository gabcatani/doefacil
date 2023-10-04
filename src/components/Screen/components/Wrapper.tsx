import React from 'react'

import Container from '../../Container'
import SafeAreaView from '../../SafeAreaView'
import { IWrapperProps } from '../types'

const Wrapper: React.FC<IWrapperProps> = ({
  isSafeArea,
  flex,
  backgroundColor,
  children
}) => {
  if (isSafeArea)
    return (
      <SafeAreaView flex={flex} backgroundColor={backgroundColor}>
        {children}
      </SafeAreaView>
    )
  return (
    <Container flex={flex} backgroundColor={backgroundColor}>
      {children}
    </Container>
  )
}

export default Wrapper
