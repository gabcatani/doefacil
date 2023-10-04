/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloClient, ApolloLink, fromPromise, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { REFRESH_ACCESS_TOKEN_MUTATION } from '#graphql/server'
// @ts-ignore
import loggerLink from 'apollo-link-logger'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

import { EApolloErrors } from '../types'
import initCache from './cache'

let isRefreshing = false
let pendingRequests: any = []

const setIsRefreshing = (value: boolean) => {
  isRefreshing = value
}

const addPendingRequest = (pendingRequest: any) => {
  pendingRequests.push(pendingRequest)
}

const resolvePendingRequests = () => {
  pendingRequests.map((callback: any) => callback())
  pendingRequests = []
}

const refreshTokens = async (headers: { accountid: string }) => {
  const cookies = parseCookies()
  const prevRefreshToken = cookies['refreshToken']

  if (!prevRefreshToken) {
    throw new Error('invalid.refresh.token')
  }

  return await client.mutate({
    mutation: REFRESH_ACCESS_TOKEN_MUTATION,
    variables: {
      refreshToken: prevRefreshToken
    },
    context: {
      headers: {
        accountid: headers.accountid
      }
    },
    update: handleRefreshToken
  })
}

const handleRefreshToken = (
  cache: any,
  { data: { refreshAccessToken } }: any
) => {
  if (refreshAccessToken.refreshToken) {
    setCookie(
      undefined,
      'refreshToken',
      refreshAccessToken.refreshToken.token,
      {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      }
    )
  }

  setCookie(undefined, 'token', refreshAccessToken.accessToken, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/'
  })
}

const clearTokens = () => {
  destroyCookie(undefined, 'token', { path: '/' })
  destroyCookie(undefined, 'refreshToken', { path: '/' })

  client.resetStore()
}

const headerLink = setContext(async (_, { headers }) => {
  return {
    headers
  }
})

const createHttpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_ENDPOINT
})

const httpLink = headerLink.concat(createHttpLink)
const errorLinkRefresh = onError(({ graphQLErrors }) => {
  console.log('** On Error Refresh **\n\n ', graphQLErrors)
})

const inMemoryCache = initCache()

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: ApolloLink.from([loggerLink, errorLinkRefresh, httpLink]),
  cache: inMemoryCache,
  connectToDevTools: false
})

/**
 * Global error handling. Allows sending GraphQL errors to for example Sentry insights
 */
const errorController = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    client.cache.restore(operation.getContext().cache.extract())

    const oldHeaders = operation.getContext().headers

    if (graphQLErrors) {
      for (const { message, extensions } of graphQLErrors) {
        switch (extensions!.code) {
          case EApolloErrors.INVALID_TOKEN:
            if (!isRefreshing) {
              setIsRefreshing(true)
              return fromPromise(
                refreshTokens(oldHeaders)
                  .then(({ data: { refreshAccessToken } }) => {
                    operation.setContext({
                      headers: {
                        ...oldHeaders,
                        authorization: `Bearer ${refreshAccessToken.accessToken}`
                      }
                    })
                  })
                  .catch(() => {
                    clearTokens() // limpa os tokens quando dá ruim
                    pendingRequests = []
                    setIsRefreshing(false)
                    // redirecionar para o login?
                  })
              ).flatMap(() => {
                resolvePendingRequests()
                setIsRefreshing(false)
                return forward(operation)
              })
            } else {
              return fromPromise(
                new Promise<void>(resolve => {
                  addPendingRequest(() => resolve())
                })
              ).flatMap(() => {
                return forward(operation)
              })
            }
          default: {
            console.log(
              `[GraphQL error]: ${operation.operationName} - Message: ${message}. headers :`,
              operation.getContext().headers
            )
          }
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`)
  }
)

export default errorController
