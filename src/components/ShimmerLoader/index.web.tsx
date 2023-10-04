import React from 'react'

import { IShimmerLoader } from './types'

const ShimmerLoader: React.FC<IShimmerLoader> = ({
  children,
  visible,
  width,
  height,
  style
}) => {
  if (visible) return <>{children}</>

  let shimmerStyle = style

  if (width && height) {
    shimmerStyle = { width, height }
  } else {
    shimmerStyle = { width: 150, height: 8 }
  }

  return <div className="shimmer" style={shimmerStyle} />
}

export default ShimmerLoader
