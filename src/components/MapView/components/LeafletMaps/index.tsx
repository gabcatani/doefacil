import React, { useEffect, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  useMapEvents,
  useMap
} from 'react-leaflet'

import Images from '#res/images'
import { icon } from 'leaflet'
import { useTheme } from 'styled-components/native'

import Container from '../../../Container'
import { ALLOWED_DISTANCE, useMapView } from '../../context'
import Styles from '../../styles'
import { MapEventsProps } from '../../types'

const MapEvents = ({ setPosition, center, position }: MapEventsProps) => {
  const map = useMap()
  useMapEvents({
    move: event => {
      setPosition(event.target.getCenter())
    }
  })
  useEffect(() => {
    if (map.getCenter().distanceTo(center) > ALLOWED_DISTANCE) {
      setPosition(center)
      map.flyTo(center, 18, { duration: 0.5 })
      return
    }
  }, [position])
  return null
}

const LeafletMaps: React.FC = () => {
  const theme = useTheme()
  const { initRegion, region, onConfirm } = useMapView()
  const center = { lat: region?.latitude ?? 0, lng: region?.longitude ?? 0 }
  const [position, setPosition] = useState(center)
  const ICON = icon({
    iconUrl: Images.Marker,
    iconSize: [25, 40],
    iconAnchor: [12.5, 40]
  })

  return (
    <Container>
      <Container>
        <MapContainer
          style={{ width: '100%', aspectRatio: '1' }}
          center={center}
          zoom={18}
          minZoom={16}
          maxZoom={18}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
          <MapEvents
            setPosition={setPosition}
            center={center}
            position={position}
          />
          <Circle
            center={{
              lat: initRegion?.latitude ?? 0,
              lng: initRegion?.longitude ?? 0
            }}
            radius={ALLOWED_DISTANCE}
            pathOptions={{
              color: theme.screens.addressMap.circleBorder,
              opacity: 0.8,
              weight: 2,
              fillColor: theme.screens.addressMap.circleColor
            }}
          />
          <Marker icon={ICON} position={position} />
        </MapContainer>
      </Container>
      <Container
        position="absolute"
        bottom={32}
        width="100%"
        alignItems="center"
        justifyItems="center"
      >
        <Styles.ConfirmButton
          onPress={() =>
            onConfirm({ latitude: position.lat, longitude: position.lng })
          }
          testID="confirm"
          accessibilityLabel="confirm"
        >
          screen.address_map.confirm
        </Styles.ConfirmButton>
      </Container>
    </Container>
  )
}

export default LeafletMaps
