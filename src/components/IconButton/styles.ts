import styled from 'styled-components/native'
import {
  flexbox,
  layout,
  color,
  space,
  position,
  compose,
  variant,
  border
} from 'styled-system'

import { IButtonProps } from './types'

const Button = styled.TouchableOpacity<IButtonProps>`
  ${({
    theme: {
      colors,
      components: { iconButton }
    },
    active
  }) =>
    variant({
      variants: {
        form: {
          backgroundColor: active
            ? colors.client.secondary.backgroundColor
            : iconButton.variants.form.backgroundColor,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5px 15px',
          borderRadius: '8px',
          minWidth: '100px'
        }
      }
    })}

  ${compose(flexbox, layout, color, space, position, border)}
`

export default Button
