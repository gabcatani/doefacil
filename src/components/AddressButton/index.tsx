import React from 'react'
import { TouchableOpacity } from 'react-native'

import Images from '#res/images'
import { translate } from '#utils'
import { useTheme } from 'styled-components/native'

import AwesomeIcon from '../AwesomeIcon'
import Container from '../Container'
import Text from '../Text'
import { IAddressButtonProps } from './type'

const AddressButton: React.FC<IAddressButtonProps> = ({
  onPress,
  address,
  subtitle,
  placeholder
}) => {
  const theme = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      testID={translate('accessibility.component.address_button.button')}
      accessibilityLabel={translate(
        'accessibility.component.address_button.button'
      )}
    >
      <Container flexDirection="row" alignItems="center">
        <AwesomeIcon icon="location-dot" size={20} />
        <Container mx="10px" flex={1}>
          {!!subtitle && (
            <Text fontSize="sm" fontWeight="400" color="gray.500">
              {subtitle}
            </Text>
          )}
          {!address && <Text>{placeholder}</Text>}
          {address && (
            <>
              <Text
                testID={translate(
                  'accessibility.component.address_button.street_and_address_number'
                )}
                accessibilityLabel={translate(
                  'accessibility.component.address_button.street_and_address_number'
                )}
              >{`${address.street}, ${address.number}`}</Text>
              <Text
                testID={translate(
                  'accessibility.component.address_button.neighborhood'
                )}
                accessibilityLabel={translate(
                  'accessibility.component.address_button.neighborhood'
                )}
              >
                {address.neighborhood}
              </Text>
            </>
          )}
        </Container>
        <Images.Arrow
          width={10}
          height={24}
          fill={theme.colors.client.secondary.backgroundColor}
        />
      </Container>
    </TouchableOpacity>
  )
}

export default AddressButton
