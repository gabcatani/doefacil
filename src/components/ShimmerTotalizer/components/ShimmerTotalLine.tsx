import React, { createRef, useEffect } from 'react'
import { Animated } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'

import Container from '../../Container'
import { IShimmerTotalLineProps } from '../types'

const ShimmerSubtotals: React.FC<IShimmerTotalLineProps> = ({ isSubTotal }) => {
  const lineLabelRef = createRef<ShimmerPlaceholder>()
  const lineValueRef = createRef<ShimmerPlaceholder>()

  useEffect(() => {
    const shimmerAnimated = Animated.stagger(400, [
      lineLabelRef.current!.getAnimated(),
      Animated.parallel([lineValueRef.current!.getAnimated()])
    ])
    Animated.loop(shimmerAnimated).start()
  }, [])

  return (
    <>
      <Container
        key={1}
        mb={'8px'}
        mt={!isSubTotal ? '16px' : 0}
        flexDirection={'row'}
        justifyContent={'space-between'}
      >
        <ShimmerPlaceholder
          ref={lineLabelRef}
          stopAutoRun
          visible={false}
          width={isSubTotal ? 100 : 120}
          height={isSubTotal ? 15 : 20}
          style={{ marginTop: 0 }}
          LinearGradient={LinearGradient}
        />
        <ShimmerPlaceholder
          ref={lineValueRef}
          stopAutoRun
          visible={false}
          width={isSubTotal ? 70 : 80}
          height={isSubTotal ? 15 : 20}
          style={{}}
          LinearGradient={LinearGradient}
        />
      </Container>
    </>
  )
}

export default ShimmerSubtotals
