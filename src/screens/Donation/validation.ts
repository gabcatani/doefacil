import * as yup from 'yup';

const validationSchema = yup.object().shape({
    name: yup.string().required('Não pode ser vazio'),
    category: yup.string().required('Password is required'),
    usageTime: yup.string().required('Password is required'),
    description: yup.string().required('Password is required'),
    city: yup.string().required('Password is required'),
    neighborhood: yup.string().required('Password is required'),
    street: yup.string().required('Password is required'),
    number: yup.string().required('Password is required'),
  });

export { validationSchema }