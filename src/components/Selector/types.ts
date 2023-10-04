import { CompositionColor } from '#graphql/server'
import { DefaultTheme } from 'styled-components/native'

interface IOption {
  title: string
  element: React.ReactElement
}

interface ISelectorProps {
  options: IOption[]
  onChange: (index: number) => void
  initialIndex?: number
  card?: boolean
  activeColor?: CompositionColor
}

interface ISwitchProps {
  active: boolean
  activeColor: keyof Pick<
    DefaultTheme['colors']['client'],
    'primary' | 'secondary'
  >
}

export type { ISelectorProps, ISwitchProps, IOption }
