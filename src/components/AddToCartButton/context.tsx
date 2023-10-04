import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { useSnackBar } from '#hooks/ui'
import useLoggedinAction from '#hooks/ui/useLoggedinAction'
import { debounceTime } from '#utils'

import { IAddToCartButtonContextData, IAddToCartButtonProps } from './types'

const AddToCartButtonContext = createContext({} as IAddToCartButtonContextData)

const AddToCartButtonProvider: React.FC<IAddToCartButtonProps> = ({
  children,
  firstStep = 1,
  nextStep = 1,
  unit,
  initialQuantity = 0,
  limits,
  onChange,
  ...props
}) => {
  const [quantity, setQuantity] = useState(initialQuantity)
  const { showSnackbar } = useSnackBar()

  useEffect(() => {
    setQuantity(initialQuantity)
  }, [initialQuantity])

  const handleDecrement = useCallback(() => {
    if (quantity === 0) return

    const newValue = quantity === firstStep ? 0 : quantity - nextStep
    setQuantity(+newValue.toFixed(3))
  }, [quantity, nextStep])

  const canIncrement = (quantity: number) => {
    const limit = limits.find(l => quantity > l.quantity)

    if (limit) {
      showSnackbar(limit.message, limit.snackBarType)
      return false
    }

    return true
  }

  const handleIncrement = useLoggedinAction(() => {
    setQuantity(prevQuantity => {
      const newValue =
        prevQuantity + (prevQuantity === 0 ? firstStep : nextStep)

      if (!canIncrement(newValue)) return prevQuantity

      return +newValue.toFixed(3)
    })
  }, true)

  useEffect(() => {
    handleChange(quantity)
  }, [quantity])

  const handleChange = (newQuantity: number) => {
    debounceTime(() => onChange(newQuantity), 400)
  }

  const disableAdd = useMemo(() => {
    if (limits.length === 0) return false

    const smallestLimit = limits.sort((a, b) =>
      a.quantity > b.quantity ? 1 : -1
    )[0].quantity

    const newValue = quantity + (quantity === 0 ? firstStep : nextStep)

    return newValue > smallestLimit
  }, [limits, quantity])

  return (
    <AddToCartButtonContext.Provider
      value={{
        quantity,
        onDecrement: handleDecrement,
        onIncrement: handleIncrement,
        totalLabel: `${+quantity.toFixed(3)}${unit ?? ''}`,
        showTrashIcon: firstStep === +quantity.toFixed(3),
        disableAdd,
        ...props
      }}
    >
      {children}
    </AddToCartButtonContext.Provider>
  )
}

const useAddToCartButton = (): IAddToCartButtonContextData => {
  const context = useContext(AddToCartButtonContext)

  if (!context)
    throw new Error(
      'useAddToCartButton must be used within a AddToCartButtonProvider'
    )

  return context
}

export { AddToCartButtonProvider, useAddToCartButton }
