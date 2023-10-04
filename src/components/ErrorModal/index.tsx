import React from 'react'
import { Modal } from 'react-native'

import AwesomeIcon from '#cmp/AwesomeIcon'
import Button from '#cmp/Button'
import Container from '#cmp/Container'
import Text from '#cmp/Text'

import { ErrorModalProps } from './types'

const ErrorModal: React.FC<ErrorModalProps> = ({ show, onClose }) => {
  return (
    <Modal visible={show} onRequestClose={onClose}>
      <Container flex={1} alignItems="center" justifyContent="center" px="20px">
        <AwesomeIcon icon="triangle-exclamation" type="solid" size={80} />
        <Text my="16px" fontSize="2xl">
          error.message
        </Text>
        <Button
          testID="tryAgain"
          accessibilityLabel="tryAgain"
          onPress={onClose}
        >
          error.try_again
        </Button>
      </Container>
    </Modal>
  )
}

export default ErrorModal
