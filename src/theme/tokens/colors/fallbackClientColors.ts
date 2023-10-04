import { Platform } from 'react-native'

import { CompositionColor } from '#graphql/server'
import { readTag } from '#utils'

import { IClientColors, IFallbackClientColorsProps } from './types'

const _fallback = ({ envKey, color }: IFallbackClientColorsProps) => {
  if (Platform.OS === 'web') return color

  const hasEnvValue = !!readTag(envKey) && readTag(envKey) !== '"'

  return hasEnvValue ? (readTag(envKey) as string) : color
}

export const fallbackClientColors: IClientColors = {
  primary: {
    backgroundColor: _fallback({ envKey: 'PRIMARY_COLOR', color: '#ffffff' }),
    color: _fallback({ envKey: 'PRIMARY_COLOR_TEXT', color: '#000000' })
  },
  primaryLight: {
    backgroundColor: _fallback({
      envKey: 'PRIMARY_COLOR_LIGHT',
      color: '#ffffff'
    }),
    color: _fallback({ envKey: 'PRIMARY_COLOR_TEXT_LIGHT', color: '#000000' })
  },
  primaryDark: {
    backgroundColor: _fallback({
      envKey: 'PRIMARY_COLOR_DARK',
      color: '#ffffff'
    }),
    color: _fallback({ envKey: 'PRIMARY_COLOR_TEXT_DARK', color: '#000000' })
  },
  secondary: {
    backgroundColor: _fallback({ envKey: 'SECONDARY_COLOR', color: '#ffffff' }),
    color: _fallback({ envKey: 'SECONDARY_COLOR_TEXT', color: '#000000' })
  },
  secondaryLight: {
    backgroundColor: _fallback({
      envKey: 'SECONDARY_COLOR_LIGHT',
      color: '#ffffff'
    }),
    color: _fallback({ envKey: 'SECONDARY_COLOR_TEXT_LIGHT', color: '#000000' })
  },
  secondaryDark: {
    backgroundColor: _fallback({
      envKey: 'SECONDARY_COLOR_DARK',
      color: '#ffffff'
    }),
    color: _fallback({ envKey: 'SECONDARY_COLOR_TEXT_DARK', color: '#000000' })
  },
  composition: CompositionColor.PRIMARY
}
