import { Platform } from 'react-native'

import styled from 'styled-components/native'

import { IContainerProps } from './types'

const Container = styled.View<IContainerProps>`
  flex: 1;
  background-color: ${props =>
    props.background === 'success' ? '#21C25E' : '#F61F1F'};
  align-items: center;
  justify-content: center;
`

const LoadingContainer = styled.View.attrs({
  elevation: 10
})`
  position: ${Platform.OS === 'web' ? 'fixed' : 'absolute'};
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999999999;
  flex: 1;
  height: ${Platform.OS === 'web' ? '100vh' : '100%'};
  width: ${Platform.OS === 'web' ? '100vw' : '100%'};
  top: 0;
  left: 0;
`

const SpinnerContainer = styled.View`
  height: 150px;
  width: 150px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`

const Spinner = styled.ActivityIndicator.attrs(props => ({
  color: props.theme.colors.client.primary.backgroundColor,
  size: 'large'
}))``

export default {
  Container,
  LoadingContainer,
  SpinnerContainer,
  Spinner
}
