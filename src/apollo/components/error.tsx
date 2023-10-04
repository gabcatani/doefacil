/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloClient, ApolloLink, fromPromise, HttpLink } from '@apollo/client'
import { InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { client } from '#apollo'
import { REFRESH_TOKEN_QUERY, TOKEN_QUERY } from '#graphql/client'
import { IRefreshToken, IToken } from '#graphql/client/types'
import { REFRESH_ACCESS_TOKEN_MUTATION } from '#graphql/server'
import { readTag } from '#utils'
// @ts-ignore
import loggerLink from 'apollo-link-logger'

import { EApolloErrors } from '../types'

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

const refreshTokens = async () => {
  const tokenData = client.cache.readQuery<IRefreshToken>({
    query: REFRESH_TOKEN_QUERY
  })

  if (!tokenData?.refreshToken) {
    // tratativa especial para manter usuários do Octopus logados ao migrar para o spider
    const oldAppTokenData = client.cache.readQuery<IToken>({
      query: TOKEN_QUERY
    })

    if (oldAppTokenData?.token) {
      const token = oldAppTokenData?.token

      return await refreshClient.mutate({
        mutation: REFRESH_ACCESS_TOKEN_MUTATION,
        variables: {
          refreshToken: token
        },
        update: handleRefreshToken
      })
    }
    // fim da tratativa especial

    throw new Error('invalid.refresh.token')
  }

  const token = tokenData?.refreshToken

  return await refreshClient.mutate({
    mutation: REFRESH_ACCESS_TOKEN_MUTATION,
    variables: {
      refreshToken: token
    },
    update: handleRefreshToken
  })
}

const handleRefreshToken = (
  cache: any,
  { data: { refreshAccessToken } }: any
) => {
  if (refreshAccessToken.refreshToken) {
    client.cache.writeQuery({
      query: REFRESH_TOKEN_QUERY,
      data: {
        refreshToken: refreshAccessToken.refreshToken.token
      }
    })
  }
  client.cache.writeQuery({
    query: TOKEN_QUERY,
    data: { token: refreshAccessToken.accessToken }
  })
}

const clearTokens = () => {
  client.cache.writeQuery({
    query: REFRESH_TOKEN_QUERY,
    data: {
      refreshToken: null
    }
  })
  client.cache.writeQuery({
    query: TOKEN_QUERY,
    data: { token: null }
  })
}

const headerLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      'mf-origin': 'app',
      accountid: readTag('ACCOUNT_ID')
    }
  }
})

const uri = readTag('API_URL') || 'https://fed-gateway.mercafacil.com/graphql'

const createHttpLink = new HttpLink({
  uri
})

const httpLink = headerLink.concat(createHttpLink)
const errorLinkRefresh = onError(({ graphQLErrors }) => {
  console.log('** On Error Refresh **\n\n ', graphQLErrors)
})

const refreshClient = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: ApolloLink.from([loggerLink, errorLinkRefresh, httpLink]),
  cache: new InMemoryCache()
})

/**
 * Global error handling. Allows sending GraphQL errors to for example Sentry insights
 */
const errorController = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const { message, extensions } of graphQLErrors) {
        switch (extensions!.code) {
          case EApolloErrors.INVALID_TOKEN:
            if (!isRefreshing) {
              setIsRefreshing(true)
              return fromPromise(
                refreshTokens()
                  .then(({ data: { refreshAccessToken } }) => {
                    const oldHeaders = operation.getContext().headers
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
            if (process.env.NODE_ENV === 'production') {
              // Aqui seria um bom local para registrar no Sentry,
              // porém vai gerar um volume gigante de erros se não tiver um filtro
              // TODO: criar filtro e implementar registro dos erros
              // Sentry.captureException(
              //   `[GraphQL error]: ${
              //     operation.operationName
              //   } - Message: ${message}. headers: ${JSON.stringify(
              //     operation.getContext().headers
              //   )}`
              // )
            } else {
              console.log(
                `[GraphQL error]: ${operation.operationName} - Message: ${message}. headers:`,
                operation.getContext().headers
              )
            }
          }
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`)
  }
)

export default errorController
