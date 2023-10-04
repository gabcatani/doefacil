import { TouchableOpacityProps } from 'react-native'

import { FlexProps, SpaceProps, BorderProps } from 'styled-system'

import { Sizes, Variants } from '../../types/ui'

interface IButtonProps
  extends TouchableOpacityProps,
    FlexProps,
    SpaceProps,
    BorderProps {
  size?: Sizes
  color?: string
  bgColor?: string
  variant?: Variants
  testID: string
  accessibilityLabel: string
  loading?: boolean
  disabled?: boolean
}

interface IStyledButtonProps {
  size: Sizes
  color?: string
  variant: Variants
  disabled?: boolean
}

interface IStyledButtonTextProps {
  textVariant: Variants
  disabled?: boolean
}

export type { IButtonProps, IStyledButtonProps, IStyledButtonTextProps }
