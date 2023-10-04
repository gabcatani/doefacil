import React from 'react'

import Styles from './styles'
import { ITagProps } from './types'

const Tag: React.FC<ITagProps> = ({
  children,
  size = 'md',
  variant = 'default',
  color,
  bgColor,
  numberOfLines,
  ...rest
}) => {
  return (
    <Styles.Container
      size={size}
      variant={variant}
      color={bgColor}
      {...rest}
      accessibilityRole="text"
    >
      <Styles.StyledText
        fontSize={size}
        textVariant={variant}
        color={color}
        numberOfLines={numberOfLines}
        raw
      >
        {children}
      </Styles.StyledText>
    </Styles.Container>
  )
}

export default Tag
