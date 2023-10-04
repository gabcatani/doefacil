import React from 'react'

import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ISnapCarousel } from './types'

const SnapCarousel = <T,>({
  data,
  renderItem,
  keyExtractor
}: ISnapCarousel<T>) => {
  return (
    <Swiper
      loop
      style={{ width: '100%', maxWidth: 1920, height: '100%' }}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false
      }}
      pagination={false}
      navigation={false}
      modules={[Autoplay]}
      className="snapCarousel"
    >
      {data.map((item, index) => (
        <SwiperSlide key={keyExtractor(item, index)}>
          {renderItem(item)}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SnapCarousel
