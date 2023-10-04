import { InMemoryCacheConfig } from '@apollo/client'

const config: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        readUnitById: {
          read(_, { readField, args }) {
            const { unitId } = args ?? {}
            const unitsRef = readField({
              fieldName: 'units',
              args: {}
            })

            // TODO: configurar types
            // @ts-ignore
            return unitsRef?.find(unitRef => {
              return readField('_id', unitRef) === unitId
            })
          }
        },
        readEcommerceStoreById: {
          read(_, { readField, args }) {
            const storesRef = readField({
              fieldName: 'stores',
              args: {}
            })

            const { storeId } = args ?? {}

            // TODO: configurar types
            // @ts-ignore
            return storesRef?.find(storeRef => {
              return readField('id', storeRef) === storeId
            })
          }
        },
        pushMessages: {
          keyArgs: false,
          merge(existing, incoming) {
            if (incoming) return incoming

            return existing
          }
        },
        ecommerceProducts: {
          keyArgs: ['storeId', 'search'],
          merge(existing, incoming, options) {
            if (options?.args?.page === 1) {
              return incoming
            }

            const existingProducts = existing?.products ?? []
            const incomingProducts = incoming?.products ?? []

            return {
              ...incoming,
              products: [...existingProducts, ...incomingProducts]
            }
          }
        },
        appSales: {
          keyArgs: [
            'personalized',
            'types',
            'search',
            'unit',
            'departmentId',
            'categoryId',
            'activatable'
          ],
          merge(existing, incoming) {
            if (incoming.page === 1) return incoming

            const existingSales = existing?.appSales ?? []
            const incomingSales = incoming?.appSales ?? []

            return {
              page: incoming.page,
              records: incoming.records,
              appSales: [...existingSales, ...incomingSales]
            }
          }
        },
        economizometerItems: {
          keyArgs: ['purchaseId'],
          merge(existing, incoming) {
            if (incoming.page === 1) return incoming

            const existingItems = existing?.items ?? []
            const incomingItems = incoming?.items ?? []

            return {
              page: incoming.page,
              records: incoming.records,
              items: [...existingItems, ...incomingItems]
            }
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
        },
        shoppingListItems: {
          keyArgs: ['id'],
          merge(existing, incoming, options) {
            if (options?.args?.page === 1) {
              return incoming
            }

            const existingResults = existing?.items ?? []
            const incomingResults = incoming?.items ?? []

            return {
              ...incoming,
              items: [...existingResults, ...incomingResults]
            }
          }
        },
        getPointsHistory: {
          merge(existing, incoming) {
            if (incoming.page === 1) return incoming

            const existingItems = existing?.items ?? []
            const incomingItems = incoming?.items ?? []

            return {
              ...incoming,
              items: [...existingItems, ...incomingItems]
            }
          }
        }
      }
    },
    ClubShoppingList: {
      merge(existing, incoming) {
        return incoming
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
    Company: {
      keyFields: []
    },
    ConsumerState: {
      keyFields: ['federativeUnit']
    }
  }
}

export default config
