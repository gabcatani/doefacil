import React from 'react'

import { Portal } from '@gorhom/portal'
import { translate } from '#utils'

import AddressList from '../AddressList'
import BottomSheet from '../BottomSheetNew'
import Container from '../Container'
import { AddressBottomSheetProvider, useAddressBottomSheet } from './context'
import { IAddressBottomSheetProps } from './types'

const AddressBottomSheetComponent: React.FC = () => {
  const {
    isFetched,
    list,
    isOpen,
    onClose,
    onAddNew,
    onChange,
    current,
    showAddNew
  } = useAddressBottomSheet()

  if (!isOpen) return null

  return (
    <Portal hostName="BottomSheetHost">
      <BottomSheet
        open={isOpen}
        onClose={onClose}
        title="screen.cart.select_address"
      >
        <Container
          flex={1}
          testID={translate(
            `accessibility.component.address_bottom_sheet.container`
          )}
          accessibilityLabel={translate(
            `accessibility.component.address_bottom_sheet.container`
          )}
        >
          <AddressList
            type="bottomSheet"
            data={list}
            isFetched={isFetched}
            onAddNew={onAddNew}
            onPress={onChange}
            onPressRadioButton={onChange}
            currentAddressId={current?.id}
            showAddNew={showAddNew}
            halfScreenHeigth
          />
        </Container>
      </BottomSheet>
    </Portal>
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
