import { InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Nullable from '#types/Nullable'
import { persistCache } from 'apollo3-cache-persist'

import config from './config'
import makeVarPersisted from './makeVarPersisted'

const initCache = (initialState?: NormalizedCacheObject) => {
  const cache = new InMemoryCache(config).restore(initialState || {})

  /**
   * Cache uses localStorage to save data.
   *
   * This cache is used by Apollo (graphql client).
   */
  persistCache({
    cache,
    storage: AsyncStorage
  })

  return cache
}

export const selectedUnitIdReactiveVar = makeVarPersisted<Nullable<string>>(
  'selectedUnitId',
  null
)
export const selectedStoreIdReactiveVar = makeVarPersisted<Nullable<string>>(
  'selectedStoreId',
  null
)

export default initCache
