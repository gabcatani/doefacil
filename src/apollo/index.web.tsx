import { useMemo } from 'react'

import {
  ApolloClient,
  HttpLink,
  NormalizedCacheObject,
  ApolloLink
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { RetryLink } from '@apollo/client/link/retry'
// @ts-ignore
import loggerLink from 'apollo-link-logger'
import QueueLink from 'apollo-link-queue'
import { SentryLink } from 'apollo-link-sentry'
import SerializingLink from 'apollo-link-serialize'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { parseCookies } from 'nookies'
import { v4 as uuidv4 } from 'uuid'

import initCache from './components/cache'
import errorController from './components/error.web'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

const inMemoryCache = initCache()

const sessionId = uuidv4()

let apolloClient: ApolloClient<NormalizedCacheObject>

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_ENDPOINT
})

const headerLink = setContext(async (_, { headers }) => {
  const chatbot = undefined

  const cookies = parseCookies()

  const token = cookies['token'] ? `Bearer ${cookies['token']}` : ''

  return {
    headers: {
      ...headers,
      authorization: token,
      'session-id': sessionId,
      chatbot: chatbot ? `Bearer ${chatbot}` : ''
    }
  }
})

const httpLinkAuth = headerLink.concat(httpLink)

const serializingLink = new SerializingLink()

export const queueLink = new QueueLink()

const sentryLink = new SentryLink({
  attachBreadcrumbs: {
    includeQuery: true,
    includeError: true,

    includeVariables: process.env.NEXT_PUBLIC_DEBUG_TENANT_ID ? true : false,
    includeFetchResult: process.env.NEXT_PUBLIC_DEBUG_TENANT_ID ? true : false,
    includeCache: process.env.NEXT_PUBLIC_DEBUG_TENANT_ID ? true : false
  }
})

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: 5000,
    jitter: true
  },
  attempts: {
    max: 5,
    retryIf: (error: unknown) => !!error
  }
})

const apolloLinks = [
  queueLink,
  serializingLink,
  retryLink,
  errorController,
  sentryLink,
  httpLinkAuth
]

if (process.env.NODE_ENV === 'development') apolloLinks.unshift(loggerLink)

export const apolloLink = ApolloLink.from(apolloLinks)

export const setOrigin = (origin = '') =>
  setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        'x-custom-origin': origin
      }
    }
  })

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: apolloLink,
    cache: inMemoryCache,
    assumeImmutableResults: true,
    connectToDevTools: true,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'none'
      },
      query: {
        fetchPolicy:
          typeof window === 'undefined' ? 'no-cache' : 'network-only',
        errorPolicy: 'none'
      },
      mutate: {
        /**
         * Options: undefined || no-cache
         */
        fetchPolicy: undefined,
        errorPolicy: 'none'
      }
    },
    resolvers: {
      Mutation: {
        // setNextStep
      },
      GenericResponse: {
        // setStepsQueue,
        // setChatbotToken
      }
    }
  })
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null
) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s)))
      ]
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any // eslint-disable-line
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

// eslint-disable-next-line
export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}

//mock - Prevent error logs in web
export const client = null
