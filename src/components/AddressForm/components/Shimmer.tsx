import React, { createRef, useEffect } from 'react'
import { Animated } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'

import Container from '../../Container'
import { IShimmerProps } from '../types'

const Shimmer: React.FC<IShimmerProps> = ({ fetched, children }) => {
  const line1Ref = createRef<ShimmerPlaceholder>()
  const line2Ref = createRef<ShimmerPlaceholder>()
  const line3Ref = createRef<ShimmerPlaceholder>()
  const line4Ref = createRef<ShimmerPlaceholder>()
  const line5Ref = createRef<ShimmerPlaceholder>()
  const line6Ref = createRef<ShimmerPlaceholder>()
  const line7Ref = createRef<ShimmerPlaceholder>()

  useEffect(() => {
    if (!line1Ref.current) return

    const shimmerAnimated = Animated.stagger(400, [
      line1Ref.current!.getAnimated(),
      line2Ref.current!.getAnimated(),
      line3Ref.current!.getAnimated(),
      line4Ref.current!.getAnimated(),
      line5Ref.current!.getAnimated(),
      line6Ref.current!.getAnimated(),
      line7Ref.current!.getAnimated()
    ])
    Animated.loop(shimmerAnimated).start()
  }, [line1Ref.current])

  if (fetched) return <>{children}</>

  return (
    <Container my="8px">
      <ShimmerPlaceholder
        ref={line1Ref}
        height={60}
        style={{ borderRadius: 6, width: '100%', marginBottom: 16 }}
        stopAutoRun
        visible={false}
        LinearGradient={LinearGradient}
      />
      <ShimmerPlaceholder
        ref={line2Ref}
        height={60}
        style={{ borderRadius: 6, width: '100%', marginBottom: 16 }}
        stopAutoRun
        visible={false}
        LinearGradient={LinearGradient}
      />
      <ShimmerPlaceholder
        ref={line3Ref}
        height={60}
        style={{ borderRadius: 6, width: '100%', marginBottom: 16 }}
        stopAutoRun
        visible={false}
        LinearGradient={LinearGradient}
      />
      <ShimmerPlaceholder
        ref={line4Ref}
        height={60}
        style={{ borderRadius: 6, width: '100%', marginBottom: 16 }}
        stopAutoRun
        visible={false}
        LinearGradient={LinearGradient}
      />
      <ShimmerPlaceholder
        ref={line5Ref}
        height={60}
        style={{ borderRadius: 6, width: '100%', marginBottom: 16 }}
        stopAutoRun
        visible={false}
        LinearGradient={LinearGradient}
      />
      <ShimmerPlaceholder
        ref={line6Ref}
        height={60}
        style={{ borderRadius: 6, width: '100%', marginBottom: 16 }}
        stopAutoRun
        visible={false}
        LinearGradient={LinearGradient}
      />
      <ShimmerPlaceholder
        ref={line7Ref}
        height={60}
        style={{ borderRadius: 6, width: '100%' }}
        stopAutoRun
        visible={false}
        LinearGradient={LinearGradient}
      />
    </Container>
  )
}

export default Shimmer
