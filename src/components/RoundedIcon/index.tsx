import React, { useMemo } from 'react'

import Images from '#res/images'

import AwesomeIcon from '../AwesomeIcon'
import Container from '../Container'
import RounderIconProps from './types'

const RoundedIcon: React.FC<RounderIconProps> = ({
  name,
  type = 'solid',
  containerSize = 60,
  iconSize = 24
}) => {
  const renderIcon = useMemo(() => {
    const isSvg = type === 'Svg'
    const isStore = name === 'store'

    return !isSvg && !isStore ? (
      <AwesomeIcon size={iconSize} icon={name} type={type} />
    ) : (
      <Images.Store width={iconSize} height={iconSize} />
    )
  }, [])

  return (
    <Container
      size={`${containerSize}px`}
      borderRadius={`${containerSize}px`}
      borderWidth="1px"
      borderColor="rgba(0, 0, 0, 0.1)"
      alignItems="center"
      justifyContent="center"
    >
      {renderIcon}
    </Container>
  )
}

export default RoundedIcon
