import * as yup from 'yup';

const validationSchema = yup.object().shape({
    email: yup.string().required('Não pode ser vazio'),
  });

export { validationSchema }