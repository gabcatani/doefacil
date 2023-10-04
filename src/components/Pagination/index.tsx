import React, { useMemo } from 'react'

import { useBreakpointValue } from '#hooks/ui'
import { ECompositeColorScheme } from '#theme/tokens/colors/types'
import { useTheme } from 'styled-components/native'

import AwesomeIcon from '#cmp/AwesomeIcon'
import Button from '#cmp/Button'
import Container from '#cmp/Container'
import Text from '#cmp/Text'
import Visibility from '#cmp/Visibility'

import { DOTS, usePagination } from './context'
import Styles from './styles'
import { IPaginationProps } from './types'

const Pagination = ({
  currentPage,
  totalPages,
  onPressNextButton,
  onPressPrevButton,
  onPressPageButton
}: IPaginationProps): JSX.Element => {
  const theme = useTheme()

  const isLargerThanSmScreen = useBreakpointValue({
    base: false,
    sm: false,
    md: true
  })

  const { pagination } = theme.components

  const paginationRange = usePagination({
    currentPage,
    totalPages
  })

  const pages = useMemo(
    () =>
      Array(totalPages)
        .fill({})
        .map((_, index) => index + 1),
    [totalPages]
  )

  const PrevButton = () =>
    currentPage > 1 ? (
      <Button
        borderWidth="1px"
        borderColor={pagination.controlButton.borderColor}
        bgColor={pagination.controlButton.backgroundColor}
        color={pagination.controlButton.color}
        accessibilityLabel="prevPagination"
        testID="prevPagination"
        onPress={onPressPrevButton}
        size="sm"
      >
        <Container flexDirection="row" alignItems="center">
          <Visibility.Root>
            <Visibility.Case condition={isLargerThanSmScreen}>
              <AwesomeIcon icon="chevron-left" />
              <Text fontWeight="500" fontSize="md" ml="4px">
                component.pagination.prev
              </Text>
            </Visibility.Case>
            <Visibility.Default>
              <AwesomeIcon icon="chevron-left" />
            </Visibility.Default>
          </Visibility.Root>
        </Container>
      </Button>
    ) : null

  const NextButton = () =>
    currentPage < pages.length ? (
      <Button
        borderWidth="1px"
        borderColor={pagination.controlButton.borderColor}
        bgColor={pagination.controlButton.backgroundColor}
        color={pagination.controlButton.color}
        accessibilityLabel="nextPagination"
        testID="nextPagination"
        onPress={onPressNextButton}
        size="sm"
      >
        <Container flexDirection="row" alignItems="center">
          <Visibility.Root>
            <Visibility.Case condition={isLargerThanSmScreen}>
              <Text fontWeight="500" fontSize="md" mr="4px">
                component.pagination.next
              </Text>
              <AwesomeIcon icon="chevron-right" />
            </Visibility.Case>
            <Visibility.Default>
              <AwesomeIcon icon="chevron-right" />
            </Visibility.Default>
          </Visibility.Root>
        </Container>
        {/* component.pagination.next */}
      </Button>
    ) : null

  if (currentPage === 0 || paginationRange.length < 2) {
    return <></>
  }

  return (
    <Styles.Container>
      <PrevButton />

      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <Text>&#8230;</Text>
        }

        return (
          <Styles.PageButton
            key={pageNumber}
            onPress={() => onPressPageButton(+pageNumber)}
            isSelected={pageNumber === currentPage}
            accessibilityRole="button"
            accessibilityLabel={`pageButton-${pageNumber}`}
            testID={`pageButton-${pageNumber}`}
          >
            <Text
              raw
              fontWeight={pageNumber === currentPage ? '600' : '500'}
              compositeColorScheme={
                pageNumber === currentPage
                  ? ECompositeColorScheme.SECONDARY
                  : undefined
              }
            >
              {pageNumber}
            </Text>
          </Styles.PageButton>
        )
      })}
      <NextButton />
    </Styles.Container>
  )
}

export default Pagination
