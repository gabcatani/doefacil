import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState
} from 'react'
import { TextInput } from 'react-native'

import client from '#apollo/utils'
import { IRecentSearches, RECENT_SEARCHES } from '#graphql/client'

import { ISearchBarContextData, ISearchBarProps } from './types'

const SearchBarContext = createContext({} as ISearchBarContextData)

const SearchBarProvider: React.FC<ISearchBarProps> = ({
  children,
  onSearch,
  ...props
}) => {
  const [search, setSearch] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [prevSearch, setPrevSearch] = useState('')

  const inputRef = useRef<TextInput>(null)

  const data = client.readQuery<IRecentSearches>(RECENT_SEARCHES)

  const handleToggleInputFocused = (focus: boolean) => {
    setIsInputFocused(focus)
  }

  const addRecentSearchInCache = useCallback(
    (search: string) => {
      const recentSearches = data?.searchTerms ?? []

      const recentSearchAlreadyExists = recentSearches.find(
        term => term === search
      )

      if (recentSearchAlreadyExists) return

      const newCacheSearches = [search, ...recentSearches.slice(0, 4)]

      if (newCacheSearches?.length === 0) return

      client.writeQuery(RECENT_SEARCHES, {
        searchTerms: newCacheSearches
      })
    },
    [data?.searchTerms]
  )

  const handleSubmitSearch = (val?: string) => {
    const searchValue = val ?? search

    setSearch(searchValue)
    onSearch(searchValue)

    if (searchValue) {
      setPrevSearch(searchValue)
      addRecentSearchInCache(searchValue)
    }
  }

  const handleChangeSearch = (search: string) => {
    setSearch(search)
  }

  const handleRecentSearchClick = (search: string) => {
    setPrevSearch(search)
    setSearch(search)
    setIsInputFocused(false)
    onSearch(search)
    inputRef.current?.blur()
  }

  const handleCancel = () => {
    setIsInputFocused(false)
    setSearch(prevSearch)
    inputRef.current?.blur()
  }

  return (
    <SearchBarContext.Provider
      value={{
        search,
        isInputFocused,
        onToggleInputFocused: handleToggleInputFocused,
        onSubmitSearch: handleSubmitSearch,
        onChangeSearch: handleChangeSearch,
        onCancel: handleCancel,
        recentSearches: data?.searchTerms ?? [],
        onRecentSearchClick: handleRecentSearchClick,
        inputRef,
        ...props
      }}
    >
      {children}
    </SearchBarContext.Provider>
  )
}

const useSearchBar = (): ISearchBarContextData => {
  const context = useContext(SearchBarContext)

  if (!context)
    throw new Error('useSearchBar must be used within a SearchBarProvider')

  return context
}

export { SearchBarProvider, useSearchBar }
