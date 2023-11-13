import * as yup from 'yup';

const validationSchema = yup.object().shape({
    name: yup.string().required('Nome do item é obrigatório'),
    category: yup.string().required('Categoria é obrigatória'),
    usageTime: yup.string().required('Tempo de uso é obrigatório'),
    description: yup.string().required('Descrição é obrigatória'),
    city: yup.string().required('Cidade é obrigatória'),
    neighborhood: yup.string().required('Bairro é obrigatório'),
    street: yup.string().required('Rua é obrigatória'),
    number: yup.string().required('Número é obrigatório'),
});

export { validationSchema }
