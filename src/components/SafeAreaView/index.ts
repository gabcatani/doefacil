import styled from 'styled-components/native'

import { ISafeAreaViewProps } from './types'

const SafeAreaView = styled.SafeAreaView<ISafeAreaViewProps>`
  flex: ${props => props.flex || 1};
  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${backgroundColor};`}
`

export default SafeAreaView
