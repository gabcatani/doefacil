import { IFontWeight } from '#theme/tokens'
import styled from 'styled-components/native'
import { variant } from 'styled-system'
import { compose, color, layout, borderRadius } from 'styled-system'

import ISearchInputProps from './types'

const Input = styled.TextInput<ISearchInputProps & { fontWeight: IFontWeight }>`
  ${({ theme, fontWeight }) => ({
    fontSize: `${theme.fontSizes.md}px`,
    fontWeight,
    borderColor: theme.colors.gray['200'],
    color: theme.colors.gray['800']
  })};

  flex: 1;
  overflow: hidden;
  border-width: 1px;
  border-radius: 16px;
  padding: 6px 36px;

  ${variant({
    key: 'fontWeights',
    prop: 'fontWeight'
  })}

  ${compose(color, layout, borderRadius)}
  ${({ loading }) => loading && `padding-right: 56px;`}
`

export default { Input }
