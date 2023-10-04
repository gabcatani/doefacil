import { Addresses_address_list_addresses } from '#graphql/server'

type AddressItemType = 'bottomSheet' | 'list' | 'icon'

interface IAddressItemProps {
  currentAddressId?: string
  data: Addresses_address_list_addresses
  type: AddressItemType
  onPress?: (address: Addresses_address_list_addresses) => void
  onPressRadioButton?: (address: Addresses_address_list_addresses) => void
  onPressMoreButton?: (address: Addresses_address_list_addresses) => void
}

export type { IAddressItemProps, AddressItemType }
