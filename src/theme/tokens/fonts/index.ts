import { Platform } from 'react-native'

import { IFontFamily, IFontSizes, IFontStyles, IFontWeights } from './types'

const fontSizes: IFontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 30,
  '5xl': 36,
  '6xl': 48,
  '7xl': 60,
  '8xl': 72,
  '9xl': 96
}

const _parseFontFamily = (fontFamily: IFontFamily) => {
  if (Platform.OS === 'web') return 'Poppins'

  return fontFamily
}

const fontWeights: IFontWeights = {
  '400': {
    fontFamily: _parseFontFamily('poppins'),
    fontWeight: '400'
  },
  '500': {
    fontFamily: _parseFontFamily('poppins-medium'),
    fontWeight: '500'
  },
  '600': {
    fontFamily: _parseFontFamily('poppins-semibold'),
    fontWeight: '600'
  },
  '700': {
    fontFamily: _parseFontFamily('poppins-bold'),
    fontWeight: '700'
  }
}

const fontStyles: IFontStyles = {
  italic: {
    fontFamily: _parseFontFamily('poppins-italic'),
    fontStyle: 'italic'
  }
}

export * from './types'
export { fontSizes, fontWeights, fontStyles }
