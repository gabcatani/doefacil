import React from 'react'

import { useTheme } from 'styled-components/native'

import AwesomeIcon from '../../AwesomeIcon'
import { useTooltip } from '../context'
import { TriggerAsChild, TriggerButton } from '../styles'
import { ITooltipTriggerProps } from '../types'

const TooltipTrigger: React.FC<ITooltipTriggerProps> = ({
  children,
  asChild,
  iconName = 'ellipsis-vertical',
  iconType = 'solid',
  size = 'lg'
}) => {
  const { onOpenDropdown, buttonRef, isOpen } = useTooltip()
  const theme = useTheme()

  if (asChild) {
    return (
      <TriggerAsChild
        testID="tooltip"
        accessibilityLabel="tooltip"
        onPress={onOpenDropdown}
        ref={buttonRef}
      >
        {children}
      </TriggerAsChild>
    )
  }

  return (
    <TriggerButton
      testID="tooltip"
      accessibilityLabel="tooltip"
      onPress={onOpenDropdown}
      background={!isOpen ? theme.colors.white : theme.colors.gray[200]}
      border={`1px solid ${
        !isOpen ? theme.colors.gray[100] : theme.colors.gray[200]
      } `}
      ref={buttonRef}
    >
      <AwesomeIcon
        icon={iconName}
        type={iconType}
        color={theme.colors.gray[600]}
        size={size === 'lg' ? 20 : 12}
      />
    </TriggerButton>
  )
}

export default TooltipTrigger
