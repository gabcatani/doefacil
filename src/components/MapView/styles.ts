import styled from 'styled-components/native'

import Button from '../Button'

const MarkerContainer = styled.View`
  left: 50%;
  margin-left: -24px;
  margin-top: -48px;
  position: absolute;
  top: 50%;
`

const Marker = styled.Image`
  height: 48px;
  width: 48px;
`

const ConfirmButton = styled(Button)`
  width: 80%;
`

export default { MarkerContainer, Marker, ConfirmButton }
