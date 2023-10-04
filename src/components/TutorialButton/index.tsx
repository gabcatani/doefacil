import React from 'react'

import Container from '../Container'
import IconButton from '../IconButton'
import { ITutorialButtonProps } from './types'

const TutorialButton: React.FC<ITutorialButtonProps> = ({ onPress }) => {
  return (
    <Container pr={2}>
      <IconButton
        onPress={onPress}
        testID="tutorial_button"
        accessibilityLabel="tutorial_button"
        iconName="circle-question"
        iconSize={25}
        iconColor="white"
      ></IconButton>
    </Container>
  )
}

export default TutorialButton
