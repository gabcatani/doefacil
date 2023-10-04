import styled from 'styled-components/native'

import { IStyledPageButton } from './types'

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px 0;
`

const PageButton = styled.TouchableOpacity<IStyledPageButton>`
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  width: 30px;
  height: 30px;
  margin: 4px;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  font-weight: bold;

  ${props => {
    const { pageButton } = props.theme.components.pagination

    if (props.isSelected) {
      return {
        backgroundColor: pageButton.backgroundColor,
        borderColor: pageButton.borderColor,
        fontWeight: '600'
      }
    }
  }};
`

export default { Container, PageButton }
