import { CompositionColor } from '#graphql/server'

import { reverseColorScheme } from './reverseColorScheme'
import { ECompositeColorScheme, ICompositeColorScheme } from './types'

export const composeColorScheme = ({
  colorScheme,
  schemeMode,
  reverseScheme
}: ICompositeColorScheme): ECompositeColorScheme => {
  if (colorScheme === CompositionColor.MINIMAL)
    return ECompositeColorScheme.MINIMAL

  let compositeColorScheme = colorScheme as unknown as ECompositeColorScheme

  if (schemeMode === 'light') {
    compositeColorScheme = ECompositeColorScheme[`${colorScheme}_LIGHT`]
  }

  if (schemeMode === 'dark') {
    compositeColorScheme = ECompositeColorScheme[`${colorScheme}_DARK`]
  }

  return reverseScheme
    ? reverseColorScheme(compositeColorScheme)
    : compositeColorScheme
}
