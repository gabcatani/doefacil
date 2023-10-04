import React from 'react'

import { useTheme } from 'styled-components/native'

import AwesomeIcon from '../../components/AwesomeIcon'
import Container from '../../components/Container'
import Text from '../../components/Text'
import { IWarningProps } from './types'

const Warning = ({ text }: IWarningProps) => {
  const theme = useTheme()
  return (
    <Container
      flexDirection="row"
      justifyContent={'space-between'}
      alignItems={'center'}
      backgroundColor={theme.colors.warningBackground}
      borderRadius={'8px'}
      p={'8px'}
      mt={'16px'}
    >
      <Container flex={1} alignItems="center" justifyContent="center">
        <AwesomeIcon icon="circle-exclamation" size={16} />
      </Container>
      <Text fontSize="xs" fontWeight="400" flex={12}>
        {text}
      </Text>
    </Container>
  )
}

export default Warning
