import React from 'react'

import Container from '../Container'
import Separator from '../Separator'
import ShimmerSubtotals from './components/ShimmerTotalLine'
import { IShimmerTotalizerProps } from './types'

const ShimmerTotalizer: React.FC<IShimmerTotalizerProps> = ({
  children,
  visible
}) => {
  if (visible) return <>{children}</>

  const array = [...Array(3)]

  return (
    <Container flexDirection="column">
      {array.map((x, i) => (
        <ShimmerSubtotals key={`${x}-${i}`} isSubTotal />
      ))}
      <Separator />
      <ShimmerSubtotals />
    </Container>
  )
}

export default ShimmerTotalizer
