import { Platform } from 'react-native'

import styled from 'styled-components/native'

import Text from '#cmp/Text'
import { ITextProps } from '#cmp/Text/types'

const isWeb = Platform.OS === 'web'

const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
  align-items: center;
`

const Content = styled.View`
  max-width: 550px;
  flex: 1;
`

const Title = styled(Text).attrs<object, ITextProps>(({ theme, color }) => ({
  fontSize: isWeb ? '4xl' : '3xl',
  color: color ?? theme.colors.gray[700]
}))`
  margin-bottom: 12px;
`

const Subtitle = styled(Text).attrs<object, ITextProps>(({ theme, color }) => ({
  fontSize: isWeb ? '3xl' : 'lg',
  color: color ?? theme.colors.gray[600]
}))`
  text-align: center;
`

const AddedContent = styled.View`
  margin-top: 40px;
  min-width: 100%;
`

const SwiperActionsContainer = styled.View`
  margin-top: 60px;
  min-width: 100%;
`

const SkipAllText = styled(Text).attrs<object, ITextProps>(({ theme }) => ({
  fontSize: 'md',
  color: theme.colors.gray[500],
  fontWeight: '600'
}))`
  text-align: center;
  margin-top: 24px;
`

const ScrollView = styled.ScrollView`
  margin-top: 30px;
  padding: 0 16px;
`

export default {
  Container,
  Content,
  Title,
  Subtitle,
  AddedContent,
  SwiperActionsContainer,
  SkipAllText,
  ScrollView
}
