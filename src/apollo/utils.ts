import {
  ApolloCache,
  ApolloQueryResult,
  Cache,
  DefaultContext,
  MutationUpdaterFunction,
  QueryOptions,
  TypedDocumentNode
} from '@apollo/client'
import { MutationFetchPolicy } from '@apollo/client/core/watchQueryOptions'
import {
  QueryHookOptions,
  QueryResult,
  useMutation,
  useQuery
} from '@apollo/react-hooks'
import { client } from '#apollo'
import { DocumentNode } from 'graphql'

function writeQuery(query: TypedDocumentNode, variables: object) {
  return client.cache.writeQuery({
    query: query as TypedDocumentNode,
    data: variables
  })
}

function readQuery<T, S = null>(
  query: TypedDocumentNode<T, S>,
  extra?: Omit<Cache.ReadQueryOptions<T, S>, 'query'>,
  optimistic?: boolean
): T | null {
  const options = { query, ...extra, optimistic }
  return client.cache.readQuery(options)
}

function query<T, S = null>(
  query: TypedDocumentNode<T, S>,
  extra?: QueryHookOptions<T, S>
): QueryResult<T, S> {
  return useQuery(query, extra)
}

async function ssrQuery<T, S = null>(
  query: TypedDocumentNode<T, S>,
  extra?: Omit<QueryOptions<S, T>, 'query'>
): Promise<ApolloQueryResult<T>> {
  return client.query({ query, ...extra })
}

function mutation<T, S = null>(
  query: DocumentNode,
  extra: {
    variables?: T
    optimisticResponse?: S
    update?: MutationUpdaterFunction<S, T, DefaultContext, ApolloCache<unknown>>
    context?: DefaultContext | undefined
    fetchPolicy?: MutationFetchPolicy
  }
) {
  // @ts-ignore
  const [mutation] = useMutation(query, extra)
  return mutation
}

export default {
  writeQuery,
  readQuery,
  query,
  ssrQuery,
  mutation
}
