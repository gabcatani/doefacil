import styled from 'styled-components/native'
import { flexbox, layout, color, space, position, compose } from 'styled-system'

import { ImageProps } from './types'

const Image = styled.Image<ImageProps>`
  ${compose(flexbox, layout, color, space, position)}
`

export default Image
