import React, { useState } from 'react'

import { GoogleMap, LoadScript, Circle, Marker } from '@react-google-maps/api'
import { useSnackBar } from '#hooks/ui'
import { currentLanguage } from '#utils'
import { translate } from '#utils'
import { useTheme } from 'styled-components/native'

import { Container } from '#cmp'

import { ALLOWED_DISTANCE, LOCATION_DELTA, useMapView } from '../../context'
import Styles from '../../styles'
import { ICoords } from '../../types'

const GoogleMaps: React.FC = () => {
  const {
    initRegion,
    region,
    onConfirm,
    googleAPIKey,
    isOpen,
    isLoading,
    setInitRegion,
    isValidLocation
  } = useMapView()

  const lang = currentLanguage()
  const { showSnackbar } = useSnackBar()
  const theme = useTheme()
  const [instance, setInstance] = React.useState<google.maps.Map>()
  const [coords, setCoords] = useState<ICoords>({
    latitude: region?.latitude ?? 0,
    longitude: region?.longitude ?? 0
  })

  const onLoad = React.useCallback(
    function onLoad(map) {
      setInstance(map)
    },
    [setInstance]
  )

  const handleConfirm = () => {
    if (!coords) return
    if (!isValidLocation(coords)) {
      setInitRegion({
        longitude: initRegion?.longitude ?? 0,
        latitude: initRegion?.latitude ?? 0,
        longitudeDelta: LOCATION_DELTA,
        latitudeDelta: LOCATION_DELTA
      })
      instance?.panTo({
        lat: initRegion?.latitude ?? 0,
        lng: initRegion?.longitude ?? 0
      })
      showSnackbar(
        translate('screen.address_map.error_invalid_location'),
        'danger'
      )
      return
    }
    onConfirm({
      latitude: coords.latitude,
      longitude: coords.longitude
    })
  }

  if (!isOpen || isLoading) return null

  return (
    <Container>
      <LoadScript googleMapsApiKey={googleAPIKey} language={lang}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', aspectRatio: '1' }}
          zoom={18}
          center={{ lat: coords.latitude, lng: coords.longitude }}
          onLoad={onLoad}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false
          }}
          onCenterChanged={() => {
            const newCenter = instance?.getCenter()
            if (
              !newCenter ||
              (newCenter?.lat() === coords.latitude &&
                newCenter.lng() === coords.longitude)
            )
              return
            setCoords({
              latitude: newCenter?.lat() ?? coords.latitude,
              longitude: newCenter?.lng() ?? coords.longitude
            })
          }}
        >
          <Circle
            options={{
              strokeColor: theme.screens.addressMap.circleBorder,
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: theme.screens.addressMap.circleColor
            }}
            center={{
              lat: initRegion?.latitude ?? 0,
              lng: initRegion?.longitude ?? 0
            }}
            radius={ALLOWED_DISTANCE}
          />
          <Marker position={{ lat: coords.latitude, lng: coords.longitude }} />
        </GoogleMap>
      </LoadScript>
      <Container
        position="absolute"
        bottom={70}
        width="100%"
        alignItems="center"
        justifyItems="center"
      >
        <Styles.ConfirmButton
          onPress={handleConfirm}
          testID="confirm"
          accessibilityLabel="confirm"
        >
          screen.address_map.confirm
        </Styles.ConfirmButton>
      </Container>
    </Container>
  )
}

export { GoogleMaps }
