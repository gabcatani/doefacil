import { InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { persistCache } from 'apollo3-cache-persist'

import config from './config'

const initCache = (initialState?: NormalizedCacheObject) => {
  const cache = new InMemoryCache(config).restore(initialState || {})
  /**
   * Cache uses localStorage to save data.
   * it's possible save in sessionStorage to, but use SessionStorageWrapper
   *
   * This cache is used by Apollo (graphql client).
   */
  if (typeof window !== 'undefined') {
    persistCache({
      cache,
      storage: window.localStorage
    })
  }

  return cache
}

export default initCache
