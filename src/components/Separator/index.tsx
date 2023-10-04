import React from 'react'

import Styled from './styles'
import { ISeparatorProps } from './types'

const Separator = ({
  dir = 'horizontal',
  color = 'gray.200',
  ...rest
}: ISeparatorProps): JSX.Element => {
  return <Styled.Line dir={dir} bg={color} {...rest} />
}

export default Separator
