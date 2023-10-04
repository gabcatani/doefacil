import { IContainerProps } from '../Container/types'

interface ISwitchProps extends IContainerProps {
  value: boolean
  label: string
  onPress: (value: boolean) => void
}

export type { ISwitchProps }
