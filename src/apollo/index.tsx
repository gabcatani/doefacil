import 'react-native-get-random-values'

import * as React from 'react'

import {
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  HttpLink
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { RetryLink } from '@apollo/client/link/retry'
import {
  INITIAL_DATA_QUERY,
  CHATBOT_TOKEN_QUERY,
  TOKEN_QUERY
} from '#graphql/client'
import { EOfferOrders, IChatbotToken, IToken } from '#graphql/client/types'
import { readTag } from '#utils'
// @ts-ignore
import loggerLink from 'apollo-link-logger'
import QueueLink from 'apollo-link-queue'
import SerializingLink from 'apollo-link-serialize'
import { v4 as uuidv4 } from 'uuid'

import initCache from './components/cache'
import errorController from './components/error'

/**
 * Create connection between the client and Graphql server
 * Info: use an 'if' when there is beta and production
 */

const uri = readTag('API_URL') || 'https://fed-gateway.mercafacil.com/graphql'

const createHttpLink = new HttpLink({
  uri: uri
})

const sessionId = uuidv4()

const headerLink = setContext(async (_, { headers }) => {
  let chatbot = undefined
  let token = ''

  const tokenData = client.cache.readQuery<IToken>({
    query: TOKEN_QUERY
  })

  const chatbotData = client.cache.readQuery<IChatbotToken>({
    query: CHATBOT_TOKEN_QUERY
  })

  tokenData?.token && (token = tokenData?.token)
  chatbotData?.chatbot && (chatbot = chatbotData?.chatbot)

  return {
    headers: {
      ...headers,
      'mf-origin': 'app',
      'session-id': sessionId,
      authorization: token.length > 0 ? `Bearer ${token}` : '',
      chatbot: chatbot ? `Bearer ${chatbot}` : '',
      accountid: readTag('ACCOUNT_ID')
    }
  }
})

const httpLinkAuth = headerLink.concat(createHttpLink)

/**
 * Apollo local cache config
 */
const inMemoryCache = initCache()

/**
 * Info: Ordering mutations to guarantee sequential execution
 * Desc:in mutation pass serializationKey
 * Example:
  context: {
    serializationKey: 'MUTATION',
    ...
  },
*/
const serializingLink = new SerializingLink()

/**
 * Info: Gate mutations when offline
 * Desc: in Redux control queueLink open/close based in status net
 * Example:
  useEffect(() => {
    if (online) {
      queueLink.open();
    } else {
      queueLink.close();
    }
  }, [online]);
*/
export const queueLink = new QueueLink()

/**
 * Info: Deal with transient network connectivity issues
 */
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

/**
 * Implementation of ApolloClient with link and cache
 * @param uri optional URI. Otherwise GitHub is used
 * @param token optional token. Required for GitHub
 * @param chatbot optional token. Required for GitHub
 */
export const CreateApolloClient = () => {
  const apolloClient = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([
      loggerLink,
      queueLink,
      serializingLink,
      retryLink,
      errorController,
      httpLinkAuth
    ]),
    cache: inMemoryCache,
    connectToDevTools: parseInt(readTag('DEBUG_API') ?? '0') == 1,
    assumeImmutableResults: true,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'none'
      },
      query: {
        fetchPolicy: 'network-only',
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

  return apolloClient
}

/**
 * Mock to get proper typing
 */
const ApolloClientMock = new ApolloClient({
  link: ApolloLink.from([]),
  cache: inMemoryCache
})

export type CreateApolloClient = typeof ApolloClientMock

/**
 * Declaration client
 */

export const client = CreateApolloClient()
export { sessionId }

// Info: cache start data
client.cache.writeQuery({
  query: INITIAL_DATA_QUERY,
  data: {
    steps: [],
    renderedSteps: [],
    currentUserStep: null,
    dialogMessage: false,
    currentStoreId: '',
    currentStoreIdErp: '',
    search: '',
    filters: [],
    sort_by: EOfferOrders.ALPHABETICALLY_ASC,
    page: 1,
    token: null,
    address: null,
    refreshToken: null,
    chatbot: null,
    tutorialDone: false,
    addressDone: false,
    tutorialPointsDone: false,
    tutorialCashbackDone: false,
    unitSelected: false,
    notification: null,
    terms: [],
    store: null,
    unit: null,
    deliveryType: null,
    cartSummaryRemark: null,
    cardResponse: null,
    searchTerms: [],
    tokenizedCard: null
  }
})

/**
 * Wraps the component in ApolloProvider, passing props
 * @param Children calling React component
 */
// @ts-ignore
const ApolloClientProvider = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)

export default ApolloClientProvider
