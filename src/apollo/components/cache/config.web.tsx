import { InMemoryCacheConfig } from '@apollo/client'

const config: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        ecommerceProducts: {
          keyArgs: ['storeId', 'departmentId', 'search', 'sortBy', 'page'],
          merge(_, incoming) {
            return incoming
          }
        },
        orders: {
          keyArgs: false,
          merge(existing, incoming, options) {
            if (options?.args?.page === 1) {
              return incoming
            }

            const existingResults = existing?.results ?? []
            const incomingResults = incoming?.results ?? []

            return {
              ...incoming,
              results: [...existingResults, ...incomingResults]
            }
          }
        }
      }
    },
    Cart: {
      keyFields: ['storeId', 'consumerId'],
      merge(existing, incoming, options) {
        return {
          ...incoming,
          storeId: incoming.storeId || options.args?.storeId || ''
        }
      },
      fields: {
        cartItems: {
          merge(existing, incoming) {
            if (incoming) return incoming
            return existing
          }
        },
        changedCartItems: {
          merge(existing, incoming) {
            if (incoming) return incoming
            return existing
          }
        }
      }
    },
    ConsumerState: {
      keyFields: ['federativeUnit']
    }
  }
}

export default config
