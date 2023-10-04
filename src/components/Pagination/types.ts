import { TouchableOpacityProps } from 'react-native'

interface IPaginationProps {
  currentPage: number
  totalPages: number
  onPressNextButton: () => void
  onPressPrevButton: () => void
  onPressPageButton: (page: number) => void
}

interface IPaginationProviderProps {
  totalPages: number
  currentPage: number
}

interface IStyledPageButton extends TouchableOpacityProps {
  testID: string
  accessibilityLabel: string
  isSelected?: boolean
}

export type { IStyledPageButton, IPaginationProps, IPaginationProviderProps }
