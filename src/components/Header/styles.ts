import styled from 'styled-components/native'
import { compose, space } from 'styled-system'

import Container from '#cmp/Container'
import { IContainerProps } from '#cmp/Container/types'
import Text from '#cmp/Text'
import { ITextProps } from '#cmp/Text/types'

import { IStyledHeaderContainer } from './types'

const HeaderContainer = styled(Container).attrs<
  IStyledHeaderContainer,
  IContainerProps
>({
  bg: 'white',
  alignItems: 'center'
})<IStyledHeaderContainer>`
  padding: 32px 8px;
  ${compose(space)}
`

const Title = styled(Text).attrs<object, ITextProps>({
  fontSize: '3xl',
  fontWeight: '700',
  color: 'gray.800'
})``

const Subtitle = styled(Text).attrs<object, ITextProps>({
  fontSize: 'sm',
  mt: '16px',
  color: 'gray.600'
})``

export default { HeaderContainer, Title, Subtitle }
