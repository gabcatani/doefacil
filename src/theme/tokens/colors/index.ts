import { defaultColors } from './defaultColors'
import { fallbackClientColors } from './fallbackClientColors'
import {
  IClientColorScheme,
  IClientColors,
  IColorsTheme,
  IParseColorsProps
} from './types'

export const parseColors = (colors: IParseColorsProps): IColorsTheme => {
  const relationColorSchemeTextColor = {
    primary: 'primaryText',
    primaryLight: 'primaryTextLight',
    primaryDark: 'primaryTextDark',
    secondary: 'secondaryText',
    secondaryLight: 'secondaryTextLight',
    secondaryDark: 'secondaryTextDark'
  }

  const parsedColors: IClientColors = Object.entries(
    relationColorSchemeTextColor
  ).reduce((acc, [colorScheme, textColor]) => {
    const colorSchemeKey = colorScheme as IClientColorScheme
    const textColorKey = textColor as IClientColorScheme

    return {
      ...acc,
      composition:
        colors?.composition?.general ?? fallbackClientColors.composition,
      [colorSchemeKey]: {
        backgroundColor:
          colors?.[colorSchemeKey] ??
          fallbackClientColors[colorSchemeKey].backgroundColor,
        color:
          colors?.[textColorKey] ?? fallbackClientColors[colorSchemeKey].color
      }
    }
  }, fallbackClientColors)

  return {
    ...defaultColors,
    client: parsedColors
  }
}
