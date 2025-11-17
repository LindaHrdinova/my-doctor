import './style.css';
import { useState } from 'react';
import { Link } from 'react-router';
import { AutoComplete } from 'primereact/autocomplete';
import { specialityList } from '../../data/specialityList';
//import { db } from '../../db/db';
//import type { DoctorDataProp } from '../../db/db';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const AddDoctorForm = () => {
  const [suggestDocSpec, setSuggestDocSpec] = useState<string[]>([]);
  //const current = 0;

  //Add to database
  /*const addDoctor = async () => {
    try {
      const id = await db.doctors.add({
        speciality,
        name,
        address,
        addressDetail,
        phone,
        email,
        frequency,
        current,
      });

      setStatus(
        `Doctor ${name ? name : speciality} successfully added. Got id ${id}.`,
      );
      setSpeciality('');
      setName('');
      setAddress('');
      setAddressDetail('');
      setPhone('');
      setEmail('');
      setFrequency('');
    } catch (error) {
      setStatus(`Failed to add ${name ? name : speciality}: ${error}`);
    }
  };*/

  //SPECIALITY autocomplete "našeptávač"
  const searchSpeciality = (e: { query: string }) => {
    const query = e.query.toLocaleLowerCase();

    const suggestion = specialityList.filter((specialist) =>
      specialist.toLowerCase().startsWith(query),
    );

    setSuggestDocSpec(suggestion);
  };

  //YUP validace
  const SignupSchema = Yup.object().shape({
    speciality: Yup.string().required('Povinné'),
    name: Yup.string(),
    email: Yup.string().email('Neplatný e-mail'),
    phone: Yup.string().matches(
      /^\+?\d{9,15}$/,
      'Telefon musí mít 9–15 číslic a může začínat +',
    ),
    frequency: Yup.string().required('Povinné'),
  });

  //type FormDataErrorType = Partial<DoctorDataProp>;

  return (
    <>
      <Formik
        initialValues={{
          id: 0,
          speciality: '',
          name: '',
          address: '',
          addressDetail: '',
          phone: '',
          email: '',
          frequency: '',
          current: 0,
        }}
        validationSchema={SignupSchema}
        onSubmit={(formData) => console.log(formData)}
      >
        {(formik) => (
          <Form
            className="addDoctorForm" /* doplnit onSubmit - vyřeší se problém s validací? Vyzkoušet */
          >
            <label className="addDoctorForm__label">
              Specialista:
              <AutoComplete
                className="addDoctor__autoComplete"
                value={formik.values.speciality}
                suggestions={suggestDocSpec}
                completeMethod={searchSpeciality}
                onChange={(e) => formik.setFieldValue('speciality', e.value)}
                onBlur={() => formik.setFieldTouched('speciality', true)}
                required
              />
              <ErrorMessage name="speciality" component="p" />
            </label>
            <label className="addDoctorForm__label">
              Jméno:
              <Field name="name" className="addDoctorForm__input" />
              <ErrorMessage name="name" component="p" />
            </label>
            {formik.errors.name ? <p>{formik.errors.name}</p> : null}
            <label className="      addDoctorForm__label">
              Adresa:
              <Field name="address" className="addDoctorForm__input" />
              <ErrorMessage name="address" component="p" />
            </label>
            <label className="addDoctorForm__label">
              Detail adresy:
              <Field name="addressDetail" className="addDoctorForm__input" />
              <ErrorMessage name="addressDetail" component="p" />
            </label>
            <label className="addDoctorForm__label">
              Telefon:
              <Field name="phone" className="addDoctorForm__input" />
              <ErrorMessage name="phone" component="p" />
            </label>
            <label className="addDoctorForm__label">
              E-mail:
              <Field
                name="email"
                type="email"
                className="addDoctorForm__input"
              />
              <ErrorMessage name="email" component="p" />
            </label>
            <label className="addDoctorForm__label">
              Pravidelnost prohlídek:
              <Field
                name="frequency"
                className="addDoctorForm__input"
                required
              />
              <ErrorMessage name="frequency" component="p" />
            </label>
            <div className="addDoctorForm__buttons ">
              <input
                type="submit"
                className="onClick__style button button--primary"
                value="Přidat doktora"
              />
              <Link to="/" className="onClick__style button">
                Domů
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
