type IFontFamily =
  | 'poppins'
  | 'poppins-medium'
  | 'poppins-semibold'
  | 'poppins-bold'
  | 'poppins-italic'
  | 'Poppins'

type IFontSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl'

type IFontSizes = Record<IFontSize, number>

type IFontWeight = '400' | '500' | '600' | '700'

type IFontWeights = Record<
  IFontWeight,
  { fontFamily: IFontFamily; fontWeight: IFontWeight }
>

type IFontStyle = 'normal' | 'italic'

type IFontStyles = Partial<
  Record<IFontStyle, { fontFamily: IFontFamily; fontStyle: IFontStyle }>
>

export type {
  IFontFamily,
  IFontSize,
  IFontSizes,
  IFontWeight,
  IFontWeights,
  IFontStyle,
  IFontStyles
}
