import React, { createRef, useEffect } from 'react'
import { Animated } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'

import { Container } from '#cmp'

const Shimmer: React.FC<{ width?: string }> = () => {
  const imageRef = createRef<ShimmerPlaceholder>()
  const firstLineRef = createRef<ShimmerPlaceholder>()
  const secondLineRef = createRef<ShimmerPlaceholder>()
  const thirdLineRef = createRef<ShimmerPlaceholder>()
  const fourthLineRef = createRef<ShimmerPlaceholder>()
  const firstButtonRef = createRef<ShimmerPlaceholder>()

  useEffect(() => {
    const shimmerAnimated = Animated.stagger(400, [
      imageRef.current!.getAnimated(),
      Animated.parallel([
        firstLineRef.current!.getAnimated(),
        secondLineRef.current!.getAnimated(),
        thirdLineRef.current!.getAnimated(),
        fourthLineRef.current!.getAnimated()
      ])
    ])
    Animated.loop(shimmerAnimated).start()
  }, [])

  return (
    <Container p="16px" justifyContent="center" alignItems="center" flex={1}>
      <Container justifyContent="center" alignItems="center">
        <ShimmerPlaceholder
          ref={imageRef}
          width={300}
          height={200}
          style={{ borderRadius: 6 }}
          stopAutoRun
          visible={false}
          LinearGradient={LinearGradient}
        />
        <Container>
          <ShimmerPlaceholder
            ref={firstLineRef}
            stopAutoRun
            visible={false}
            width={300}
            height={30}
            style={{ marginTop: 60 }}
            LinearGradient={LinearGradient}
          />

          <ShimmerPlaceholder
            ref={secondLineRef}
            stopAutoRun
            visible={false}
            width={300}
            height={16}
            style={{ marginTop: 20 }}
            LinearGradient={LinearGradient}
          />
          <ShimmerPlaceholder
            ref={thirdLineRef}
            stopAutoRun
            visible={false}
            width={300}
            height={16}
            style={{ marginTop: 12 }}
            LinearGradient={LinearGradient}
          />

          <Container alignItems="center" mt="12px">
            <ShimmerPlaceholder
              ref={fourthLineRef}
              stopAutoRun
              visible={false}
              width={80}
              height={16}
              LinearGradient={LinearGradient}
            />
          </Container>
        </Container>

        <Container mt="60px">
          <ShimmerPlaceholder
            ref={firstButtonRef}
            stopAutoRun
            visible={false}
            width={300}
            height={50}
            LinearGradient={LinearGradient}
          />
          <Container alignItems="center" mt="12px">
            <ShimmerPlaceholder
              ref={firstButtonRef}
              stopAutoRun
              visible={false}
              width={200}
              height={20}
              LinearGradient={LinearGradient}
            />
          </Container>
        </Container>
      </Container>
    </Container>
  )
}

export default Shimmer
