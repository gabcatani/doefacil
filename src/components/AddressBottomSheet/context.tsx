import React, { createContext, useContext, useEffect } from 'react'
import { Platform } from 'react-native'

import { useConsumer } from '#contexts/consumer'
import {
  Addresses_address_list_addresses,
  useAddressLazyQuery
} from '#graphql/server'
import useRouter from '#nav/utils/useRouter'
import { AppEvents, Emitter } from '#utils'

import {
  IAddressBottomSheetContextData,
  IAddressBottomSheetProps
} from './types'

const AddressBottomSheetContext = createContext(
  {} as IAddressBottomSheetContextData
)

const AddressBottomSheetProvider: React.FC<IAddressBottomSheetProps> = ({
  saveOnCache,
  children,
  ...props
}) => {
  const [getAddresses, addressResponse] = useAddressLazyQuery({
    onError: error => {
      console.log('error on consulting addresses', error)
    },
    onCompleted: data => {
      setList(data?.address_list.addresses ?? [])
    }
  })
  const [list, setList] = React.useState<Addresses_address_list_addresses[]>([])
  const router = useRouter()
  const { isLoggedIn, saveAddressCache, favoriteStore } = useConsumer()

  const [isOpenSheet, setIsOpenSheet] = React.useState(props.isOpen)

  useEffect(() => {
    load()
    Emitter.on(AppEvents.onCreateAddress, handleChange)

    return () => {
      Emitter.off(AppEvents.onCreateAddress, handleChange)
    }
  }, [isLoggedIn])

  const load = async () => {
    try {
      if (isLoggedIn) {
        await getAddresses()
      } else {
        setList([])
      }
    } catch (e) {
      console.log('error on query addresses', e)
    }
  }

  const handleAddNew = () => {
    if (Platform.OS === 'web') {
      router.push(`/${favoriteStore?.slug}/conta/endereco`, {
        query: { saveOnCache: saveOnCache }
      })
    } else {
      router.push(`/address_form?saveOnCache=${saveOnCache}`)
    }
    props.onClose()
    setIsOpenSheet(false)
  }

  const handleChange = (address: Addresses_address_list_addresses) => {
    if (saveOnCache) {
      saveAddressCache(address)
    }

    props.onChange(address)
    props.onClose()
    setIsOpenSheet(false)
  }

  useEffect(() => {
    props.isOpen && setIsOpenSheet(true)
  }, [props.isOpen])

  const value: IAddressBottomSheetContextData = {
    ...props,
    isOpenSheet,
    isFetched: !addressResponse.loading,
    list,
    onAddNew: handleAddNew,
    onChange: handleChange,
    showAddNew: isLoggedIn && list.length < 10
  }

  return (
    <AddressBottomSheetContext.Provider value={value}>
      {children}
    </AddressBottomSheetContext.Provider>
  )
}

const useAddressBottomSheet = (): IAddressBottomSheetContextData => {
  const context = useContext(AddressBottomSheetContext)

  if (!context)
    throw new Error(
      'useAddressBottomSheet must be used within a AddressBottomSheetProvider'
    )

  return context
}

export { AddressBottomSheetProvider, useAddressBottomSheet }
