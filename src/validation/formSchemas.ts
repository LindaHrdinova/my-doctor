import * as Yup from 'yup';

export const doctorYupValidationSchema = Yup.object().shape({
  speciality: Yup.string().trim().required('Povinné'),
  name: Yup.string().trim().ensure(),
  address: Yup.string().trim().ensure(),
  addressDetail: Yup.string().trim().ensure(),
  phone: Yup.string()
    .trim()
    .matches(/^\+?\d{4,15}$/, {
      message: 'Telefon musí mít 4-15 číslic a může začínat +',
      excludeEmptyString: true,
    })
    .ensure(),
  email: Yup.string().trim().email('Neplatný e-mail').ensure(),
  website: Yup.string()
    .trim()
    .transform((value) => {
      if (!value) return '';
      return value.startsWith('http') ? value : `https://${value}`;
    })
    .test('is-valid-url-or-empty', 'Neplatná URL', (value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    })
    .ensure(),
  note: Yup.string().trim().ensure(),
  frequency: Yup.string().required('Povinné'),
  reminder: Yup.string()
    .when('frequency', {
      is: (val: string) => val !== 'irregular' && val !== 'other' && val !== '',
      then: (schema) => schema.required('Povinné'),
    })
    .ensure(),
  current: Yup.number().required(),
  isDemo: Yup.boolean().required(),
});

export const appointmentYupValidationSchema = Yup.object().shape({
  date: Yup.date().required('Povinné'),
  time: Yup.string().matches(/^(\d|[01]\d|2[0-3]):[0-5]\d$/, {
    message: 'Neplatný formát času',
    excludeEmptyString: true,
  }),
  speciality: Yup.string().required('Povinné'),
});
