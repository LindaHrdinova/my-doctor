import './style.css';
import { useState } from 'react';
import { Link } from 'react-router';
import { AutoComplete } from 'primereact/autocomplete';
import { specialityList } from '../../data/specialityList';
import { doctorFrequencyList } from '../../data/doctorFrequency';
import { db } from '../../db/db';
import type { DoctorDataProp } from '../../db/db';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';

type AddDoctorFormProps = {
  setAddDoctorStatus: React.Dispatch<React.SetStateAction<string>>;
};

type NewDoctorData = Omit<DoctorDataProp, 'id'>; //remove "id" from DoctorDataProp so I can leave it from "initialValues".

export const AddDoctorForm = ({ setAddDoctorStatus }: AddDoctorFormProps) => {
  const [suggestDocSpec, setSuggestDocSpec] = useState<string[]>([]);

  //SPECIALITY autocomplete "našeptávač"
  const searchSpeciality = (e: { query: string }) => {
    const query = e.query.toLocaleLowerCase();
    const suggestion = specialityList.filter((specialist) =>
      specialist.toLowerCase().startsWith(query),
    );
    setSuggestDocSpec(suggestion);
  };

  //YUP validation
  const SignupSchema = Yup.object().shape({
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
  });

  const handleSubmitFormik = async (
    formData: NewDoctorData,
    { resetForm }: FormikHelpers<NewDoctorData>,
  ) => {
    try {
      await db.doctors.add(formData);
      setAddDoctorStatus(`Nový doktor byl přidán do adresáře!`);
      resetForm();
    } catch (error) {
      console.log(error);
      setAddDoctorStatus('Nepovedlo se přidat doktora do adresáře.');
    }
  };

  return (
    <>
      <Formik<NewDoctorData>
        initialValues={{
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
        onSubmit={handleSubmitFormik}
      >
        {(formik) => (
          <Form className="addDoctorForm">
            <label className="addDoctorForm__label">
              <span>
                Specializace <span className="formRequired">*</span>
              </span>
              <AutoComplete
                className={
                  formik.touched.speciality && formik.errors.speciality
                    ? 'addDoctor__autoComplete input--error'
                    : 'addDoctor__autoComplete'
                }
                value={formik.values.speciality}
                suggestions={suggestDocSpec}
                completeMethod={searchSpeciality}
                onChange={(e) => formik.setFieldValue('speciality', e.value)}
                onBlur={() => formik.setFieldTouched('speciality', true)}
                required
              />
              <ErrorMessage
                name="speciality"
                component="p"
                className="addDoctorForm__errorMessage"
              />
            </label>
            <label className="addDoctorForm__label">
              Jméno
              <Field
                name="name"
                className={
                  formik.touched.name && formik.errors.name
                    ? 'addDoctorForm__input input--error'
                    : 'addDoctorForm__input'
                }
              />
              <ErrorMessage
                name="name"
                component="p"
                className="addDoctorForm__errorMessage"
              />
            </label>
            <label className="addDoctorForm__label">
              Adresa
              <Field
                name="address"
                className={
                  formik.touched.address && formik.errors.address
                    ? 'addDoctorForm__input input--error'
                    : 'addDoctorForm__input'
                }
              />
              <ErrorMessage
                name="address"
                component="p"
                className="addDoctorForm__errorMessage"
              />
            </label>
            <label className="addDoctorForm__label">
              Detail adresy
              <Field
                name="addressDetail"
                className={
                  formik.touched.addressDetail && formik.errors.addressDetail
                    ? 'addDoctorForm__input input--error'
                    : 'addDoctorForm__input'
                }
              />
              <ErrorMessage
                name="addressDetail"
                component="p"
                className="addDoctorForm__errorMessage"
              />
            </label>
            <label className="addDoctorForm__label">
              Telefon
              <Field
                name="phone"
                className={
                  formik.touched.phone && formik.errors.phone
                    ? 'addDoctorForm__input input--error'
                    : 'addDoctorForm__input'
                }
              />
              <ErrorMessage
                name="phone"
                component="p"
                className="addDoctorForm__errorMessage"
              />
            </label>
            <label className="addDoctorForm__label">
              E-mail
              <Field
                name="email"
                type="email"
                className={
                  formik.touched.email && formik.errors.email
                    ? 'addDoctorForm__input input--error'
                    : 'addDoctorForm__input'
                }
              />
              <ErrorMessage
                name="email"
                component="p"
                className="addDoctorForm__errorMessage"
              />
            </label>
            <label className="addDoctorForm__label">
              <span>
                Pravidelnost prohlídek <span className="formRequired">*</span>
              </span>
              <Field
                name="frequency"
                as="select"
                className={
                  formik.touched.frequency && formik.errors.frequency
                    ? 'addDoctorForm__input input--error'
                    : 'addDoctorForm__input'
                }
                required
              >
                {doctorFrequencyList.map((doctorFrequency, index) => (
                  <option value={doctorFrequency.value} key={index}>
                    {doctorFrequency.textCs}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="frequency"
                component="p"
                className="addDoctorForm__errorMessage"
              />
            </label>
            {/* TO DO formik.values.frequency === 'other' ? <p>jiné</p> : null*/}
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
