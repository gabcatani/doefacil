import React from 'react'
import { Modal, TouchableOpacity } from 'react-native'

import { useTooltip } from '../context'
import { TooltipContainer } from '../styles'

const TooltipContent: React.FC = ({ children }) => {
  const { isOpen, onCloseDropdown, contentPosition, onContentLayout } =
    useTooltip()

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      onRequestClose={onCloseDropdown}
    >
      <TouchableOpacity
        style={{
          flexGrow: 1
        }}
        onPress={onCloseDropdown}
      >
        <TooltipContainer
          {...contentPosition}
          onLayout={({ nativeEvent }) =>
            onContentLayout({
              h: nativeEvent.layout.height,
              w: nativeEvent.layout.width
            })
          }
        >
          {children}
        </TooltipContainer>
      </TouchableOpacity>
    </Modal>
  )
}

export default TooltipContent
