import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import RNBootSplash from 'react-native-bootsplash'

import { useTheme } from 'styled-components/native'

import AwesomeIcon from '../AwesomeIcon'
import Container from '../Container'
import Text from '../Text'

const NoConnection: React.FC = () => {
  const theme = useTheme()

  useEffect(() => {
    RNBootSplash.hide({ fade: true })
  }, [])

  return (
    <Container
      backgroundColor="#FFF"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Container justifyContent="center" mb="30px">
        <AwesomeIcon icon="wifi" size={80} color={theme.colors.gray[600]} />
      </Container>
      <Container mx="50px">
        <Text fontSize="3xl" fontWeight="600" textAlign="center">
          screen.no_connection.title
        </Text>
        <Text textAlign="center" mt="20px">
          screen.no_connection.subtitle
        </Text>

        <Container mt="40px" alignItems="center">
          <Text fontSize="lg" fontWeight="600" mb="10px">
            screen.no_connection.trying
          </Text>
          <ActivityIndicator
            size="large"
            color={theme.colors.client.primary.backgroundColor}
          />
        </Container>
      </Container>
    </Container>
  )
}

export default NoConnection
