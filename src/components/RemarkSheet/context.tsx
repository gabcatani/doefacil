import React, { createContext, useContext, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { TextInput } from 'react-native'

import { yupResolver } from '@hookform/resolvers/yup'
import { useCustomState } from '#hooks/data'

import {
  IRemarkForm,
  IRemarkSheetContextData,
  IRemarkSheetProps,
  IRemarkSheetState
} from './types'
import { remarkSchema } from './validation'

const RemarkSheetContext = createContext({} as IRemarkSheetContextData)

const RemarkSheetProvider: React.FC<IRemarkSheetProps> = ({
  children,
  ...props
}) => {
  const inputRef = useRef<TextInput>(null)
  const [state, updateState] = useCustomState<IRemarkSheetState>({
    isSaving: false,
    title: ''
  })

  useEffect(() => {
    updateState({
      title: props.remark ? 'screen.cart.edit_remark' : 'screen.cart.add_remark'
    })
  }, [props.remark])

  const defaultRemarkFormValues: IRemarkForm = {
    value: props.remark ?? ''
  }

  const form = useForm({
    defaultValues: defaultRemarkFormValues,
    mode: 'onSubmit',
    resolver: yupResolver(remarkSchema)
  })

  const handleSaveRemark = async (data: IRemarkForm) => {
    try {
      updateState({ isSaving: true })
      await props.onSave(data.value)
      props.onClose()
    } catch (e) {
      console.log('error on save remark', e)
    } finally {
      updateState({ isSaving: false })
    }
  }

  const onSave = form.handleSubmit(handleSaveRemark)

  useEffect(() => {
    if (props.isOpen) {
      form.reset(defaultRemarkFormValues)
    }
  }, [props.isOpen])

  const value: IRemarkSheetContextData = {
    inputRef,
    form,
    state,
    onSave,
    props: {
      isOpen: props.isOpen,
      onClose: props.onClose,
      remark: props.remark,
      focusInputOnEnter: props.focusInputOnEnter
    }
  }

  return (
    <RemarkSheetContext.Provider value={value}>
      {children}
    </RemarkSheetContext.Provider>
  )
}

const useRemarkSheet = (): IRemarkSheetContextData => {
  const context = useContext(RemarkSheetContext)

  if (!context)
    throw new Error('useRemarkSheet must be used within a RemarkSheetProvider')

  return context
}

export { RemarkSheetProvider, useRemarkSheet }
