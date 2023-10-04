import styled from 'styled-components/native'
import { space } from 'styled-system'

import { IContainerProps } from './types'

const TitleContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const BodyContainer = styled.View`
  background-color: ${({ theme }) =>
    theme.components.accordion.backgroundColor};

  margin-top: 16px;
`
const Container = styled.View<IContainerProps>`
  border-color: ${({ theme }) => theme.components.accordion.borderColor};
  border-width: 1px;
  padding: 16px 11px;

  ${({ roundTop }) =>
    roundTop &&
    `
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  `}

  ${({ roundBottom }) =>
    roundBottom &&
    `
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  `}

  ${space}
`

export default { TitleContainer, BodyContainer, Container }
