import React from 'react'

import { useTheme } from 'styled-components/native'

import AwesomeIcon from '../AwesomeIcon'
import Text from '../Text'
import Button from './styles'
import IIconButtonProps from './types'

const IconButton: React.FC<IIconButtonProps> = ({
  iconName,
  iconSize,
  iconType = 'solid',
  label,
  iconColor,
  LabelProps,
  variant,
  active,
  color,
  ...props
}) => {
  const theme = useTheme()

  if (!iconSize) {
    if (variant === 'form') {
      iconSize = 14
    } else {
      iconSize = 18
    }
  }

  const colorIcon = iconColor || color || theme.colors.black

  return (
    <Button
      {...props}
      variant={variant}
      active={active}
      accessibilityRole="button"
    >
      {!!iconName && active && (
        <AwesomeIcon
          type={iconType}
          size={iconSize}
          icon={iconName}
          color={theme.colors.client.secondary.color}
        />
      )}
      {!!iconName && !active && (
        <AwesomeIcon
          type={iconType}
          size={iconSize}
          icon={iconName}
          color={colorIcon}
        />
      )}
      {!!label && (
        <Text
          fontSize="md"
          fontWeight="600"
          ml="5px"
          color={active ? theme.colors.client.secondary.color : color}
          {...LabelProps}
          accessibilityRole="text"
        >
          {label}
        </Text>
      )}
    </Button>
  )
}

export default IconButton
