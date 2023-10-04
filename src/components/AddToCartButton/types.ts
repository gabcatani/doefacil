import { SnackBarType } from '#hooks/ui/useSnackBar/types'

interface IAddToCartLimits {
  quantity: number
  message: string
  snackBarType: SnackBarType
}

interface IAddToCartButtonProps {
  initialQuantity: number
  firstStep: number
  nextStep: number
  unit?: string
  limits: IAddToCartLimits[]
  onChange: (newQuantity: number) => void
  addButtonSize?: string
  isAddWithSubtotal?: boolean
}

interface IAddToCartButtonContextData
  extends Pick<IAddToCartButtonProps, 'addButtonSize' | 'isAddWithSubtotal'> {
  quantity: number
  onDecrement: VoidFunction
  onIncrement: VoidFunction
  showTrashIcon: boolean
  totalLabel: string
  disableAdd: boolean
}

export type { IAddToCartButtonContextData, IAddToCartButtonProps }
