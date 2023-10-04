import React, { useMemo } from 'react'

import {
  IconName,
  IconPrefix,
  findIconDefinition
} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useColorScheme } from '#hooks/ui/theme/useColorScheme'
import { useTheme } from 'styled-components/native'

import { IAwesomeIconProps, IAwesomeIconTypes } from './types'

const AwesomeIcon = ({
  type = 'solid',
  icon,
  color,
  colorScheme,
  schemeMode,
  reverseScheme,
  compositeColorScheme,
  size = 16,
  ...rest
}: IAwesomeIconProps) => {
  const theme = useTheme()
  const { composeClientColors } = useColorScheme()

  const compositeClientColors = useMemo(() => {
    return composeClientColors({
      colorScheme,
      compositeColorScheme,
      reverseScheme,
      schemeMode
    })
  }, [colorScheme, schemeMode, reverseScheme, compositeColorScheme])

  const parsedIconType: Record<IAwesomeIconTypes, IconPrefix> = {
    solid: 'fas',
    regular: 'far',
    brands: 'fab'
    // TODO: implements case fontawesome pro
    // ...
  }

  let iconType: IconPrefix = 'fas'
  let iconName: IconName = 'circle-exclamation'

  if (
    findIconDefinition({ prefix: parsedIconType[type], iconName: icon }) !==
    undefined
  ) {
    iconType = parsedIconType[type]
    iconName = icon
  }

  return (
    <FontAwesomeIcon
      icon={{ prefix: iconType, iconName }}
      color={compositeClientColors?.color || color}
      size={typeof size === 'number' ? size : theme.fontSizes[size]}
      {...rest}
    />
  )
}

export default AwesomeIcon
