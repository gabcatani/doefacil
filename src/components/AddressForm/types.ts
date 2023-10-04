import { RefObject } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { TextInput } from 'react-native'

import {
  Addresses_address_list_addresses,
  ConsumerAddressType
} from '#graphql/server'

interface ICoordinates {
  lat: number
  lng: number
}

interface IAddressForm {
  id?: string
  postalCode: string
  street: string
  number: string
  neighborhood: string
  cityName?: string
  complement: string
  latitude?: number
  longitude?: number
  type: ConsumerAddressType
  federativeUnit: string
  cityId: string
  coordinates?: ICoordinates
  state?: string
}

interface IAddressFormRouteQuery {
  firstTime?: string
  saveOnCache?: string
  address?: string
  id?: string
}

type AddressFormSubmitEvent = () => Promise<IAddressForm>

interface IAddressFormStatus {
  isDirty: boolean
  isValid: boolean
  revalidateCoords: boolean
}

interface IAddressFormProps {
  show: boolean
  onLoaded?: VoidFunction
  onNextButtonChangeEnabled?: (enabled: boolean) => void
  onSubmit: (func: AddressFormSubmitEvent) => void
  onFormStatusChange?: (status: IAddressFormStatus) => void
  currentAddress?: Addresses_address_list_addresses
}

interface ICity {
  value: number
  label: string
}

interface IState {
  cities: ICity[]
  label: string
  value: number
}

interface IAddressFormContextData {
  show: boolean
  onNext: (ref: RefObject<TextInput>) => VoidFunction
  form: UseFormReturn<IAddressForm, object>
  isHomeActive: boolean
  isWorkActive: boolean
  isOtherActive: boolean
  isPostalCodeLoading: boolean
  showNoStoresSheet: boolean
  onHomePress: VoidFunction
  onWorkPress: VoidFunction
  onOtherPress: VoidFunction
  onPostalCodeChange: (text: string) => void
  onCloseNoStoresSheet: VoidFunction
  numberRef: RefObject<TextInput>
  typeRef: RefObject<TextInput>
  postalCodeRef: RefObject<TextInput>
  streetRef: RefObject<TextInput>
  neighborhoodRef: RefObject<TextInput>
  cityNameRef: RefObject<TextInput>
  complementRef: RefObject<TextInput>
  latitudeRef: RefObject<TextInput>
  longitudeRef: RefObject<TextInput>
  federativeUnitRef: RefObject<TextInput>
  cityIdRef: RefObject<TextInput>
  resetForm: () => void
  cityNameIsEnabled: boolean
  states: IState[]
  citiesParser: ICity[]
  fetched: boolean
}

interface IShimmerProps {
  fetched: boolean
}

export type {
  IAddressFormProps,
  IAddressForm,
  IAddressFormContextData,
  AddressFormSubmitEvent,
  ICity,
  IState,
  IAddressFormRouteQuery,
  IShimmerProps
}
