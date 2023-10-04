import React from 'react'

import AddressList from '../AddressList'
import BottomSheet from '../BottomSheet'
import { AddressBottomSheetProvider, useAddressBottomSheet } from './context'
import { IAddressBottomSheetProps } from './types'

const AddressBottomSheetComponent: React.FC = () => {
  const { list, isOpen, onClose, onAddNew, onChange, isFetched, current } =
    useAddressBottomSheet()

  return (
    <BottomSheet
      open={isOpen}
      onClose={onClose}
      title="screen.cart.select_address"
    >
      <AddressList
        type="bottomSheet"
        data={list}
        isFetched={isFetched}
        showAddNew={list.length < 10}
        onAddNew={onAddNew}
        onPress={onChange}
        onPressRadioButton={onChange}
        currentAddressId={current?.id}
      />
    </BottomSheet>
  )
}

const AddressBottomSheet: React.FC<IAddressBottomSheetProps> = props => {
  return (
    <AddressBottomSheetProvider {...props}>
      <AddressBottomSheetComponent />
    </AddressBottomSheetProvider>
  )
}

export default AddressBottomSheet
