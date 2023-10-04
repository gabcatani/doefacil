import { Control } from 'react-hook-form'
import { TextInputProps } from 'react-native'

import { LayoutProps } from 'styled-system'

import { IContainerProps } from '#cmp/Container/types'

interface IItems {
  value: number
  label: string
}
interface ISelectProps extends TextInputProps, LayoutProps {
  label: string
  inputAccessibilityLabel: string
  inputTestID: string
  flex?: number
  items: IItems[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, object>
  ContainerProps?: IContainerProps
  name: string
  disabled?: boolean
}

interface ISelectStyleProps {
  hasError: boolean
  disabled?: boolean
}

export type { ISelectProps, IItems, ISelectStyleProps }
