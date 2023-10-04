import React from 'react'
import { Animated, TouchableOpacity } from 'react-native'

import AwesomeIcon from '../AwesomeIcon'
import Container from '../Container'
import Text from '../Text'
import { CollapseProvider, useCollapse } from './context'
import { ICollapseProps } from './types'

const Collapse: React.FC = ({ children }) => {
  const {
    toggleCollapse,
    iconSpinAnimation,
    displayValue,
    heightAnimation,
    contentLocation,
    accessibilityLabel,
    testID,
    title,
    hasIcon
  } = useCollapse()

  const Content = () => (
    <Animated.View
      style={{
        overflow: 'hidden',
        display: displayValue,
        maxHeight: heightAnimation
      }}
    >
      <Container py="4px">{children}</Container>
    </Animated.View>
  )

  return (
    <Container /* {...rest} */>
      {contentLocation === 'top' && <Content />}
      <TouchableOpacity
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        onPress={toggleCollapse}
      >
        <Container
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          p="10px"
        >
          <Text fontSize="lg" fontWeight="600">
            {title}
          </Text>
          {hasIcon && (
            <Container ml="8px">
              <Animated.View
                style={{ transform: [{ rotate: iconSpinAnimation }] }}
              >
                <AwesomeIcon icon="chevron-down" size={16} />
              </Animated.View>
            </Container>
          )}
        </Container>
      </TouchableOpacity>
      {contentLocation === 'bottom' && <Content />}
    </Container>
  )
}

const CollapseComponent: React.FC<ICollapseProps> = props => {
  const { children } = props

  return (
    <CollapseProvider {...props}>
      <Collapse>{children}</Collapse>
    </CollapseProvider>
  )
}

export default CollapseComponent
