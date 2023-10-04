import React, { useCallback } from 'react'
import StepIndicator from 'react-native-step-indicator'
import { StepIndicatorProps } from 'react-native-step-indicator/lib/typescript/src/types'

import { Container, Text } from '#cmp'

import Styles from './styles'

const StepIndicatorComponent = (props: StepIndicatorProps) => {
  const renderLabel = useCallback<Required<StepIndicatorProps>['renderLabel']>(
    item => {
      const activeStep = item.stepStatus === 'current'

      return (
        <Text
          fontWeight={activeStep ? '500' : '400'}
          color={activeStep ? 'client.secondary.backgroundColor' : 'gray.400'}
          raw
        >
          {item.label}
        </Text>
      )
    },
    []
  )

  return (
    <Container>
      <StepIndicator
        {...props}
        customStyles={Styles.StepIndicatorStyles()}
        renderLabel={renderLabel}
      />
    </Container>
  )
}

export default StepIndicatorComponent
