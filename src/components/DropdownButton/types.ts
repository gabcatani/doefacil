import { MutableRefObject } from 'react'
import { TouchableOpacity } from 'react-native'

import { IconName } from '@fortawesome/fontawesome-svg-core'
import { BackgroundProps, PositionProps } from 'styled-system'

type IAwesomeIconTypes = 'solid' | 'regular' | 'brands'
interface IButtonProps extends BackgroundProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any
}

interface IDropdownContainerProps extends PositionProps {}

interface IDropdownMenuItem {
  label: string
  onClick: VoidFunction
  hideOption?: boolean
}
interface IDropdownButtonProps {
  iconName?: IconName
  iconType?: IAwesomeIconTypes
  label?: string
  showArrow?: boolean
  menuOptions: IDropdownMenuItem[]
  colorInactive?: string
  colorActive?: string
  bgInactive?: string
  bgActive?: string
  isHeader?: boolean
  toRight?: boolean
}

interface IDropdownButtonContextData extends IDropdownButtonProps {
  isOpen: boolean
  buttonRef: MutableRefObject<TouchableOpacity | undefined>
  onOpenDropdown: VoidFunction
  onCloseDropdown: VoidFunction
  buttonColor: string
  buttonBgColor: string
  dropdownPosition: IDropDownPosition
}

interface IDropDownPosition {
  y: number
  right?: number
  left?: number
}

export type {
  IButtonProps,
  IDropdownButtonProps,
  IDropdownContainerProps,
  IDropdownButtonContextData,
  IDropDownPosition
}
