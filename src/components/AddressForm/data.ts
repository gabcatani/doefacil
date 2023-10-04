import {
  Addresses_address_list_addresses,
  ConsumerAddressType
} from '#graphql/server'
import Nullable from '#types/Nullable'
import { cep } from '#utils/masks'

import { IAddressForm } from './types'

const addressDefaultValues: IAddressForm = {
  postalCode: '',
  cityName: '',
  neighborhood: '',
  street: '',
  number: '',
  complement: '',
  type: ConsumerAddressType.HOME,
  cityId: '',
  federativeUnit: ''
}

const addressParser = (
  addressData: Nullable<Addresses_address_list_addresses>
) => {
  if (addressData) {
    return {
      postalCode: cep(addressData.postalCode) ?? '',
      cityName: addressData.city?.name ?? '',
      neighborhood: addressData.neighborhood ?? '',
      street: addressData.street ?? '',
      number: addressData.number ?? '',
      complement: addressData.complement ?? '',
      type: ConsumerAddressType[addressData.type],
      cityId: addressData.city?.id.toString() ?? '',
      federativeUnit: addressData.city?.state?.federativeUnit ?? ''
    }
  }
  return undefined
}

export { addressDefaultValues, addressParser }
