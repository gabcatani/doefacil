import { DefaultTheme } from 'styled-components/native'

import {
  breakpoint,
  fontSizes,
  fontStyles,
  fontWeights,
  input,
  spaces
} from './tokens'
import { IConfigThemeProps } from './types'

export const configTheme = ({
  colors,
  components,
  screens
}: IConfigThemeProps): DefaultTheme => {
  return {
    colors,
    components,
    screens,
    spaces,
    breakpoint,
    input,
    fontSizes,
    fontWeights,
    fontStyles
  }
}
