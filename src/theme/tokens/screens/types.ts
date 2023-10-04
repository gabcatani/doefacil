interface ICartScreen {
  backgroundColor: string
  deliveryTypeColor: string
  add_items_border_color: string
  product_name_color: string
  missing_item_title_color: string
  missing_item_option_color: string
  note_color: string
  coupon_button_border_color: string
  coupon_progress_inactive_color: string
  coupon_progress_active_color: string
  status_bar_color: string
}

interface ICheckoutScreen {
  backgroundColor: string
  borderColor: string
  add_note_background_color: string
  add_note_text_color: string
}

interface IRegisterScreen {
  header_background_color: string
  background_color: string
  active_step_color: string
  inactive_step_color: string
  background_button_color_active: string
  background_button_color_inactive: string
  border_color: string
  text_color: string
  gender_button_active_background_color: string
  gender_button_active_text_color: string
  gender_button_inactive_background_color: string
  gender_button_inactive_text_color: string
  clear_button_icon_color: string
}

interface IStatusColors {
  AWAITING_PAYMENT: string
  AWAITING_SEPARATION: string
  CANCELED: string
  DELIVERED: string
  DENIED: string
  IN_SEPARATION: string
  OUT_FOR_DELIVERY: string
  PACKED: string
  REFUNDED: string
  UNDER_ANALYSIS: string
}
interface IOrderHistoryScreen {
  statusColors: IStatusColors
}

interface IAddressMap {
  circleColor: string
  circleBorder: string
}

interface IMyProfileScreen {
  backgroundColor: string
  footer: {
    background: string
    cancelBackground: string
    cancelBorderColor: string
    cancelTextColor: string
    saveDisabledBackgroundColor: string
    saveDisabledTextColor: string
  }
}

interface IGreenCoupon {
  monthSelectorBackground: string
}

interface IScreens {
  cart: ICartScreen
  checkout: ICheckoutScreen
  addressMap: IAddressMap
  paymentMethod: /* IPaymentMehodScreen */ any // eslint-disable-line
  register: IRegisterScreen
  ordersHistory: IOrderHistoryScreen
  myProfile: IMyProfileScreen
  greenCoupon: IGreenCoupon
}

export type { IScreens }
