import React from 'react'

import BottomSheet from '../BottomSheetNew'
import Button from '../Button'
import Container from '../Container'
import Input from '../Input'
import { RemarkSheetProvider, useRemarkSheet } from './context'
import { IRemarkSheetProps } from './types'

const RemarkSheetComponent: React.FC = () => {
  const { props, inputRef, form, state, onSave } = useRemarkSheet()

  React.useEffect(() => {
    if (props.isOpen && props.focusInputOnEnter !== false && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [props.isOpen, inputRef.current])

  return (
    <BottomSheet
      open={props.isOpen}
      onClose={props.onClose}
      title={state.title}
    >
      <Container>
        <Input
          label=""
          name="value"
          control={form.control}
          placeholder={props.placeholder}
          ref={inputRef}
          returnKeyType="done"
          bottomSheet
          height={70}
          multiline
          testID="remarkInput"
          accessibilityLabel="remarkInput"
        />
        <Button
          accessibilityLabel="save_remark"
          testID="save_remark"
          onPress={onSave}
          loading={state.isSaving}
        >
          component.button.save
        </Button>
      </Container>
    </BottomSheet>
  )
}

const RemarkSheet: React.FC<IRemarkSheetProps> = prop => {
  return (
    <RemarkSheetProvider {...prop}>
      <RemarkSheetComponent />
    </RemarkSheetProvider>
  )
}

export default RemarkSheet
