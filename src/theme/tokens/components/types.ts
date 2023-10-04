import {
  AppComponent,
  BasicConfigs_configuration_consumerApp_assets_web_colors_composition_components,
  CompositionColor,
  Configuration_configuration_consumerApp_assets_app_colors_composition_components,
  WebComponent
} from '#graphql/server'
import { Sizes, Variants } from '#types/ui'
import { CSSProperties } from 'styled-components'

import { IColorsTheme } from '../colors/types'

interface IParseComponentsProps {
  compositionComponents?: Partial<
    | BasicConfigs_configuration_consumerApp_assets_web_colors_composition_components
    | Configuration_configuration_consumerApp_assets_app_colors_composition_components
  >[]
  colors: IColorsTheme
}

interface IButtonComponent {
  sizes: Partial<Record<Sizes, CSSProperties>>
  variants: Partial<Record<Variants, CSSProperties>>
}

interface ITagComponent {
  sizes: Partial<Record<Sizes, CSSProperties>>
  variants: Partial<Record<Variants, CSSProperties>>
}

interface IIconButtonComponent {
  variants: {
    form: {
      backgroundColor: string
      color: string
    }
  }
}

interface IModalHeaderComponent {
  bottomBorderColor: string
}

interface IScreenComponent {
  backgroundColor: string
}

interface ISelectorComponent {
  backgroundColor: string
}

interface IAccordionComponent {
  backgroundColor: string
  borderColor: string
}

interface IMainMenuComponent {
  backgroundColor: string
  itemColor: string
  activeItemColor: string
  expandedBackgroundColor: string
  expandedMenuItemColor: string
  expeandedMenuGroupColor: string
}
interface IPaginationComponent {
  color: string
  controlButton: {
    backgroundColor: string
    color: string
    borderColor: string
  }
  pageButton: {
    backgroundColor: string
    borderColor: string
  }
}

type IUnionComponents = keyof typeof AppComponent | keyof typeof WebComponent

interface IInputComponent {
  backgroundColor: string
}

interface ICheckboxComponent {
  borderColor: string
}

interface ISnackBarComponent {
  success: {
    backgroundColor: string
    color: string
  }
  warning: {
    backgroundColor: string
    color: string
  }
  danger: {
    backgroundColor: string
    color: string
  }
  info: {
    backgroundColor: string
    color: string
  }
}

interface IComponents {
  button: IButtonComponent
  iconButton: IIconButtonComponent
  tag: ITagComponent
  modalHeader: IModalHeaderComponent
  screen: IScreenComponent
  selector: ISelectorComponent
  accordion: IAccordionComponent
  mainMenu: IMainMenuComponent
  pagination: IPaginationComponent
  webHeader: { colorScheme: CompositionColor }
  header: { colorScheme: CompositionColor }
  banners: { colorScheme: CompositionColor }
  departmentsCarousel: { colorScheme: CompositionColor }
  webDepartmentsCarousel: { colorScheme: CompositionColor }
  productCards: { colorScheme: CompositionColor }
  input: IInputComponent
  checkbox: ICheckboxComponent
  snackBar: ISnackBarComponent
}

export type { IParseComponentsProps, IUnionComponents, IComponents }
