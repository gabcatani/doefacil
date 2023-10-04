import styled from 'styled-components/native'
import { color, ColorProps, compose, layout, LayoutProps } from 'styled-system'

const StyledButton = styled.TouchableOpacity<LayoutProps & ColorProps>`
  ${compose(color, layout)}
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`

export default { StyledButton }
