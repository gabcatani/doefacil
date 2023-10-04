// TODO: improve => acho que o ideal seria que tais definições estivessem escopadas em seus arquivos de estilos

import { AppComponent, CompositionColor, WebComponent } from '#graphql/server'

import { IComponents, IParseComponentsProps, IUnionComponents } from './types'

export const parseComponents = ({
  compositionComponents = [],
  colors
}: IParseComponentsProps): IComponents => {
  const _compositionComponent = (componentName: IUnionComponents) => {
    const composition = compositionComponents.find(
      component => component.name === componentName
    )

    return composition?.value ?? CompositionColor.PRIMARY
  }

  return {
    button: {
      sizes: {
        xs: {
          height: 28,
          padding: '0 4px'
        },
        sm: {
          height: 32,
          padding: '0 12px'
        },
        md: {
          height: 40,
          padding: '0 16px'
        },
        lg: {
          height: 48,
          padding: '0 16px'
        }
      },
      variants: {
        primary: {
          backgroundColor: colors.client.primary.backgroundColor,
          color: colors.client.primary.color
        },
        secondary: {
          backgroundColor: colors.client.secondary.backgroundColor,
          color: colors.client.secondary.color
        },
        disabled: {
          backgroundColor: '#d3d3d3',
          color: '#7b7b7b'
        },
        cancel: {
          backgroundColor: '#fff',
          color: '#797878',
          borderColor: '#707070',
          borderWidth: 1,
          borderRadius: 8
        }
      }
    },
    iconButton: {
      variants: {
        form: {
          backgroundColor: '#EDF2F7',
          color: '#1A202C'
        }
      }
    },
    tag: {
      sizes: {
        xs: {
          height: '20px',
          padding: '0 6px'
        },
        sm: {
          height: '24px',
          padding: '0 8px'
        },
        md: {
          height: '32px',
          padding: '0 10px'
        }
      },
      variants: {
        primary: {
          backgroundColor: colors.client.primary.backgroundColor,
          color: colors.client.primary.color
        },
        secondary: {
          backgroundColor: colors.client.secondary.backgroundColor,
          color: colors.client.secondary.color
        },
        default: {
          backgroundColor: '#EDF2F7',
          color: '#718096'
        }
      }
    },
    modalHeader: {
      bottomBorderColor: '#E2E8F0'
    },
    screen: {
      backgroundColor: '#fff'
    },
    selector: {
      backgroundColor: '#E6E6E6'
    },
    accordion: {
      backgroundColor: '#fff',
      borderColor: '#E5E5E5'
    },
    mainMenu: {
      backgroundColor: '#fff',
      itemColor: '#718096',
      activeItemColor: '#1A202C',
      expandedBackgroundColor: '#fff',
      expandedMenuItemColor: '#4A5568',
      expeandedMenuGroupColor: '#2D3748'
    },
    header: {
      colorScheme: _compositionComponent(AppComponent.HEADER)
    },
    webHeader: {
      colorScheme: _compositionComponent(WebComponent.HEADER)
    },
    productCards: {
      colorScheme: _compositionComponent(AppComponent.PRODUCT_CARD)
    },
    departmentsCarousel: {
      colorScheme: _compositionComponent(AppComponent.DEPARTMENTS_CAROUSEL)
    },
    webDepartmentsCarousel: {
      colorScheme: _compositionComponent(WebComponent.DEPARTMENTS_CAROUSEL)
    },
    banners: { colorScheme: _compositionComponent(AppComponent.BANNERS) },
    pagination: {
      color: '#2D3748',
      controlButton: {
        backgroundColor: '#fff',
        color: '#2D3748',
        borderColor: '#E2E8F0'
      },
      pageButton: {
        backgroundColor: colors.client.secondary.backgroundColor,
        borderColor: colors.client.primary.backgroundColor
      }
    },
    input: {
      backgroundColor: '#fff'
    },
    checkbox: {
      borderColor: '#718096'
    },
    snackBar: {
      success: {
        backgroundColor: '#F1FFE9',
        color: '#4A803C'
      },
      warning: {
        backgroundColor: '#FFFAE9',
        color: '#A78200'
      },
      danger: {
        backgroundColor: '#FFEDE9',
        color: '#D03111'
      },
      info: {
        backgroundColor: '#E9F2FF',
        color: '#25629B'
      }
    }
  }
}
