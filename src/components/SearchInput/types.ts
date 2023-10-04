import { TextInputProps } from 'react-native'

import { ColorProps, LayoutProps, BorderRadiusProps } from 'styled-system'

import { IContainerProps } from '../Container/types'
import IIconButtonProps from '../IconButton/types'

export default interface ISearchInputProps
  extends TextInputProps,
    ColorProps,
    LayoutProps,
    BorderRadiusProps {
  ContainerProps?: IContainerProps
  SearchButtonProps?: Partial<IIconButtonProps>
  testID: string
  accessibilityLabel: string
  loading?: boolean
  canClear?: boolean
  hasValue?: boolean
}
