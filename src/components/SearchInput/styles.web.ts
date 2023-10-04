import styled from 'styled-components/native'
import { compose, color, layout, borderRadius } from 'styled-system'

import ISearchInputProps from './types'

const Input = styled.TextInput<ISearchInputProps>`
  font-size: ${({ theme }) => `${theme.fontSizes.md}px`};
  flex: 1;
  overflow: hidden;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray[200]};
  border-radius: 12px;
  padding: 6px ${props => (props.hasValue ? '90px' : '70px')} 6px 36px;
  height: 50px;
  color: ${({ theme }) => theme.colors.black};
  ${compose(color, layout, borderRadius)}
  ${({ loading }) => loading && `padding-right: 56px;`}
`

export default { Input }
