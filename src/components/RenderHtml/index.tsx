import React from 'react'
import RNRenderHtml from 'react-native-render-html'

import { useTheme } from 'styled-components/native'

import { IRenderHtmlProps } from './types'

const RenderHtml: React.FC<IRenderHtmlProps> = ({
  children,
  tagsStyles,
  contentWidth = 100
}) => {
  const theme = useTheme()

  const styles = React.useMemo(
    () => ({ div: { color: theme.colors.gray['600'] }, ...tagsStyles }),
    [tagsStyles]
  )

  return (
    <RNRenderHtml
      contentWidth={contentWidth}
      source={{ html: `<div>${children}</div>` }}
      tagsStyles={styles}
    />
  )
}

export default RenderHtml
