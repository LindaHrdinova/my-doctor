import * as Yup from 'yup';

export const doctorYupValidationSchema = Yup.object().shape({
  speciality: Yup.string().required('Povinné'),
  name: Yup.string(),
  address: Yup.string(),
  addressDetail: Yup.string(),
  phone: Yup.string().matches(
    /^\+?\d{4,15}$/,
    'Telefon musí mít 4-15 číslic a může začínat +',
  ),
  email: Yup.string().email('Neplatný e-mail'),
  frequency: Yup.string().required('Povinné'),
  reminder: Yup.string().when('frequency', {
    is: (val: string) => val !== 'irregular' && val !== 'other' && val !== '',
    then: (schema) => schema.required('Povinné'),
  }),
});

export const appointmentYupValidationSchema = Yup.object().shape({
  date: Yup.date().required('Povinné'),
  time: Yup.string().matches(
    /^(\d|[01]\d|2[0-3]):[0-5]\d$/,
    'Neplatný formát času',
  ),
  speciality: Yup.string().required('Povinné'),
});
