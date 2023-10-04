import { IconName } from '@fortawesome/fontawesome-svg-core'

type IAwesomeIconTypes = 'solid' | 'regular' | 'brands' | 'Svg'
export default interface RounderIconProps {
  name: IconName
  type?: IAwesomeIconTypes
  iconSize?: number
  containerSize?: number
}
