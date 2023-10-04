import styled from 'styled-components/native'
import { compose, space, layout } from 'styled-system'

import Text from '#cmp/Text'
import { ITextProps } from '#cmp/Text/types'

import { IImageNotFoundProps } from './types'

const Container = styled.View`
  justify-content: center;
  align-items: center;
`

const StyledImage = styled.Image<{ size: number }>`
  ${({ size }) => ({
    width: `${size}px`,
    height: `${size}px`
  })}
`

const StyledText = styled(Text).attrs<
  Pick<IImageNotFoundProps, 'labelProps'>,
  ITextProps
>(({ fontSize }) => ({
  fontSize: fontSize ?? 'md',
  color: 'gray.500',
  textAlign: 'center'
}))`
  ${compose(space, layout)}
`

export default { Container, StyledImage, StyledText }
