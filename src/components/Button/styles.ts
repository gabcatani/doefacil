import styled from 'styled-components/native'
import { compose, space, flex, variant, border } from 'styled-system'

import Text from '#cmp/Text'
import { ITextProps } from '#cmp/Text/types'

import { IStyledButtonProps, IStyledButtonTextProps } from './types'

const StyledButton = styled.TouchableOpacity<IStyledButtonProps>`
  ${props => {
    const { sizes, variants } = props.theme.components.button

    if (props.disabled) {
      props.color =
        props.theme.components.button.variants['disabled']?.backgroundColor
    }

    return {
      ...sizes[props.size],
      background: props.color ?? variants[props.variant]?.backgroundColor
    }
  }};

  align-items: center;
  justify-content: center;
  border-radius: 8px;

  ${({ theme }) =>
    variant({
      variants: {
        cancel: {
          borderColor:
            theme.components.button.variants['cancel']?.borderColor ||
            '#707070',
          borderWidth:
            theme.components.button.variants['cancel']?.borderWidth || 1,
          borderRadius:
            theme.components.button.variants['cancel']?.borderRadius || 8
        }
      }
    })}

  ${compose(flex, space, border)}
`
const StyledButtonText = styled(Text).attrs<IStyledButtonTextProps, ITextProps>(
  ({ theme, disabled, color, textVariant }) => ({
    color: disabled
      ? theme.components.button.variants['disabled']?.color
      : color ?? theme.components.button.variants[textVariant]?.color,
    fontWeight: textVariant === 'cancel' || disabled ? '500' : '600'
  })
)<IStyledButtonTextProps>``

export default { StyledButton, StyledButtonText }
