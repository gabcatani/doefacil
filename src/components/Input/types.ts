import { Control } from 'react-hook-form'
import { TextInputProps } from 'react-native'

import { LayoutProps, PaddingProps } from 'styled-system'

import { IContainerProps } from '../Container/types'
interface ITextInputProps extends TextInputProps, LayoutProps, PaddingProps {
  hasError?: boolean
  disabled?: boolean
}

interface IInputProps extends ITextInputProps {
  label: string
  ContainerProps?: IContainerProps
  ErrorContainerProps?: IContainerProps
  SuffixComponent?: React.FC
  AfterComponent?: React.FC
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, object>
  showError?: boolean
  loading?: boolean
  /**
   * Does not work for android.
   */
  isUppercase?: boolean
  /**
   * Does not work for android.
   */
  removeAccents?: boolean
  testID: string
  accessibilityLabel: string
  mask?:
    | 'CEP'
    | 'CPF'
    | 'CNPJ'
    | 'CURRENCY'
    | 'CREDIT_CARD'
    | 'EXPIRATION_DATE'
    | 'DATE'
    | 'PHONE'
    | 'USERNAME'
    | 'CPF_CNPJ'
    | 'NO_SPECIAL_CHARACTERS'
    | 'ONLY_NUMBERS'
  bottomSheet?: boolean
  canClear?: boolean
  required?: boolean
  characterCount?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InputRef = any

export type { ITextInputProps, IInputProps, InputRef }
