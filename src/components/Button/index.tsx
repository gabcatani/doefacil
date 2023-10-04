import React from 'react'
import { ActivityIndicator } from 'react-native'

import { translate } from '#utils'
import { useTheme } from 'styled-components/native'

import Styles from './styles'
import { IButtonProps } from './types'

const Button: React.FC<IButtonProps> = ({
  children,
  size = 'md',
  variant = 'secondary',
  color,
  bgColor,
  loading,
  disabled,
  onPress,
  ...rest
}) => {
  const theme = useTheme()

  return (
    <Styles.StyledButton
      disabled={disabled}
      size={size}
      variant={variant}
      color={bgColor}
      activeOpacity={0.9}
      onPress={!loading && !disabled ? onPress : undefined}
      {...rest}
      accessibilityRole="button"
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={
            color ||
            theme.components.button.variants[variant]?.color ||
            theme.colors.client.secondary.color
          }
        />
      )}
      {!loading &&
        (typeof children === 'string' ? (
          <Styles.StyledButtonText
            raw
            fontSize={size}
            textVariant={variant}
            disabled={disabled}
            color={color}
          >
            {translate(children as string)}
          </Styles.StyledButtonText>
        ) : (
          children
        ))}
    </Styles.StyledButton>
  )
}

export default Button
