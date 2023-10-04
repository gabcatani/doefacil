import React from 'react'

import { translate } from '#utils'

import ListItem from '../ListItem'
import RoundedDistance from './components/RoundedDistance'
import { IStoreItemProps } from './types'

const StoreItem: React.FC<IStoreItemProps> = ({
  storeWithDistance,
  onPress,
  showDistance,
  index
}) => {
  const { store, distance } = storeWithDistance

  const formattedAddress = () => {
    const address = store.address
    if (!address) return ''
    if (typeof address === 'string') return address

    let formattedAddress = address.street || ''

    formattedAddress += ', ' + (address.number ?? 'Sem Número')
    formattedAddress += ', ' + address.neighborhood
    formattedAddress += ', ' + address.city.name
    if (address.city.state)
      formattedAddress += ' - ' + address.city.state.federativeUnit

    return formattedAddress
  }

  return (
    <ListItem
      PrefixComponent={
        showDistance
          ? () => {
              let measure = '-'
              let unit: 'km' | 'm' = 'km'

              if (distance) {
                measure = (
                  distance > 1000 ? Math.round(distance / 1000) : distance
                ).toString()
                unit = distance > 1000 ? 'km' : 'm'
              }

              return <RoundedDistance measure={measure} unit={unit} />
            }
          : undefined
      }
      title={`${store.name}`}
      subtitle={formattedAddress()}
      mb="20px"
      testID={`selectUnitListStore_${index + 1}`}
      accessibilityLabel={translate(
        `accessibility.screen.select_store.components.selected_store`,
        {
          id: index + 1
        }
      )}
      onPress={onPress ? () => onPress(store) : undefined}
    />
  )
}

export default StoreItem
