import { IColorsTheme } from '../colors/types'

export const parseScreens = (colors: IColorsTheme) => ({
  cart: {
    status_bar_color: colors.client.primary.backgroundColor,
    backgroundColor: '#f5f5f5',
    deliveryTypeColor: '#999', // deprecated
    add_items_border_color: colors.client.secondary.backgroundColor,
    product_name_color: '#718096',
    missing_item_title_color: '#718096',
    missing_item_option_color: '#1A202C',
    note_color: '#1A202C',
    coupon_button_border_color: '#1A202C',
    coupon_progress_inactive_color: '#C4C4C4',
    coupon_progress_active_color: colors.client.secondary.backgroundColor
  },
  checkout: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e5e5e5',
    add_note_background_color: colors.client.secondary.backgroundColor,
    add_note_text_color: colors.client.secondary.color
  },
  register: {
    header_background_color: colors.client.primary.backgroundColor,
    background_color: '#FFFFFF',
    active_step_color: colors.client.secondary.backgroundColor,
    inactive_step_color: '#D6D5D5',
    background_button_color_active: '#FFFFFF',
    background_button_color_inactive: '#D6D5D5',
    border_color: '#707070',
    text_color: '#797878',
    gender_button_active_background_color:
      colors.client.secondary.backgroundColor,
    gender_button_active_text_color: colors.client.secondary.color,
    gender_button_inactive_background_color: '#EDF2F7',
    gender_button_inactive_text_color: '#1A202C',
    clear_button_icon_color: '#707070'
  },
  addressMap: {
    circleColor: 'rgba(120, 196, 236, 0.5)',
    circleBorder: 'rgb(120, 196, 236)'
  },
  paymentMethod: {},
  ordersHistory: {
    statusColors: {
      AWAITING_PAYMENT: '#DD6B20',
      AWAITING_SEPARATION: '#0DA740',
      CANCELED: '#E03210',
      DELIVERED: '#0DA740',
      DENIED: '#E03210',
      IN_SEPARATION: '#0DA740',
      OUT_FOR_DELIVERY: '#0DA740',
      PACKED: '#0DA740',
      REFUNDED: '#0DA740',
      UNDER_ANALYSIS: '#0DA740'
    }
  },
  myProfile: {
    backgroundColor: '#e5e5e5',
    footer: {
      background: '#fff',
      cancelBackground: '#fff',
      cancelBorderColor: '#707070',
      cancelTextColor: '#797878',
      saveDisabledBackgroundColor: '#D6D5D5',
      saveDisabledTextColor: '#797878'
    }
  },
  greenCoupon: {
    monthSelectorBackground: '#E2E8F0'
  }
})
