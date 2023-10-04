import React from 'react'

import useRouter from '#nav/utils/useRouter'
import { useTheme } from 'styled-components/native'

import AwesomeIcon from '../AwesomeIcon'
import Button from '../Button'
import Card from '../Card'
import Container from '../Container'
import Screen from '../Screen'
import Text from '../Text'
import { INotLoggedInProps } from './types'

const NotLoggedInScreen: React.FC<INotLoggedInProps> = ({
  bgStatusBar,
  bgStatusBarStyle,
  noScroll
}) => {
  const router = useRouter()
  const theme = useTheme()

  return (
    <Screen
      bgStatusBar={bgStatusBar}
      bgStatusBarStyle={bgStatusBarStyle}
      noScrollContentPadding="0px"
      ScrollViewProps={{ contentContainerStyle: { flexGrow: 1, padding: 0 } }}
      noScroll={noScroll}
    >
      <Container p={16} flex={1}>
        <Card p="16px" mb="32px">
          <Container
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <AwesomeIcon
              icon="user-large"
              size={40}
              color={theme.colors.client.secondary.backgroundColor}
            />
            <Text
              flex={1}
              lineHeight={'21px'}
              fontSize="md"
              color={'gray.700'}
              ml={22}
            >
              screen.home.description_redirect_to_login
            </Text>
          </Container>
        </Card>
      </Container>
      <Container backgroundColor={theme.colors.white} p={16}>
        <Button
          color={theme.colors.client.secondary.color}
          testID="notLoggedScreenButton"
          accessibilityLabel="accessibility.component.not_logged_in_screen.enter_or_register"
          onPress={() => {
            router.push('/auth?redirecting=true')
          }}
        >
          screen.order_history.login
        </Button>
      </Container>
    </Screen>
  )
}

export default NotLoggedInScreen
