import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { translate } from '#utils'

import IconButton from '#cmp/IconButton'

import { BackButtonProps } from './types'

const BackButton: React.FC<BackButtonProps> = ({ tintColor, onPress }) => {
  const navigation = useNavigation()

  const handleOnPress = () => {
    if (onPress) {
      onPress()
    } else {
      navigation.goBack()
    }
  }

  return (
    <IconButton
      flexDirection="row"
      alignItems="center"
      iconName="chevron-left"
      iconSize={20}
      marginLeft={2}
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
