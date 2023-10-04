import { makeVar } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'

function makeVarPersisted<T>(key: string, initialValue: T) {
  const variable = makeVar<T | undefined>(undefined)

  async function handleOnChangeEvent(data: T | undefined) {
    if (!data) {
      await AsyncStorage.removeItem(key)
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(data))
    }
    variable.onNextChange(handleOnChangeEvent)
  }

  async function restore() {
    const previousValue = await AsyncStorage.getItem(key)
    if (previousValue) {
      variable(JSON.parse(previousValue))
    } else {
      variable(initialValue)
    }
  }

  restore()
  variable.onNextChange(handleOnChangeEvent)
  return variable
}

export default makeVarPersisted
