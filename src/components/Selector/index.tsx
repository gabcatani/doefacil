import React, { useCallback, useState } from 'react'

import { CompositionColor } from '#graphql/server'
import { useTheme } from 'styled-components/native'

import Card from '../Card'
import Container from '../Container'
import Text from '../Text'
import Styles from './styles'
import { ISelectorProps } from './types'

const Selector: React.FC<ISelectorProps> = ({
  options,
  onChange,
  card,
  activeColor = CompositionColor.SECONDARY,
  initialIndex = 0
}) => {
  const theme = useTheme()
  const [active, SetActive] = useState(initialIndex)

  const activeSwitchColor =
    activeColor === CompositionColor.PRIMARY ? 'primary' : 'secondary'

  const handleChange = (idx: number) => {
    SetActive(idx)
    onChange(idx)
  }

  const SelectorContainer = useCallback(() => {
    return (
      <Container
        mb={!card ? '10px' : undefined}
        p={!card ? '2px' : undefined}
        flexDirection="row"
        backgroundColor={theme.components.selector.backgroundColor}
        borderRadius="25px"
      >
        {options.map((opt, idx) => (
          <Styles.Switch
            key={idx}
            active={active === idx}
            onPress={() => handleChange(idx)}
            activeColor={activeSwitchColor}
          >
            <Text colorScheme={active === idx ? activeColor : undefined}>
              {opt.title}
            </Text>
          </Styles.Switch>
        ))}
      </Container>
    )
  }, [active])

  return (
    <>
      {card && (
        <Card p="8px">
          <SelectorContainer />
        </Card>
      )}
      {!card && <SelectorContainer />}
      {options[active].element}
    </>
  )
}

export default Selector
