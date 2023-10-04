import { IColorsTheme } from './tokens/colors/types'
import { IComponents } from './tokens/components/types'
import { IScreens } from './tokens/screens/types'

type IConfigThemeProps = {
  colors: IColorsTheme
  components: IComponents
  screens: IScreens
}

export type { IConfigThemeProps }
