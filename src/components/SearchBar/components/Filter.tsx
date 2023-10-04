import React, { memo, useCallback, useState } from 'react'
import { BackHandler } from 'react-native'

import { Portal } from '@gorhom/portal'
import { useOnFocus } from '#hooks/ui'
import _ from 'lodash'
import { useTheme } from 'styled-components/native'

import BottomSheet from '../../BottomSheetNew'
import Button from '../../Button'
import Container from '../../Container'
import IconButton from '../../IconButton'
import { useSearchBar } from '../context'
import FilterRow from './FilterRow'

const Filter: React.FC = memo(() => {
  const { onApplyFilters, filters, style } = useSearchBar()
  const { colors } = useTheme()
  const [sheetOpen, setSheetOpen] = useState(false)

  const [selectedFilters, setSelectedFilters] = useState(
    Object.assign(
      // @ts-ignore
      ...Object.entries(filters).map(([key, value]) => ({
        [key]: !value.initialSelection
          ? []
          : Array.isArray(value.initialSelection)
          ? value.initialSelection
          : [value.initialSelection]
      }))
    )
  )
  const applyFilters = () => {
    onApplyFilters(selectedFilters)
    setSheetOpen(false)
  }

  const clearFilters = () => {
    onApplyFilters(
      Object.assign(
        // @ts-ignore
        ...Object.entries(filters).map(([key, value]) => ({
          [key]: !value.default
            ? []
            : Array.isArray(value.default)
            ? value.default
            : [value.default]
        }))
      )
    )
    setSheetOpen(false)
  }

  const notDefaultValues = Object.values(filters).some(f => {
    return f.showBadgeIfNotDefault && !_.isEqual(f.initialSelection, f.default)
  })

  const badgeColor = (() => {
    if (!style || style === 'primary') {
      return colors.client['secondary'].backgroundColor
    } else {
      return colors.client['primary'].backgroundColor
    }
  })()

  useOnFocus(
    useCallback(() => {
      const onBackPress = () => {
        if (sheetOpen) {
          setSheetOpen(false)
          return true
        } else {
          return false
        }
      }
      BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [sheetOpen])
  )

  const filterArray = Object.keys(filters).map(key => ({
    key: key,
    value: filters[key]
  }))

  return (
    <>
      <Container ml={3}>
        <IconButton
          iconName="sliders"
          iconSize={22}
          iconColor={!style ? colors.gray[500] : colors.client[style].color}
          onPress={() => setSheetOpen(true)}
          testID="filter"
          accessibilityLabel="filter"
          disabled={false}
        />
        {notDefaultValues && (
          <Container
            position="absolute"
            size="10px"
            borderRadius="8px"
            bg={badgeColor}
            top={0}
            right={0}
          />
        )}
      </Container>
      <Portal hostName="BottomSheetHost">
        <BottomSheet
          onClose={() => setSheetOpen(false)}
          open={sheetOpen}
          containerPx={0}
          skipKeyboardClose
        >
          <Container>
            {filterArray.map((filter, i) => {
              if (
                filter.key === 'offer_type' &&
                filter.value.options.length === 0
              ) {
                return null
              }
              return (
                <FilterRow
                  key={i}
                  title={filter.key}
                  onChange={(key, value) =>
                    setSelectedFilters(prevState => ({
                      ...prevState,
                      [key]: value
                    }))
                  }
                  isFirst={i === 0}
                  {...filter.value}
                />
              )
            })}
            <Container mt="10px" mx="20px">
              <Container
                flex={1}
                flexDirection="row"
                justifyContent="space-between"
              >
                <Container width="48%">
                  <Button
                    testID="clearButton"
                    accessibilityLabel="clearButton"
                    size="sm"
                    variant="default"
                    onPress={clearFilters}
                  >
                    screen.search.filter.clear_button
                  </Button>
                </Container>
                <Container width="48%">
                  <Button
                    testID="applyButton"
                    accessibilityLabel="applyButton"
                    size="sm"
                    onPress={applyFilters}
                  >
                    screen.search.filter.apply_button
                  </Button>
                </Container>
              </Container>
            </Container>
          </Container>
        </BottomSheet>
      </Portal>
    </>
  )
})
Filter.displayName = 'Filter'

export default Filter
