import styled from 'styled-components/native'
import { compose, position, background, border } from 'styled-system'
import { PositionProps } from 'styled-system'

import { IButtonProps } from './types'

const TooltipContainer = styled.View<PositionProps>`
  position: absolute;
  background: #fff;
  box-shadow: #000000 0px 4px 8px;
  padding: 8px 16px;
  border-radius: 4px;

  ${compose(position)}
`

const TriggerButton = styled.TouchableOpacity<IButtonProps>`
  flex-direction: row;
  align-items: center;
  padding: 6px;
  border-radius: 8px;
  z-index: 1;

  ${compose(border)}
  ${compose(background)}
`

const TriggerAsChild = styled.TouchableOpacity<IButtonProps>`
  z-index: 1;

  ${compose(background)}
`

export { TooltipContainer, TriggerButton, TriggerAsChild }
