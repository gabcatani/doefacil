import { Addresses_address_list_addresses } from '#graphql/server'
import Nullable from '#types/Nullable'

interface IAddressBottomSheetProps {
  current: Nullable<Addresses_address_list_addresses>
  isOpen: boolean
  saveOnCache?: boolean
  onClose: VoidFunction
  onChange: (data: Addresses_address_list_addresses) => void
}

interface IAddressBottomSheetContextData {
  current: Nullable<Addresses_address_list_addresses>
  isFetched: boolean
  isOpen: boolean
  isOpenSheet: boolean
  list: Addresses_address_list_addresses[]
  onAddNew: VoidFunction
  onClose: VoidFunction
  onChange: (data: Addresses_address_list_addresses) => void
  showAddNew: boolean
}

export type { IAddressBottomSheetProps, IAddressBottomSheetContextData }
