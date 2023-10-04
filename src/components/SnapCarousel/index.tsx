import React from 'react'
import { useWindowDimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'

import { Container } from '#cmp'

import { ISnapCarousel } from './types'

const SnapCarousel = <T,>({
  data,
  renderItem,
  keyExtractor
}: ISnapCarousel<T>) => {
  const { width } = useWindowDimensions()

  return (
    <Carousel<T>
      data={data}
      renderItem={({ item }) => (
        <Container
          borderRadius="8px"
          overflow="hidden"
          style={{ aspectRatio: 355 / 140 }} // Dimenções do banner club conforme crop do mystique //! NÃO MEXER
        >
          {renderItem(item)}
        </Container>
      )}
      keyExtractor={(item, index) => keyExtractor(item, index)}
      sliderWidth={width}
      itemWidth={width - (data.length > 1 ? width * 0.15 : 20)}
      loop
      loopClonesPerSide={2}
      scrollEndDragDebounceValue={1}
      decelerationRate="fast"
      autoplay
      autoplayDelay={5000}
    />
  )
}

export default SnapCarousel
