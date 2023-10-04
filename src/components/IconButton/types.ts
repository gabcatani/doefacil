import { TouchableOpacityProps } from 'react-native'

import { IconName } from '@fortawesome/fontawesome-svg-core'
import {
  FlexboxProps,
  LayoutProps,
  ColorProps,
  SpaceProps,
  PositionProps,
  BorderProps
} from 'styled-system'

import { ITextProps } from '#cmp/Text/types'

type IAwesomeIconTypes = 'solid' | 'regular' | 'brands'
export interface IButtonProps
  extends TouchableOpacityProps,
    FlexboxProps,
    LayoutProps,
    ColorProps,
    PositionProps,
    SpaceProps,
    BorderProps {
  variant?: 'form'
  active?: boolean
  testID: string
  accessibilityLabel: string
  color?: string
}

export default interface IconButtonProps extends IButtonProps {
  iconName?: IconName
  iconSize?: number
  iconColor?: string
  iconType?: IAwesomeIconTypes
  label?: string
  LabelProps?: ITextProps
}
