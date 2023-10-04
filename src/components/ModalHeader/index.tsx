import React from 'react'

import { translate } from '#utils'
import { useTheme } from 'styled-components/native'

import Container from '../Container'
import IconButton from '../IconButton'
import Text from '../Text'
import IModalHeaderProps from './types'

const ModalHeader: React.FC<IModalHeaderProps> = ({
  title,
  titleColor,
  onClose,
  isClosable = true
}) => {
  const {
    components: { modalHeader }
  } = useTheme()

  return (
    <Container
      marginX={3}
      pb={3}
      borderBottomWidth={title ? '1px' : undefined}
      borderBottomColor={modalHeader.bottomBorderColor}
    >
      {!!title && (
        <Text
          allowFontScaling={false}
          fontSize="3xl"
          fontWeight="600"
          mt={2}
          numberOfLines={3}
          minHeight="30px"
          color={titleColor}
        >
          {translate(title)}
        </Text>
      )}
      {isClosable && (
        <IconButton
          iconName="x"
          position="absolute"
          top="-5px"
          right="0px"
          onPress={onClose}
          testID="close"
          accessibilityLabel="close"
        />
      )}
    </Container>
  )
}

export default ModalHeader
