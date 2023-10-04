import React, { useCallback, useEffect } from 'react'
import { FlatList, TextInput } from 'react-native'
import { BottomSheet as WebBottomSheet } from 'react-spring-bottom-sheet'

import Container from '../Container'
import ModalHeader from '../ModalHeader'
import Text from '../Text'
import { IBottomSheetProps } from './types'

const BottomSheet: React.FC<IBottomSheetProps> = ({
  title,
  open,
  onClose,
  children,
  description,
  scrollable = false,
  isClosable = true
}) => {
  const renderContent = useCallback(() => {
    return (
      <Container px="20px" flex={1}>
        {!!description && (
          <Text fontWeight="600" fontSize="lg" mb="24px">
            {description}
          </Text>
        )}
        {children}
      </Container>
    )
  }, [children, description])

  const headerAdjustSize =
    typeof window !== 'undefined' &&
    document.querySelector<HTMLElement>('[data-rsbs-scroll]')

  useEffect(() => {
    if (!headerAdjustSize || isClosable) return

    setTimeout(() => (headerAdjustSize.scrollTop = 0), 10)
  }, [open, isClosable, headerAdjustSize])

  return (
    <WebBottomSheet
      open={open}
      onDismiss={() => isClosable && onClose()}
      snapPoints={({ minHeight, maxHeight }) => [
        minHeight * 1.4,
        maxHeight / 0.6
      ]}
    >
      {!!title && (
        <Container my="20px">
          <ModalHeader
            title={title}
            onClose={onClose}
            isClosable={isClosable}
          />
        </Container>
      )}
      {scrollable && <ScrollView>{renderContent()}</ScrollView>}
      {!scrollable && renderContent()}
    </WebBottomSheet>
  )
}

const ScrollView: React.FC = ({ children }) => {
  return <div style={{ overflowY: 'auto' }}>{children}</div>
}

export { FlatList as List }
export { TextInput as Input }
export { ScrollView }

export default BottomSheet
