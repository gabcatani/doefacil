import { Variants } from '#types/ui'
import styled from 'styled-components/native'

import Text from '#cmp/Text'
import { ITextProps } from '#cmp/Text/types'

import { IStyledTagProps } from './types'

const Container = styled.View<IStyledTagProps>`
  ${props => {
    const { sizes, variants } = props.theme.components.tag

    return {
      ...sizes[props.size],
      borderRadius: sizes[props.size]?.height,
      background: props.color ?? variants[props.variant]?.backgroundColor
    }
  }};

  align-items: center;
  justify-content: center;
`

const StyledText = styled(Text).attrs<{ textVariant: Variants }, ITextProps>(
  ({ theme, textVariant, color }) => ({
    color: color ?? theme.components.tag.variants[textVariant]?.color
  })
)<{ textVariant: Variants }>``

export default { Container, StyledText }
