import React from 'react'

import Visibility from '#cmp/Visibility'

import Styles from './styles'
import { IHeaderProps } from './types'

const Header = ({ title, subtitle, ...props }: IHeaderProps) => {
  return (
    <Styles.HeaderContainer {...props}>
      <Styles.Title>{title}</Styles.Title>

      <Visibility.Root>
        <Visibility.Case condition={!!subtitle}>
          <Styles.Subtitle raw>{subtitle}</Styles.Subtitle>
        </Visibility.Case>
      </Visibility.Root>
    </Styles.HeaderContainer>
  )
}

export default Header
