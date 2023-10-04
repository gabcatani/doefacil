import React, { useCallback } from 'react'

import AwesomeIcon from '../AwesomeIcon'
import Text from '../Text'
import DropdownMenu from './components/DropdownMenu'
import { DropdownButtonProvider, useDropdownButton } from './context'
import { Button } from './styles'
import { IDropdownButtonProps } from './types'

const DropdownButtonComponent = () => {
  const {
    label,
    iconName,
    iconType,
    showArrow,
    buttonRef,
    isOpen,
    buttonColor,
    buttonBgColor,
    onOpenDropdown
  } = useDropdownButton()

  const renderIcon = useCallback(() => {
    const useDefaultIcon = !iconName && !label && !showArrow
    const _iconName = useDefaultIcon ? 'ellipsis-vertical' : iconName
    if (_iconName) {
      return (
        <AwesomeIcon
          icon={_iconName}
          type={useDefaultIcon ? 'solid' : iconType}
          color={buttonColor}
          size={16}
        />
      )
    } else {
      return null
    }
  }, [iconName, label, showArrow, buttonColor])

  return (
    <Button ref={buttonRef} background={buttonBgColor} onPress={onOpenDropdown}>
      <DropdownMenu />
      {renderIcon()}
      {!!label && (
        <Text
          color={buttonColor}
          fontSize="sm"
          lineHeight="16px"
          fontWeight="500"
          ml={iconName ? '16px' : '4px'}
          mr="4px"
        >
          {label}
        </Text>
      )}
      {showArrow && (
        <AwesomeIcon
          icon={`chevron-${isOpen ? 'up' : 'down'}`}
          color={buttonColor}
          size={12}
        />
      )}
    </Button>
  )
}

const DropdownButton: React.FC<IDropdownButtonProps> = props => {
  return (
    <DropdownButtonProvider {...props}>
      <DropdownButtonComponent />
    </DropdownButtonProvider>
  )
}

export default DropdownButton
