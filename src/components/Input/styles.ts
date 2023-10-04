import { IFontWeight } from '#theme/tokens'
import styled from 'styled-components/native'
import { compose, layout, padding } from 'styled-system'

import { Input as BSInput } from '../BottomSheet'
import { ITextInputProps } from './types'

const Input = styled.TextInput<ITextInputProps & { fontWeight: IFontWeight }>`
  ${({ theme, fontWeight, disabled }) => ({
    fontSize: `${theme.fontSizes.md}px`,
    fontWeight,
    color: disabled ? theme.colors.gray['400'] : theme.colors.gray['800'],
    backgroundColor: theme.components.input.backgroundColor
  })}
  border: 1px solid
    ${({ hasError, theme }) =>
    hasError ? theme.input.borderErrorColor : theme.input.borderColor};
  border-radius: 16px;
  padding: 12px 16px;
  width: 100%;
  ${compose(layout, padding)}
`

const BottomSheetInput = styled(BSInput)<
  ITextInputProps & { fontWeight: IFontWeight }
>`
  ${({ theme, fontWeight, disabled }) => ({
    fontSize: `${theme.fontSizes.md}px`,
    fontWeight,
    color: disabled ? theme.colors.gray['400'] : theme.colors.gray['800'],
    backgroundColor: theme.components.input.backgroundColor
  })}

  border: 1px solid
    ${({ hasError, theme }) =>
    hasError ? theme.input.borderErrorColor : theme.input.borderColor};
  border-radius: 16px;
  padding: 12px 16px;
  width: 100%;
  ${layout}
`

export default { Input, BottomSheetInput }
