interface IBottomSheetProps {
  open: boolean
  onClose: VoidFunction
  snapPoints?: string[]
  title?: string
  titleColor?: string
  description?: string
  scrollable?: boolean
  isClosable?: boolean
  onHeaderLayout?: (h: number) => void
  containerPx?: string | number
  skipKeyboardClose?: boolean
}

export type { IBottomSheetProps }
