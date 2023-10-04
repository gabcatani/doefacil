import React from 'react'
import { Switch as RNSwitch, TouchableOpacity } from 'react-native'

import Container from '../Container'
import Text from '../Text'
import { ISwitchProps } from './types'

const Switch: React.FC<ISwitchProps> = ({ value, label, onPress, ...rest }) => {
  return (
    <TouchableOpacity onPress={() => onPress(value)} activeOpacity={0.9}>
      <Container flexDirection="row" alignItems="center" {...rest}>
        <RNSwitch value={value} onChange={() => onPress(value)} />
        <Text ml="10px">{label}</Text>
      </Container>
    </TouchableOpacity>
  )
}

export default Switch
