import React, { Fragment, useMemo } from 'react'

import { useColorScheme } from '#hooks/ui/theme/useColorScheme'
import { translate } from '#utils'

import Styles from './styles'
import { ITextProps } from './types'

const Text: React.FC<ITextProps> = ({ children, ...props }) => {
  const {
    raw,
    capitalize,
    i18nProps,
    colorScheme,
    schemeMode,
    reverseScheme,
    compositeColorScheme,
    ...restProps
  } = props

  const { composeClientColors } = useColorScheme()

  const getText = () => {
    if (capitalize && typeof children === 'string') {
      const words = children
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())

      return words.join(' ')
    }

    return children
  }

  const compositeClientColors = useMemo(() => {
    return composeClientColors({
      colorScheme,
      compositeColorScheme,
      reverseScheme,
      schemeMode
    })
  }, [colorScheme, schemeMode, reverseScheme, compositeColorScheme])

  return (
    <Styles.Text
      color={compositeClientColors?.color}
      {...restProps}
      accessibilityRole="text"
    >
      {raw && getText()}
      {!raw &&
        translate(getText() as string, i18nProps)
          .split('**')
          .map((str, i) =>
            i % 2 == 0 ? (
              <Fragment key={i}>{str}</Fragment>
            ) : (
              <Styles.Text
                key={i}
                color={compositeClientColors?.color}
                {...restProps}
                fontWeight="700"
                accessibilityRole="text"
              >
                {str}
              </Styles.Text>
            )
          )}
    </Styles.Text>
  )
}

export default Text

Text.defaultProps = {
  raw: false,
  fontWeight: '400',
  fontStyle: 'normal',
  fontSize: 'sm'
}
