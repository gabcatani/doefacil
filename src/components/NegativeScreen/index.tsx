import React from 'react'

import { useTheme } from 'styled-components/native'

import AwesomeIcon from '../AwesomeIcon'
import Container from '../Container'
import Text from '../Text'
import Visibility from '../Visibility'
import { INegativeScreenProps } from './types'

const NegativeScreen = ({
  iconProps = { icon: 'magnifying-glass', size: 80 },
  title,
  subtitle,
  afterComponent,
  bg = 'white'
}: INegativeScreenProps) => {
  const theme = useTheme()

  return (
    <Container
      flex={1}
      height="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor={bg}
      px="16px"
      py="32px"
      my={afterComponent ? '16px' : '0'}
    >
      <AwesomeIcon color={theme.colors.gray[400]} {...iconProps} />
      <Visibility.Root>
        <Visibility.Case condition={!!title}>
          <Text fontSize="2xl" fontWeight="600" my="16px" textAlign="center">
            {title}
          </Text>
        </Visibility.Case>
      </Visibility.Root>
      <Visibility.Root>
        <Visibility.Case condition={!!subtitle}>
          <Text fontSize="lg" fontWeight="400" textAlign="center">
            {subtitle}
          </Text>
        </Visibility.Case>
      </Visibility.Root>
      <Visibility.Root>
        <Visibility.Case condition={!!afterComponent}>
          <Container justifyContent="flex-end">{afterComponent}</Container>
        </Visibility.Case>
      </Visibility.Root>
    </Container>
  )
}

export default NegativeScreen
