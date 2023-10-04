import React from 'react'
import { TouchableOpacity } from 'react-native'

import { useTheme } from 'styled-components/native'

import AwesomeIcon from '../../AwesomeIcon'
import Container from '../../Container'
import Text from '../../Text'
import { useSearchBar } from '../context'

const RecentSearches: React.FC = () => {
  const { search, recentSearches, onRecentSearchClick } = useSearchBar()
  const theme = useTheme()

  return (
    <Container height="100%" bg="white" pt="8px">
      <Container px="16px">
        <Text fontSize="3xl" fontWeight="600">
          component.recent_searches.title
        </Text>
        {recentSearches
          .filter(recent => recent.includes(search))
          .map((recent, i) => (
            <Container key={i} flexDirection="row" alignItems="center" py="4px">
              <AwesomeIcon
                icon="clock"
                type="regular"
                color={theme.colors.gray[500]}
              />
              <TouchableOpacity
                onPress={() => {
                  onRecentSearchClick(recent)
                }}
              >
                <Container marginLeft="8px" flexDirection="row" width="100%">
                  {!search ? (
                    <Text color="gray.500" fontSize="md">
                      {recent}
                    </Text>
                  ) : (
                    <>
                      <Text key={i} color="gray.500" fontSize="md">
                        {recent.replace(search, `**${search}**`)}
                      </Text>
                    </>
                  )}
                </Container>
              </TouchableOpacity>
            </Container>
          ))}
      </Container>
    </Container>
  )
}

export default RecentSearches
