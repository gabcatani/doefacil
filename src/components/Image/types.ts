import {
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleProp
} from 'react-native'

import { FlexboxProps, LayoutProps, SpaceProps } from 'styled-system'

interface ImageProps extends FlexboxProps, LayoutProps, SpaceProps {
  source: ImageSourcePropType
  style?: StyleProp<ImageStyle>
  resizeMode?: ImageResizeMode
}

export type { ImageProps }
