import React, {
  createContext,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { useForm } from 'react-hook-form'
import { TextInput } from 'react-native'

import { yupResolver } from '@hookform/resolvers/yup'
import { useApp } from '#contexts/app'
import { useConsumer } from '#contexts/consumer'
import { Service, useInjection } from '#data'
import { IAddress } from '#data/model'
import { IPostalCodeService } from '#data/services/IPostalCodeService'
import { ConsumerAddressType } from '#graphql/server'
import { useSnackBar } from '#hooks/ui'
import useRouter from '#nav/utils/useRouter'
import cities from '#res/files/cities.json'
import { cep } from '#utils/masks'

import { addressDefaultValues, addressParser } from './data'
import {
  IAddressForm,
  IAddressFormContextData,
  IAddressFormProps,
  IAddressFormRouteQuery,
  ICity
} from './types'
import addressValidation from './validation'

const AddressFormContext = createContext({} as IAddressFormContextData)

const AddressFormProvider: React.FC<IAddressFormProps> = ({
  children,
  onLoaded,
  onSubmit,
  onNextButtonChangeEnabled,
  onFormStatusChange,
  show,
  currentAddress
}) => {
  const [isLoading, setLoading] = useState(true)
  const { isLoggedIn } = useConsumer()
  const { company } = useApp()

  const hasCoordinates =
    !!currentAddress?.coordinates?.lat && !!currentAddress?.coordinates?.lng

  const form = useForm<IAddressForm>({
    defaultValues:
      currentAddress && !isLoggedIn
        ? addressParser(currentAddress)
        : addressDefaultValues,
    mode: 'all',

    resolver: yupResolver(addressValidation)
  })

  useEffect(() => {
    try {
      setLoading(true)
      if (!currentAddress) return
      setCityNameIsEnabled(true)
      form.reset(
        {
          id: currentAddress.id,
          cityId: currentAddress.city?.id,
          cityName: currentAddress.city?.name,
          complement: currentAddress.complement ?? '',
          coordinates: currentAddress.coordinates ?? undefined,
          federativeUnit: currentAddress.city?.state?.federativeUnit ?? '',
          latitude: currentAddress.coordinates?.lat ?? undefined,
          longitude: currentAddress.coordinates?.lng ?? undefined,
          neighborhood: currentAddress.neighborhood,
          number: currentAddress.number ?? '',
          postalCode: cep(currentAddress.postalCode),
          state: currentAddress.city?.state?.federativeUnit ?? '',
          street: currentAddress.street,
          type: currentAddress.type
        },
        { keepDirty: true }
      )
    } finally {
      setTimeout(() => setLoading(false), 100)
    }
  }, [currentAddress?.id])

  const router = useRouter<IAddressFormRouteQuery>()

  const saveOnCache = router.query?.saveOnCache

  const { showSnackbar } = useSnackBar()

  const [isPostalCodeLoading, setPostalCodeLoading] = useState(false)
  const [showNoStoresSheet, setShowNoStoresSheet] = useState(false)
  const timeout = useRef<NodeJS.Timeout | null>(null)

  const [cityNameIsEnabled, setCityNameIsEnabled] = useState(true)
  const [citiesParser, setCitiesParser] = useState<ICity[]>([])

  const numberRef = useRef<TextInput>(null)
  const typeRef = useRef<TextInput>(null)
  const postalCodeRef = useRef<TextInput>(null)
  const streetRef = useRef<TextInput>(null)
  const neighborhoodRef = useRef<TextInput>(null)
  const cityNameRef = useRef<TextInput>(null)
  const complementRef = useRef<TextInput>(null)
  const latitudeRef = useRef<TextInput>(null)
  const longitudeRef = useRef<TextInput>(null)
  const federativeUnitRef = useRef<TextInput>(null)
  const cityIdRef = useRef<TextInput>(null)

  const postalCodeService = useInjection<IPostalCodeService>(Service.PostalCode)
  const cityWatch = form.watch('cityId')
  const federativeUnitWatch = form.watch('state')
  const handleHomePress = () => {
    form.setValue('type', ConsumerAddressType.HOME, {
      shouldDirty: true,
      shouldValidate: true
    })
  }

  const handleWorkPress = () => {
    form.setValue('type', ConsumerAddressType.WORK, {
      shouldDirty: true,
      shouldValidate: true
    })
  }

  const handleOtherPress = () => {
    form.setValue('type', ConsumerAddressType.OTHER, {
      shouldDirty: true,
      shouldValidate: true
    })
  }

  const handlePostalCodeChange = (text: string) => {
    if (!text) resetForm()
    if (text.length < 9) return

    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(async () => {
      try {
        setPostalCodeLoading(true)
        const response = await postalCodeService.getAddress(text)
        form.setValue('street', response.street, { shouldValidate: true })
        form.setValue('neighborhood', response.neighborhood, {
          shouldValidate: true
        })
        form.setValue('federativeUnit', response.city.state!.federativeUnit, {
          shouldValidate: true
        })
        form.setValue(
          'cityName',
          `${response.city.name}${
            response.city.state?.federativeUnit
              ? `, ${response.city.state.federativeUnit}`
              : ''
          }`,
          { shouldValidate: true }
        )

        form.setValue('cityId', response.id ?? '', { shouldValidate: true })
        setCityNameIsEnabled(true)
      } catch (e) {
        resetForm(text)
        setCityNameIsEnabled(false)
      } finally {
        setPostalCodeLoading(false)
      }
    }, 200)
  }

  const onCloseNoStoresSheet = () => {
    setShowNoStoresSheet(false)
  }

  useEffect(() => {
    if (cityNameIsEnabled) return
    if (!federativeUnitWatch) {
      form.setValue('state', '', { shouldValidate: true })
      form.setValue('cityId', '', { shouldValidate: true })
      form.setValue('cityName', '', { shouldValidate: true })
      return
    }

    const stateParser = cities.find(
      state => state.value.toString() === federativeUnitWatch.toString()
    )
    form.setValue('cityName', '')
    form.setValue('federativeUnit', stateParser?.label ?? '')

    setCitiesParser(
      stateParser?.cities.sort((x, z) => {
        if (
          x.label.normalize('NFD').replace(/[\u0300-\u036f]/g, '') <
          z.label.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        ) {
          return -1
        }
        if (
          x.label.normalize('NFD').replace(/[\u0300-\u036f]/g, '') >
          z.label.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        ) {
          return 1
        }
        return 0
      }) ?? []
    )
  }, [federativeUnitWatch])

  useEffect(() => {
    if (!federativeUnitWatch) return
    else if (!cityWatch) {
      form.setValue('cityId', '', { shouldValidate: true })
      form.setValue('cityName', '', { shouldValidate: true })
    } else {
      const city = cities
        .find(
          state => state.value.toString() === federativeUnitWatch.toString()
        )
        ?.cities.find(city => city.value.toString() === cityWatch.toString())

      city?.label &&
        form.setValue('cityName', city.label, { shouldValidate: true })
    }
  }, [cityWatch])

  const resetForm = (postalCode = '') => {
    form.reset({
      cityName: '',
      complement: '',
      street: '',
      state: '',
      postalCode: postalCode,
      number: '',
      federativeUnit: '',
      cityId: '',
      neighborhood: '',
      coordinates: undefined,
      latitude: undefined,
      longitude: undefined,
      type: ConsumerAddressType.HOME
    })
  }

  const type = ConsumerAddressType[form.watch('type')]

  const isHomeActive = type === ConsumerAddressType.HOME
  const isWorkActive = type === ConsumerAddressType.WORK
  const isOtherActive = type === ConsumerAddressType.OTHER

  const handleOnNext = (ref: RefObject<TextInput>) => {
    return () => {
      ref.current?.focus()
    }
  }

  const submitForm = () => {
    return new Promise<IAddressForm>((res, rej) => {
      const handleSubmit = form.handleSubmit(
        values => {
          res(values)
        },
        () => rej()
      )

      handleSubmit()
    })
  }

  const revalidateCoords = () => {
    const { cityName, postalCode, neighborhood, street, number } =
      form.formState.dirtyFields
    return !!(cityName || postalCode || neighborhood || street || number)
  }

  useEffect(() => {
    onSubmit(submitForm)
  }, [])

  useEffect(() => {
    if (show && onLoaded) onLoaded()
  }, [show])

  useEffect(() => {
    if (onNextButtonChangeEnabled && show) {
      onNextButtonChangeEnabled(form.formState.isValid)
    }
  }, [form.formState.isValid, show])

  useEffect(() => {
    if (onFormStatusChange) {
      const shouldOpenMap =
        company?.filterByGeoLocalization &&
        (revalidateCoords() || !hasCoordinates)
      onFormStatusChange({
        isDirty: form.formState.isDirty,
        isValid: form.formState.isValid,
        revalidateCoords: !!shouldOpenMap
      })
    }
  }, [
    form.formState.isDirty,
    form.formState.isValid,
    company?.filterByGeoLocalization,
    hasCoordinates
  ])

  useEffect(() => {
    if (router.isReady && router.query) {
      try {
        if (!router.query.address) return
        const queryValue = JSON.parse(router.query.address) as IAddress
        if (
          queryValue.postalCode.length > 0 &&
          queryValue.postalCode.length < 9
        ) {
          queryValue.postalCode = cep(queryValue.postalCode)
        }
        const formValues: IAddressForm = {
          ...queryValue,
          type: ConsumerAddressType.HOME,
          cityName: `${queryValue.city.name}`,
          cityId: queryValue.city.id,
          id: queryValue.id ?? '',
          federativeUnit: queryValue.city.state
            ? `${queryValue.city.state.federativeUnit}`
            : '',
          latitude: queryValue.coordinates?.lat,
          longitude: queryValue.coordinates?.lng,
          coordinates: queryValue.coordinates ?? undefined
        }

        form.reset(formValues)
      } catch (e) {
        showSnackbar(e.message, 'danger')
      }
    }
  }, [router.isReady])

  useEffect(() => {
    saveOnCache && resetForm()
  }, [saveOnCache])

  const value: IAddressFormContextData = {
    form,
    show,
    onNext: handleOnNext,
    onHomePress: handleHomePress,
    onWorkPress: handleWorkPress,
    onOtherPress: handleOtherPress,
    onPostalCodeChange: handlePostalCodeChange,
    isHomeActive,
    isWorkActive,
    isOtherActive,
    isPostalCodeLoading,
    showNoStoresSheet,
    onCloseNoStoresSheet,
    numberRef,
    typeRef,
    postalCodeRef,
    streetRef,
    neighborhoodRef,
    cityNameRef,
    complementRef,
    latitudeRef,
    longitudeRef,
    federativeUnitRef,
    cityIdRef,
    resetForm,
    cityNameIsEnabled,
    states: cities,
    citiesParser,
    fetched: !isLoading
  }

  return (
    <AddressFormContext.Provider value={value}>
      {children}
    </AddressFormContext.Provider>
  )
}

const useAddressForm = (): IAddressFormContextData => {
  const context = useContext(AddressFormContext)

  if (!context)
    throw new Error('useAddressForm must be used within a AddressFormProvider')

  return context
}

export { AddressFormProvider, useAddressForm }
