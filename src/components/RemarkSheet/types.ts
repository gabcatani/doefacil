import { UseFormReturn } from 'react-hook-form'
import { TextInput } from 'react-native'

interface IRemarkSheetState {
  isSaving: boolean
  title: string
}

interface IRemarkSheetContextData {
  inputRef: React.RefObject<TextInput>
  form: UseFormReturn<IRemarkForm, object>
  props: Omit<IRemarkSheetProps, 'onSave'>
  state: IRemarkSheetState
  onSave: VoidFunction
}

interface IRemarkSheetProps {
  remark: string
  focusInputOnEnter?: boolean
  isOpen: boolean
  placeholder?: string
  onClose: VoidFunction
  onSave: (value: string) => Promise<void>
}

interface IRemarkForm {
  value: string
}

export type {
  IRemarkSheetContextData,
  IRemarkSheetProps,
  IRemarkForm,
  IRemarkSheetState
}
