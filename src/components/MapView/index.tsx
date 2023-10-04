import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator,
  Modal
} from 'react-native'
import RNMapView, { Circle, PROVIDER_GOOGLE } from 'react-native-maps'

import images from '#res/images'
import { useTheme } from 'styled-components/native'

import { ModalHeader, SafeAreaView, Visibility } from '#cmp'

import Container from '../Container'
import {
  ALLOWED_DISTANCE,
  LOCATION_DELTA,
  MapViewProvider,
  useMapView
} from './context'
import S from './styles'
import { ICoords, IMapViewProps } from './types'

const MapViewScreen: React.FC = () => {
  const {
    initRegion,
    onConfirm,
    isOpen,
    onClose,
    isLoading,
    region,
    setInitRegion,
    isValidLocation
  } = useMapView()
  const height = Dimensions.get('screen').height
  const circleRef = useRef<InstanceType<typeof Circle>>(null)
  const mapViewRef = useRef<RNMapView>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const theme = useTheme()
  const isMapLoaded = useRef(false)
  const [coords, setCoords] = useState<ICoords>({
    latitude: region?.latitude ?? 0,
    longitude: region?.longitude ?? 0
  })

  const refreshMarker = () => {
    timeoutRef.current = setTimeout(() => {
      const view = circleRef.current as unknown as View
      view.setNativeProps({
        fillColor: theme.screens.addressMap.circleColor
      })
      mapViewRef.current!.forceUpdate()
    }, 2000)
  }

  const refreshMap = () => {
    if (initRegion && mapViewRef.current) {
      mapViewRef.current.animateToRegion(initRegion)
    }
    setCoords({
      latitude: initRegion?.latitude ?? 0,
      longitude: initRegion?.longitude ?? 0
    })
  }

  const handleMapLoaded = () => {
    if (isMapLoaded.current) return
    setTimeout(refreshMap, 100)
    isMapLoaded.current = true
  }

  useEffect(() => {
    if (!isOpen || isLoading) return
    refreshMarker()
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [isOpen, isLoading])

  const handleConfirm = () => {
    console.log(coords)
    if (!coords) return
    if (!isValidLocation(coords)) {
      setInitRegion({
        longitude: initRegion?.longitude ?? 0,
        latitude: initRegion?.latitude ?? 0,
        longitudeDelta: LOCATION_DELTA,
        latitudeDelta: LOCATION_DELTA
      })
      mapViewRef?.current?.animateToRegion(initRegion!)
      return
    }
    onConfirm(coords)
  }

  return (
    <Modal
      visible={isOpen}
      onDismiss={onClose}
      onRequestClose={onClose}
      animationType="slide"
    >
      <SafeAreaView>
        <Container mt="20px">
          <ModalHeader title="component.map_view.title" onClose={onClose} />
        </Container>
        <Visibility.Root>
          <Visibility.Case condition={isLoading}>
            <Container flex={1} justifyContent="center" alignItems="center">
              <ActivityIndicator
                color={theme.colors.client.primary.backgroundColor}
                size="large"
              />
            </Container>
          </Visibility.Case>
          <Visibility.Default>
            <Container height={height - 130} position="relative">
              <RNMapView
                style={StyleSheet.absoluteFill}
                initialRegion={initRegion!}
                onRegionChange={setCoords}
                provider={PROVIDER_GOOGLE}
                onMapLoaded={handleMapLoaded}
                ref={mapViewRef}
                zoomEnabled
              >
                <Circle
                  center={{
                    latitude: initRegion?.latitude ?? 0,
                    longitude: initRegion?.longitude ?? 0
                  }}
                  radius={ALLOWED_DISTANCE}
                  fillColor={theme.screens.addressMap.circleColor}
                  strokeColor={theme.screens.addressMap.circleBorder}
                  zIndex={2}
                  ref={circleRef}
                />
              </RNMapView>
              <S.MarkerContainer>
                <S.Marker
                  source={images.Marker}
                  resizeMethod="scale"
                  resizeMode="contain"
                />
              </S.MarkerContainer>
              <Container
                position="absolute"
                bottom={140}
                width="100%"
                alignItems="center"
                justifyItems="center"
              >
                <S.ConfirmButton
                  onPress={handleConfirm}
                  testID="confirm"
                  accessibilityLabel="confirm"
                >
                  screen.address_map.confirm
                </S.ConfirmButton>
              </Container>
            </Container>
          </Visibility.Default>
        </Visibility.Root>
      </SafeAreaView>
    </Modal>
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
