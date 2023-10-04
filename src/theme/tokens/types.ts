type ISize =
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

type IBreakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

type ISpaces = Partial<Record<ISize, number>>

type IBreakpoints = Partial<Record<IBreakpoint, number>>

// TODO: improve
interface IInput {
  borderColor: string
  borderErrorColor: string
}

export type { ISize, ISpaces, IBreakpoints, IInput }
