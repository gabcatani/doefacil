import { Animated } from 'react-native'

import { SpaceProps } from 'styled-system'
interface ICollapseProps extends SpaceProps {
  title: string
  closeTitle?: string
  hasIcon?: boolean
  isInitialOpen?: boolean
  contentLocation?: 'top' | 'bottom'
  accessibilityLabel: string
  testID: string
}

interface ICollapseContextData {
  title: string
  hasIcon?: boolean
  contentLocation?: 'top' | 'bottom'
  accessibilityLabel: string
  testID: string
  toggleCollapse: () => void
  iconSpinAnimation: Animated.AnimatedInterpolation
  heightAnimation: Animated.AnimatedInterpolation
  displayValue: 'flex' | 'none'
}

export type { ICollapseProps, ICollapseContextData }
