import { TouchableOpacityProps } from 'react-native'

import type { Sizes, Variants } from '#types/ui'

interface ITagProps extends TouchableOpacityProps {
  size?: Sizes
  color?: string
  bgColor?: string
  variant?: Variants
  numberOfLines?: number
}

interface IStyledTagProps {
  size: Sizes
  color?: string
  variant: Variants
}

export type { ITagProps, IStyledTagProps }
