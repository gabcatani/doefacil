import React from 'react'

import { CompositionColor } from '#graphql/server'
import useRouter from '#nav/utils/useRouter'
import { translate } from '#utils'

import Button from '../Button'
import Card from '../Card'
import Container from '../Container'
import Text from '../Text'
import { IRedirectToLogin } from './types'

interface CoreRedirectProps {
  isCard: boolean
}

const CoreRedirect: React.FC<CoreRedirectProps> = ({ isCard }) => {
  const router = useRouter()

  return (
    <Container
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={isCard ? 'center' : 'flex-start'}
    >
      <Text
        textAlign={isCard ? 'center' : 'left'}
        pb={isCard ? '8px' : '16px'}
        fontSize="md"
        color={'gray.700'}
        lineHeight={isCard ? '18px' : '21px'}
      >
        screen.home.description_redirect_to_login
      </Text>
      <Button
        testID="redirectButtonLoginOrRegister"
        accessibilityLabel={translate(
          `accessibility.component.not_logged_in_screen.enter_or_register`
        )}
        variant={'primary'}
        style={{ width: '100%' }}
        size={isCard ? 'sm' : 'md'}
        onPress={() => router.push('/auth?redirecting=true')}
      >
        <Text
          colorScheme={CompositionColor.PRIMARY}
          fontWeight="500"
          fontSize="md"
          lineHeight={'21px'}
        >
          screen.home.button_redirect_to_login
        </Text>
      </Button>
    </Container>
  )
}

const RedirectToLogin: React.FC<IRedirectToLogin> = ({
  mb = '32px',
  showInCard = true
}) => {
  return showInCard ? (
    <Card p="8px" mx="16px" mb={mb}>
      <CoreRedirect isCard={true} />
    </Card>
  ) : (
    <Container mt={'8px'}>
      <CoreRedirect isCard={false} />
    </Container>
  )
}

export default RedirectToLogin
