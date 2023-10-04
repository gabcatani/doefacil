import styled from 'styled-components/native'
import {
  compose,
  space,
  layout,
  flexbox,
  SpaceProps,
  LayoutProps,
  FlexboxProps
} from 'styled-system'

const Content = styled.View<SpaceProps & LayoutProps & FlexboxProps>`
  width: 100%;
  margin: 0 auto;
  ${compose(space, layout, flexbox)}
`

export default { Content }
