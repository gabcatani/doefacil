import { TextInput } from 'react-native'

import { DefaultTheme } from 'styled-components/native'

interface ISearchBarProps {
  onSearch: (search: string) => void
  style?: keyof Pick<DefaultTheme['colors']['client'], 'primary' | 'secondary'>
  asHeader?: boolean
  autoFocus?: boolean
  showBarcode?: boolean
  filters: { [key: string]: IFilter }
  onApplyFilters: (a: { [key: string]: IOption[] }) => void
}

interface IOption {
  id?: string
  value: string | number
}

interface IFilter {
  options: IOption[]
  initialSelection?: IOption | IOption[]
  type: FilterType
  default: IOption | IOption[]
  showBadgeIfNotDefault: boolean
  raw?: boolean
}

interface IFilterRowProps extends IFilter {
  title: string
  onChange: (key: string, a: IOption[]) => void
  isFirst: boolean
}

export enum FilterType {
  MULTIPLE_SELECTION,
  SINGLE_CHOICE,
  SLIDER
}

interface ISearchBarContextData extends Omit<ISearchBarProps, 'onSearch'> {
  search: string
  onChangeSearch: (search: string) => void
  isInputFocused: boolean
  onToggleInputFocused: (focus: boolean) => void
  onSubmitSearch: (search?: string) => void
  onCancel: VoidFunction
  recentSearches: string[]
  onRecentSearchClick: (search: string) => void
  inputRef: React.RefObject<TextInput>
}

export type {
  ISearchBarContextData,
  ISearchBarProps,
  IFilter,
  IFilterRowProps,
  IOption
}
