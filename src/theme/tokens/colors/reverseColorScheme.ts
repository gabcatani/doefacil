import { CompositionColor } from '#graphql/server'

import { ECompositeColorScheme } from './types'

export const reverseColorScheme = (
  colorScheme: ECompositeColorScheme | CompositionColor
) => {
  if (colorScheme.startsWith('PRIMARY')) {
    if (colorScheme.endsWith('LIGHT')) {
      return ECompositeColorScheme.SECONDARY_LIGHT
    }

    if (colorScheme.endsWith('DARK')) {
      return ECompositeColorScheme.SECONDARY_DARK
    }

    return ECompositeColorScheme.SECONDARY
  }

  if (colorScheme.startsWith('SECONDARY')) {
    if (colorScheme.endsWith('LIGHT')) {
      return ECompositeColorScheme.PRIMARY_LIGHT
    }

    if (colorScheme.endsWith('DARK')) {
      return ECompositeColorScheme.PRIMARY_DARK
    }

    return ECompositeColorScheme.PRIMARY
  }

  return ECompositeColorScheme.MINIMAL
}
