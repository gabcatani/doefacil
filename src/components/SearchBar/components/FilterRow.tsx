import React, { memo, useEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'

import { Slider } from '@miblanchard/react-native-slider'
import { translate } from '#utils'
import { currency } from '#utils/masks'
import _ from 'lodash'
import { useTheme } from 'styled-components'

import { Container, Separator, Tag, Text, Visibility } from '#cmp'
import { List } from '#cmp/BottomSheetNew'

import { FilterType, IFilterRowProps } from '../types'

const FilterRow = memo(
  ({
    initialSelection,
    options,
    title,
    onChange,
    type,
    isFirst,
    default: defaultSelection,
    raw
  }: IFilterRowProps) => {
    const theme = useTheme()
    const flatlistRef = useRef<List>(null)
    const [selectedFilters, setSelectedFilters] = useState<typeof options>(
      !initialSelection
        ? []
        : Array.isArray(initialSelection)
        ? initialSelection
        : [initialSelection]
    )

    useEffect(() => {
      onChange(title, selectedFilters)
    }, [selectedFilters])

    return (
      <Container mt={isFirst ? undefined : '30px'}>
        <Container mx="20px">
          <Text
            fontSize="lg"
            fontWeight="600"
          >{`component.filter.${title}.title`}</Text>
        </Container>
        <Container height="50px" my="10px">
          <Visibility.Root>
            <Visibility.Case condition={type === FilterType.SLIDER}>
              <Container px="20px">
                <Container>
                  <Slider
                    value={selectedFilters.map(f => f.value as number)}
                    onValueChange={a => {
                      if (Array.isArray(a)) {
                        const selected = a.map(s => ({ value: s }))
                        setSelectedFilters(selected)
                      }
                    }}
                    thumbTintColor={
                      theme.colors.client.secondary.backgroundColor
                    }
                    maximumTrackTintColor={theme.colors.gray[400]}
                    minimumTrackTintColor={
                      theme.colors.client.secondary.backgroundColor
                    }
                    step={1}
                    maximumValue={
                      Array.isArray(defaultSelection) &&
                      typeof defaultSelection[1]?.value === 'number'
                        ? Math.ceil(defaultSelection[1].value)
                        : undefined
                    }
                    minimumValue={
                      Array.isArray(defaultSelection) &&
                      typeof defaultSelection[0]?.value === 'number'
                        ? Math.floor(defaultSelection[0].value)
                        : undefined
                    }
                  />
                </Container>
                <Container flexDirection="row" justifyContent="space-between">
                  <Text fontSize="md" fontWeight="600" raw>
                    {currency(selectedFilters[0]?.value)}
                  </Text>
                  <Text fontSize="md" fontWeight="600" raw>
                    {currency(selectedFilters[1]?.value)}
                  </Text>
                </Container>
              </Container>
            </Visibility.Case>
            <Visibility.Default>
              <List
                keyExtractor={item => item.id ?? item.value}
                ref={flatlistRef}
                horizontal={true}
                initialScrollIndex={
                  selectedFilters.length === 0
                    ? 0
                    : options.findIndex(o => _.isEqual(o, selectedFilters[0]))
                }
                contentContainerStyle={{
                  paddingHorizontal: 20
                }}
                showsHorizontalScrollIndicator={false}
                data={options}
                onScrollToIndexFailed={info => {
                  const wait = new Promise(resolve => setTimeout(resolve, 500))
                  wait.then(() => {
                    flatlistRef.current?.scrollToIndex({
                      index: info.index,
                      animated: true
                    })
                  })
                }}
                renderItem={({ item }) => {
                  const handleSelect = () => {
                    switch (type) {
                      case FilterType.SINGLE_CHOICE:
                        setSelectedFilters([item])
                        break
                      case FilterType.MULTIPLE_SELECTION:
                        setSelectedFilters(prevState => {
                          if (prevState.some(f => _.isEqual(f, item))) {
                            return prevState.filter(f => !_.isEqual(f, item))
                          } else {
                            return [...prevState, item]
                          }
                        })
                        break
                      default:
                        break
                    }
                  }

                  return (
                    <Container mr="5px" py="10px">
                      <TouchableOpacity onPress={handleSelect}>
                        <Tag
                          variant={
                            selectedFilters.some(f => _.isEqual(f, item))
                              ? 'secondary'
                              : 'default'
                          }
                        >
                          {raw
                            ? item.value
                            : translate(
                                `component.filter.${title}.options.${item.value.toLowerCase()}`
                              )}
                        </Tag>
                      </TouchableOpacity>
                    </Container>
                  )
                }}
              />
            </Visibility.Default>
          </Visibility.Root>
        </Container>
        <Container px="8px">
          <Separator />
        </Container>
      </Container>
    )
  }
)

FilterRow.displayName = 'FilterRow'

export default FilterRow
