import React from 'react'

import { useTheme } from 'styled-components/native'

import AwesomeIcon from '../AwesomeIcon'
import Container from '../Container'
import Text from '../Text'
import { IDisclaimerProps } from './types'

const Disclaimer: React.FC<IDisclaimerProps> = ({
  title,
  messages,
  negative,
  my = '8px',
  mx = '16px',
  bold,
  color: colorFromProps,
  ...props
}) => {
  const {
    colors: {
      client: {
        primary: { color: colorFromTheme, backgroundColor }
      }
    }
  } = useTheme()

  const color = colorFromProps ? colorFromProps : colorFromTheme

  return (
    <Container
      my={my}
      mx={mx}
      borderRadius={5}
      borderColor={negative ? backgroundColor : color}
      borderWidth={1}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'row'}
      py={'8px'}
      px={'12px'}
      {...props}
    >
      <Container mr={16}>
        <AwesomeIcon
          size={22}
          icon="circle-exclamation"
          color={negative ? backgroundColor : color}
        />
      </Container>
      <Container flex={1} alignItems={'flex-start'} justifyContent={'center'}>
        {title && (
          <Text
            mb={'8px'}
            color={negative ? backgroundColor : color}
            fontSize="md"
            fontWeight="700"
          >
            {title}
          </Text>
        )}
        {messages.map((message, index, { length }) => (
          <Text
            key={index}
            color={negative ? backgroundColor : color}
            fontSize="sm"
            mb={index < length - 1 ? '8px' : 0}
            fontWeight={bold ? '700' : '400'}
          >
            {message}
          </Text>
        ))}
      </Container>
    </Container>
  )
}

export default Disclaimer
