import {
  AccessibilityRole as RNAccessibilityRole,
  TextProps as RNTextProps
} from 'react-native'

import { IComposeClientColorsProps } from '#hooks/ui/theme/useColorScheme/types'
import { IFontSize, IFontStyle, IFontWeight } from '#theme/tokens'
import {
  ColorProps,
  FlexboxProps,
  FontSizeProps,
  LayoutProps,
  LetterSpacingProps,
  LineHeightProps,
  SpaceProps,
  TextAlignProps
} from 'styled-system'

//@ts-ignore // Incompatibilidade entre os tipos do RN e do Styled-Components
interface ITextProps
  extends RNTextProps,
    SpaceProps,
    FlexboxProps,
    ColorProps,
    TextAlignProps,
    LetterSpacingProps,
    LineHeightProps,
    FontSizeProps,
    LayoutProps,
    Partial<IComposeClientColorsProps> {
  fontSize?: IFontSize
  fontWeight?: IFontWeight
  fontStyle?: IFontStyle
  raw?: boolean
  capitalize?: boolean
  i18nProps?: object
  accessibilityRole?: RNAccessibilityRole | 'heading'
  textDecoration?:
    | 'none'
    | 'overline'
    | 'line-through'
    | 'underline'
    | 'underline line-through'
}

export type { ITextProps }
