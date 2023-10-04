import styled from 'styled-components/native'
import {
  border,
  color,
  compose,
  flexbox,
  layout,
  position,
  space
} from 'styled-system'

import { IContainerProps } from './types'

const Container = styled.View<IContainerProps>`
  ${compose(flexbox, layout, color, space, border, position)}
`

export default { Container }
