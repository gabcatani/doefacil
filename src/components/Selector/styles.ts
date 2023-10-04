import styled from 'styled-components/native'

import { ISwitchProps } from './types'

const Switch = styled.TouchableOpacity<ISwitchProps>`
  ${({ active, theme, activeColor }) =>
    active &&
    `background-color: ${theme.colors.client[activeColor].backgroundColor}`}
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: 30px;
`

export default { Switch }
