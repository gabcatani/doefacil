import React from 'react'

import Container from '../../../Container'
import Text from '../../../Text'
import RounderIconProps from './types'

const RoundedDistance = ({
  measure,
  unit = 'km'
}: RounderIconProps): JSX.Element => {
  return (
    <Container
      size="60px"
      borderRadius="60px"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
    >
      <Text fontSize="md" fontWeight="600">
        {measure}
      </Text>
      <Text fontSize="md" fontWeight="600">
        {unit}
      </Text>
    </Container>
  )
}

export default RoundedDistance
