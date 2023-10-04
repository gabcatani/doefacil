import { translate } from '#utils'
import * as yup from 'yup'

const remarkSchema = yup
  .object({
    value: yup
      .string()
      .nullable()
      .test(
        'no-white-space-validation',
        translate('errors.no_white_space'),
        value => {
          if (value) {
            return value.trim().length > 0
          }

          return true
        }
      )
  })
  .required()

export { remarkSchema }
