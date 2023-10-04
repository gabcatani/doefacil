import { Addresses_address_list_addresses } from '#graphql/server'
import Nullable from '#types/Nullable'

interface IAddressButtonProps {
  subtitle?: string
  placeholder: string
  onPress: VoidFunction
  address: Nullable<Addresses_address_list_addresses>
}

export type { IAddressButtonProps }
