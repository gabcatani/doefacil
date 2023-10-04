import { ICoordinates } from '#data/model'
import Nullable from '#types/Nullable'
import { LatLngLiteral } from 'leaflet'

interface ICoords {
  latitude: number
  longitude: number
}

interface IRegion {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

interface MapEventsProps {
  setPosition: React.Dispatch<React.SetStateAction<LatLngLiteral>>
  center: LatLngLiteral
  position: LatLngLiteral
}

interface IMapViewProps {
  onConfirm: (coords: ICoordinates) => void
  coords: Nullable<ICoordinates>
  isOpen: boolean
  onClose: VoidFunction
  useGoogleMaps?: boolean
}

interface IMapViewContextData {
  initRegion: Nullable<IRegion>
  region: Nullable<IRegion>
  isOpen: boolean
  isLoading: boolean
  googleAPIKey: string
  useGoogleMaps: boolean
  onConfirm: (coords: ICoords) => void
  isValidLocation: (newCoords: ICoords) => boolean
  onClose: VoidFunction
  setRegion: React.Dispatch<React.SetStateAction<Nullable<IRegion>>>
  setInitRegion: React.Dispatch<React.SetStateAction<Nullable<IRegion>>>
}

export type {
  IMapViewProps,
  ICoords,
  IMapViewContextData,
  IRegion,
  MapEventsProps
}
