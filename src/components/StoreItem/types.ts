import { IStoreWithDistance } from '#data/model'
import { GetAllStores_stores, GetUnits_units } from '#graphql/server'

interface IStoreItemProps {
  storeWithDistance: IStoreWithDistance
  onPress?: (store: GetAllStores_stores | GetUnits_units) => void
  showDistance: boolean
  index: number
}

export type { IStoreItemProps }
