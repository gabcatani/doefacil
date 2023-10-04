import { Addresses_address_list_addresses } from '#graphql/server'

import { AddressItemType } from '../AddressItem/types'

interface IAddressListProps {
  currentAddressId?: string
  data: Addresses_address_list_addresses[]
  isFetched: boolean
  type: AddressItemType
  showAddNew?: boolean
  onAddNew: VoidFunction
  onPress: (address: Addresses_address_list_addresses) => void
  onPressRadioButton?: (address: Addresses_address_list_addresses) => void
  onPressMoreButton?: (address: Addresses_address_list_addresses) => void
  halfScreenHeigth?: boolean
}

export type { IAddressListProps }
