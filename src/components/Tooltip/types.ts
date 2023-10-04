import { MutableRefObject } from 'react'
import { TouchableOpacity } from 'react-native'

import { IconName } from '@fortawesome/fontawesome-svg-core'
import Nullable from '#types/Nullable'
import { BackgroundProps, BorderProps } from 'styled-system'

type IAwesomeIconTypes = 'solid' | 'regular' | 'brands'

interface ITooltipProps {}

interface ITooltipContextData extends ITooltipProps {
  isOpen: boolean
  buttonRef: MutableRefObject<TouchableOpacity | undefined>
  onOpenDropdown: VoidFunction
  onCloseDropdown: VoidFunction
  contentPosition: Nullable<IContentPosition>
  onContentLayout: (e: { h: number; w: number }) => void
}

interface IContentPosition {
  top: string
  left: string
}

interface ITooltipTriggerProps {
  asChild?: boolean
  iconName?: IconName
  iconType?: IAwesomeIconTypes
  size?: 'lg' | 'sm'
}
interface ITriggerLayout {
  w: number
  h: number
  px: number
  py: number
}
interface IButtonProps extends BackgroundProps, BorderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any
}

export type {
  ITooltipContextData,
  ITooltipProps,
  IButtonProps,
  ITooltipTriggerProps,
  IContentPosition,
  ITriggerLayout
}
