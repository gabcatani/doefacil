import React from 'react'

import { translate } from '#utils'

import IconButton from '#cmp/IconButton'

import { BackButtonProps } from './types'

// import { Container } from './styles';

const BackButton: React.FC<BackButtonProps> = ({ tintColor, onPress }) => {
  const handleOnPress = () => {
    if (onPress) {
      onPress()
    } else {
      history.back()
    }
  }

  return (
    <IconButton
      flexDirection="row"
      alignItems="center"
      iconName="chevron-left"
      iconSize={20}
      label="component.button.back"
      onPress={handleOnPress}
      testID="backButton"
      accessibilityLabel={translate('component.button.back')}
      iconColor={tintColor}
      LabelProps={{
        color: tintColor,
        fontSize: 'md',
        fontWeight: '400',
        mt: '2px'
      }}
    />
  )
}

export default BackButton
