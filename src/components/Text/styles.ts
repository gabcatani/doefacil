import styled from 'styled-components/native'
import {
  color,
  compose,
  flex,
  fontSize,
  layout,
  letterSpacing,
  lineHeight,
  space,
  textAlign,
  variant
} from 'styled-system'

import { ITextProps } from './types'

const Text = styled.Text<ITextProps>`
  ${variant({
    key: 'fontWeights',
    prop: 'fontWeight'
  })}

  ${variant({
    key: 'fontStyles',
    prop: 'fontStyle'
  })}

  ${({ theme, compositeColorScheme, color }) => {
    if (!compositeColorScheme && !color) {
      return { color: theme.colors.gray['800'] }
    }
  }}

  ${({ textDecoration }) => ({ textDecorationLine: textDecoration })}

  ${compose(
    space,
    color,
    textAlign,
    letterSpacing,
    lineHeight,
    fontSize,
    layout,
    flex
  )}
`

export default { Text }
