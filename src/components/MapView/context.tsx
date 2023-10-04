import React, { createContext, useContext, useEffect, useState } from 'react'
import { Platform } from 'react-native'

import { useApp } from '#contexts/app'
import Nullable from '#types/Nullable'
import { getDistance } from 'geolib'

import { IMapViewContextData, IMapViewProps, IRegion, ICoords } from './types'

const MapViewContext = createContext({} as IMapViewContextData)

export const LOCATION_DELTA = 0.007
export const ALLOWED_DISTANCE = 2000

const MapViewProvider: React.FC<IMapViewProps> = ({
  children,
  onConfirm,
  coords,
  isOpen,
  onClose,
  useGoogleMaps = true
}) => {
  const { company } = useApp()
  const [initRegion, setInitRegion] = useState<Nullable<IRegion>>()
  const [region, setRegion] = useState<Nullable<IRegion>>()
  const [isLoading, setLoading] = useState(true)

  const googleAPIKey =
    (Platform.OS === 'web'
      ? company?.googleApiKeyWeb
      : company?.googleApiKey) || ''

  useEffect(() => {
    if (!coords) return
    const center: IRegion = {
      latitude: coords.lat,
      longitude: coords.lng,
      latitudeDelta: LOCATION_DELTA,
      longitudeDelta: LOCATION_DELTA
    }
    setInitRegion(center)
    setRegion(center)
    setLoading(false)
  }, [coords])

  const isValidLocation = (newCoords: ICoords) => {
    const distance = getDistance(
      {
        latitude: newCoords.latitude,
        longitude: newCoords.longitude
      },
      { latitude: initRegion!.latitude, longitude: initRegion!.longitude }
    )

    return distance <= ALLOWED_DISTANCE
  }

  const handleConfirm = ({ latitude, longitude }: ICoords) => {
    onConfirm({
      lat: latitude,
      lng: longitude
    })
  }

  const value: IMapViewContextData = {
    initRegion,
    region,
    googleAPIKey,
    isOpen,
    isLoading,
    onConfirm: handleConfirm,
    onClose,
    setRegion,
    setInitRegion,
    isValidLocation,
    useGoogleMaps
  }

  return (
    <MapViewContext.Provider value={value}>{children}</MapViewContext.Provider>
  )
}

const useMapView = (): IMapViewContextData => {
  const context = useContext(MapViewContext)

  if (!context)
    throw new Error('useMapView must be used within a MapViewProvider')

  return context
}

export { MapViewProvider, useMapView }
