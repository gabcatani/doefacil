import React from 'react'
import { Freeze } from 'react-freeze'
import { ActivityIndicator } from 'react-native'

import { translate } from '#utils'
import dynamic from 'next/dynamic'
import { useTheme } from 'styled-components/native'

import { Visibility } from '#cmp'
import WebModalComponent from '#cmp/web/Modal'

import Container from '../Container'
import { GoogleMaps } from './components/GoogleMaps'
import { MapViewProvider, useMapView } from './context'
import { IMapViewProps } from './types'

const MapViewScreen: React.FC = () => {
  const { isOpen, onClose, isLoading, useGoogleMaps = false } = useMapView()

  const theme = useTheme()

  if (!isOpen || isLoading) return null

  const LeafletMap = dynamic(() => import('./components/LeafletMaps'), {
    ssr: false
  })

  return (
    <WebModalComponent
      title={translate('component.map_view.title')}
      open={isOpen}
      onOpenChange={onClose}
      canClose
      maxWidth={800}
    >
      <Freeze
        freeze={isLoading}
        placeholder={
          <Container flex={1} justifyContent="center" alignItems="center">
            <ActivityIndicator
              color={theme.colors.client.primary.backgroundColor}
              size="large"
            />
          </Container>
        }
      >
        <Visibility.Root>
          <Visibility.Case condition={!useGoogleMaps}>
            <LeafletMap />
          </Visibility.Case>
          <Visibility.Default>
            <GoogleMaps />
          </Visibility.Default>
        </Visibility.Root>
      </Freeze>
    </WebModalComponent>
  )
}

const MapView: React.FC<IMapViewProps> = props => {
  return (
    <MapViewProvider {...props}>
      <MapViewScreen />
    </MapViewProvider>
  )
}

export default MapView
