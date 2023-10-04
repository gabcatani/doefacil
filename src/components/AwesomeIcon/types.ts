import { IconName } from '@fortawesome/fontawesome-svg-core'
import { Props as FontAwesomeIconProps } from '@fortawesome/react-native-fontawesome'
import { IComposeClientColorsProps } from '#hooks/ui/theme/useColorScheme/types'
import { IFontSize } from '#theme/tokens'

type IAwesomeIconTypes = 'solid' | 'regular' | 'brands'
// TODO: implements case fontawesome pro
// | 'light'
// | 'thin'
// | 'duotone'

interface IAwesomeIconProps
  extends Omit<FontAwesomeIconProps, 'size'>,
    Partial<IComposeClientColorsProps> {
  size?: IFontSize | number
  type?: IAwesomeIconTypes
  icon: IconName
}

export type { IAwesomeIconProps, IAwesomeIconTypes }
