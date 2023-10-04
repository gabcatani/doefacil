import React, { useCallback } from 'react'
import { FlatList } from 'react-native'

import { translate } from '#utils'

import Text from '#cmp/Text'

import AddressItem from '../AddressItem'
import AwesomeIcon from '../AwesomeIcon'
import { List } from '../BottomSheet'
import Container from '../Container'
import ListItem from '../ListItem'
import ShimmerList from '../ShimmerList'
import { IAddressListProps } from './types'

const AddressList: React.FC<IAddressListProps> = ({
  currentAddressId,
  data,
  isFetched,
  type,
  showAddNew = true,
  onAddNew,
  onPress,
  onPressRadioButton,
  onPressMoreButton
}) => {
  const renderItem = useCallback(
    ({ item }) => (
      <AddressItem
        data={item}
        onPress={onPress}
        type={type}
        onPressRadioButton={onPressRadioButton}
        currentAddressId={currentAddressId}
        onPressMoreButton={onPressMoreButton}
      />
    ),
    [currentAddressId]
  )

  const renderAddNewIcon = useCallback(
    () => (
      <Container
        width="24px"
        height="24px"
        borderRadius="12px"
        borderColor="rgba(0,0,0,0.25)"
        borderWidth="0.5px"
        justifyContent="center"
        alignItems="center"
      >
        <AwesomeIcon icon="plus" size={14} />
      </Container>
    ),
    []
  )

  const ListCmp = type === 'bottomSheet' ? List : FlatList

  return (
    <ShimmerList visible={isFetched}>
      {!showAddNew && (
        <Text
          fontSize="sm"
          color="error"
          mb="8px"
          px={type === 'list' ? '16px' : '0px'}
        >
          component.address_list.max_address_limit
        </Text>
      )}
      <ListCmp
        data={data}
        keyExtractor={i => `${i.id}`}
        renderItem={renderItem}
        style={{
          paddingHorizontal: type === 'list' ? 16 : 0
        }}
        ListFooterComponent={
          showAddNew ? (
            <>
              <ListItem
                mb="16px"
                PrefixComponent={renderAddNewIcon}
                title={translate('screen.cart.add_new_address')}
                onPress={onAddNew}
                testID={translate(
                  `accessibility.component.address_list.add_new_address`
                )}
                accessibilityLabel={translate(
                  `accessibility.component.address_list.add_new_address`
                )}
                justifyContent="center"
              />
            </>
          ) : undefined
        }
      />
    </ShimmerList>
  )
}

export default AddressList
