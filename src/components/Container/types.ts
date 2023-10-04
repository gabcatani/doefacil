import { ReactNode } from 'react'
import { ViewProps } from 'react-native'

import { IComposeClientColorsProps } from '#hooks/ui/theme/useColorScheme/types'
import {
  BorderProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps
} from 'styled-system'

interface IContainerProps
  extends FlexboxProps,
    LayoutProps,
    ColorProps,
    SpaceProps,
    BorderProps,
    PositionProps,
    Omit<ViewProps, 'accessibilityRole'>, // incompatibilidade entre o accessibilitRole do react-native e do styled-components/native
    Partial<IComposeClientColorsProps> {
  children?: ReactNode
}

export type { IContainerProps }
