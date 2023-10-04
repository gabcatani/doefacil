import React from 'react'

import Container from '../../Container'
import { IShimmerTotalLineProps } from '../types'

const ShimmerSubtotals: React.FC<IShimmerTotalLineProps> = ({ isSubTotal }) => {
  return (
    <>
      <Container
        key={1}
        mb={'8px'}
        mt={!isSubTotal ? '16px' : 0}
        flexDirection={'row'}
        justifyContent={'space-between'}
      >
        <div
          className="shimmer"
          style={{
            marginTop: 0,
            height: isSubTotal ? 15 : 20,
            width: isSubTotal ? 100 : 120
          }}
        />
        <div
          className="shimmer"
          style={{
            marginTop: 0,
            height: isSubTotal ? 15 : 20,
            width: isSubTotal ? 70 : 80
          }}
        />
      </Container>
    </>
  )
}

export default ShimmerSubtotals
