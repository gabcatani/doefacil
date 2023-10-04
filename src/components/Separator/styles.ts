import styled from 'styled-components/native'
import { compose, color, space } from 'styled-system'

import { ISeparatorProps } from './types'

const Line = styled.View<ISeparatorProps>`
  ${compose(color, space)}
  ${props => ({
    width: props.dir === 'horizontal' ? '100%' : '1px',
    height: props.dir === 'horizontal' ? '1px' : '100%'
  })}
`

export default { Line }
