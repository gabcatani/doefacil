import React from 'react'

import { useTheme } from 'styled-components/native'

import Styles from './styles'
import { IRenderHtmlProps } from './types'

const RenderHtml: React.FC<IRenderHtmlProps> = ({ children, tagsStyles }) => {
  const theme = useTheme()

  return (
    <Styles.Container
      dangerouslySetInnerHTML={{ __html: `<div>${children}</div>` }}
      tagsStyles={{ div: { color: theme.colors.gray['600'] }, ...tagsStyles }}
    ></Styles.Container>
  )
}

export default RenderHtml
