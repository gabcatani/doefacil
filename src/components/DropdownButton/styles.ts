import styled from 'styled-components/native'
import { compose, background, position } from 'styled-system'

import { IButtonProps, IDropdownContainerProps } from './types'

const DropdownContainer = styled.View<IDropdownContainerProps>`
  position: absolute;
  background: #fff;
  box-shadow: #00000014 0px 4px 8px;
  padding: 8px 0;
  border-radius: 8px;

  ${compose(position)}
`

const Button = styled.TouchableOpacity<IButtonProps>`
  flex-direction: row;
  align-items: center;
  padding: 4px 10px;
  border-radius: 4px;
  z-index: 1;
  margin-right: 2px;

  ${compose(background)}
`

export { DropdownContainer, Button }
