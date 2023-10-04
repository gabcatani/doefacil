import React from 'react'

import { translate } from '#utils'

import AwesomeIcon from '../AwesomeIcon'
import Container from '../Container'
import IconButton from '../IconButton'
import ListItem from '../ListItem'
import { IAddressItemProps } from './types'

const AddressItem: React.FC<IAddressItemProps> = ({
  data,
  type,
  onPress,
  onPressRadioButton,
  onPressMoreButton,
  currentAddressId
}) => {
  const renderAddressIcon = () => {
    switch (data.type) {
      case 'HOME':
        return <AwesomeIcon icon="house" size={24} />
      case 'WORK':
        return <AwesomeIcon icon="briefcase" size={24} />
      default:
        return <AwesomeIcon icon="cube" size={24} />
    }
  }

  const addressRadioButton = translate(
    `accessibility.component.address_item.address_radio_button`
  )

  const renderRadioButton = () => {
    if (
      (currentAddressId && currentAddressId === data.id) ||
      (!currentAddressId && data.main)
    ) {
      return (
        <IconButton
          iconName="circle-dot"
          iconType="regular"
          size={20}
          accessibilityLabel={addressRadioButton}
          testID={addressRadioButton}
          onPress={handleRadioButtonPress}
        />
      )
    }

    return (
      <IconButton
        iconName="circle"
        iconType="regular"
        size={20}
        accessibilityLabel={addressRadioButton}
        testID={addressRadioButton}
        onPress={handleRadioButtonPress}
      />
    )
  }

  const renderPrefix = () => {
    if (type === 'bottomSheet' || type === 'icon') return renderAddressIcon()
    return (
      <Container flexDirection="row">
        <Container mr="16px">{renderRadioButton()}</Container>
        {renderAddressIcon()}
      </Container>
    )
  }

  const renderSuffix = () => {
    if (type === 'bottomSheet') return renderRadioButton()

    const moreIconButton = translate(
      `accessibility.component.address_item.more_icon_button`
    )

    return (
      <IconButton
        iconName="ellipsis"
        size={20}
        accessibilityLabel={moreIconButton}
        testID={moreIconButton}
        onPress={handleMoreButtonPress}
      />
    )
  }

  const handleRadioButtonPress = () => {
    if (!onPressRadioButton) return

    onPressRadioButton(data)
  }

  const handleMoreButtonPress = () => {
    if (!onPressMoreButton) return
    onPressMoreButton(data)
  }

  const addressListItem = translate(
    `accessibility.component.address_item.address_item_list_item`,
    { id: data.id }
  )

  return (
    <ListItem
      PrefixComponent={renderPrefix}
      SuffixComponent={type === 'icon' ? undefined : renderSuffix}
      title={`${data.street}, ${data.number}, ${data.neighborhood}`}
      subtitle={translate(`screen.address.${data.type.toLowerCase()}`)}
      testID={addressListItem}
      accessibilityLabel={addressListItem}
      mb="20px"
      onPress={() => onPress && onPress(data)}
    />
  )
}

export default AddressItem
