import { translate } from '#utils'
import * as yup from 'yup'

const schema = yup
  .object({
    postalCode: yup
      .string()
      .required(
        translate('screen.address_form.validation.postal_code_required')
      )
      .min(
        9,
        translate('screen.address_form.validation.postal_code_min', { min: 9 })
      ),
    cityName: yup
      .string()
      .required(translate('screen.address_form.validation.city')),
    cityId: yup.string(),
    neighborhood: yup
      .string()
      .required(translate('screen.address_form.validation.neighborhood')),
    street: yup
      .string()
      .required(translate('screen.address_form.validation.street')),
    number: yup
      .string()
      .max(
        7,
        translate('screen.address_form.validation.max_number', { max: 7 })
      )
      .required(translate('screen.address_form.validation.number')),
    type: yup
      .string()
      .required(translate('screen.address_form.validation.type'))
  })
  .required()

export default schema
