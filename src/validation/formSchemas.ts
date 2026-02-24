import * as Yup from 'yup';

export const doctorYupValidationSchema = Yup.object().shape({
  speciality: Yup.string().trim().required('Povinné'),
  name: Yup.string().trim(),
  address: Yup.string().trim(),
  addressDetail: Yup.string().trim(),
  phone: Yup.string()
    .trim()
    .matches(/^\+?\d{4,15}$/, {
      message: 'Telefon musí mít 4-15 číslic a může začínat +',
      excludeEmptyString: true,
    }),
  email: Yup.string().trim().email('Neplatný e-mail'),
  website: Yup.string()
    .trim()
    .transform((value) =>
      value?.startsWith('http') ? value : `https://${value}`,
    )
    .url('Neplatná URL'),
  note: Yup.string().trim(),
  frequency: Yup.string().required('Povinné'),
  reminder: Yup.string().when('frequency', {
    is: (val: string) => val !== 'irregular' && val !== 'other' && val !== '',
    then: (schema) => schema.required('Povinné'),
  }),
});

export const appointmentYupValidationSchema = Yup.object().shape({
  date: Yup.date().required('Povinné'),
  time: Yup.string().matches(/^(\d|[01]\d|2[0-3]):[0-5]\d$/, {
    message: 'Neplatný formát času',
    excludeEmptyString: true,
  }),
  speciality: Yup.string().required('Povinné'),
});
