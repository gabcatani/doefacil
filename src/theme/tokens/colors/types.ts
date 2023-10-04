import {
  BasicConfigs_configuration_consumerApp_assets_web_colors,
  CompositionColor,
  Configuration_configuration_consumerApp_assets_app_colors
} from '#graphql/server'
import Nullable from '#types/Nullable'

type IClientColorScheme =
  | 'primary'
  | 'primaryLight'
  | 'primaryDark'
  | 'secondary'
  | 'secondaryLight'
  | 'secondaryDark'

type IClientTextColor =
  | 'primaryText'
  | 'primaryTextLight'
  | 'primaryTextDark'
  | 'secondaryText'
  | 'secondaryTextLight'
  | 'secondaryTextDark'

interface IFallbackClientColorsProps {
  envKey: string
  color: string
}

// Only IClientColorScheme & IClientTextColor keys
/* type IParseColorsProps = Nullable<{
  [K in IClientColorScheme | IClientTextColor]: string
}> */

type IParseColorsProps = Nullable<
  Partial<
    | BasicConfigs_configuration_consumerApp_assets_web_colors
    | Configuration_configuration_consumerApp_assets_app_colors
  >
>

type IClientColors = {
  [K in IClientColorScheme]: {
    backgroundColor: string
    color: string
  }
} & { composition: CompositionColor }

interface IColorHues {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

interface IColorsTheme {
  client: IClientColors

  backgroundDefault: string

  transparent: string
  black: string
  white: string
  gray: IColorHues
  orange: string //wtf

  info: string
  success: string
  attention: string
  warning: string
  warningBackground: string
  error: string

  linkColor: string
}

export enum ECompositeColorScheme {
  MINIMAL = 'MINIMAL',
  PRIMARY = 'PRIMARY',
  PRIMARY_LIGHT = 'PRIMARY_LIGHT',
  PRIMARY_DARK = 'PRIMARY_DARK',
  SECONDARY = 'SECONDARY',
  SECONDARY_LIGHT = 'SECONDARY_LIGHT',
  SECONDARY_DARK = 'SECONDARY_DARK'
}

interface ICompositeColorScheme {
  colorScheme: CompositionColor
  schemeMode?: 'light' | 'dark'
  reverseScheme?: boolean
}

export type {
  IClientColorScheme,
  IClientTextColor,
  IFallbackClientColorsProps,
  IClientColors,
  IParseColorsProps,
  IColorsTheme,
  ICompositeColorScheme
}
