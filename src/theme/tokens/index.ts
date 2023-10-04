import { IBreakpoints, IInput, ISpaces } from './types'

const spaces: ISpaces = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40
}

const breakpoint: IBreakpoints = {
  base: 0,
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1280,
  '2xl': 1490
}

const input: IInput = {
  borderColor: '#E2E8F0',
  borderErrorColor: '#ff0000'
}

export { spaces, breakpoint, input }
export * from './fonts'
