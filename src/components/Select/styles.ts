import styled from 'styled-components/native'

import { ISelectStyleProps } from './types'

const Select = styled.Picker<ISelectStyleProps>`
  border-radius: 16px;
  padding: 12px 16px 12px 16px;
  border-color: ${({ theme, hasError }) =>
    hasError ? theme.input.borderErrorColor : theme.input.borderColor};
  background: ${({ theme }) => theme.components.input.backgroundColor};
  height: 45px;

  item-style: {
    font-size: ${({ theme }) => `${theme.fontSizes['5xl']}px`};
    background: ${({ theme }) => theme.colors.black};
  }
`

export default { Select }
