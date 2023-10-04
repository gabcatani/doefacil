import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'

import { IShimmerLoader } from './types'

const ShimmerLoader: React.FC<IShimmerLoader> = ({
  children,
  visible,
  width,
  height,
  style = {}
}) => {
  return (
    <ShimmerPlaceholder
      visible={visible}
      LinearGradient={LinearGradient}
      style={style}
      width={width}
      height={height}
    >
      {children}
    </ShimmerPlaceholder>
  )
}

export default ShimmerLoader
