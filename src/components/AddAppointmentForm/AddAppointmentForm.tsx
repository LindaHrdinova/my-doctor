import '../../form.css';
import { useState } from 'react';
import { Link } from 'react-router';
import { AutoComplete } from 'primereact/autocomplete';
import { specialityList } from '../../data/specialityList';
import { db } from '../../db/db';
import type { AppointmentDataProp } from '../../db/db';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';

type AddAppointmentFormProps = {
  setAddAppointmentStatus: React.Dispatch<React.SetStateAction<string>>;
};

export const AddAppointmentForm = ({
  setAddAppointmentStatus,
}: AddAppointmentFormProps) => {
  type NewAppointmentData = Omit<AppointmentDataProp, 'id'>; //remove "id" from DoctorDataProp so I can leave it from "initialValues".

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
    date: Yup.date().required('Povinné'),
    time: Yup.string()
      .matches(/^(\d|[01]\d|2[0-3]):[0-5]\d$/, 'Neplatný formát času')
      .required('Povinné'),
    speciality: Yup.string().required('Povinné'),
    address: Yup.string(),
    addressDetail: Yup.string(),
  });

  const handleSubmitFormik = async (
    formData: NewAppointmentData,
    { resetForm }: FormikHelpers<NewAppointmentData>,
  ) => {
    try {
      await db.appointments.add(formData);
      setAddAppointmentStatus(`Nový termín byl přidán do diáře!`);
      console.log(formData);
      resetForm();
    } catch (error) {
      console.log(formData);
      console.log(error);
      setAddAppointmentStatus('Nepovedlo se přidat termín do diáře.');
    }
  };

  return (
    <>
      <Formik<NewAppointmentData>
        initialValues={{
          date: new Date(),
          time: '',
          speciality: '',
          address: '',
          addressDetail: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmitFormik}
      >
        {(formik) => (
          <Form className="addForm">
            <label className="addForm__label">
              <span>
                Datum <span className="formRequired">*</span>
              </span>
              <Field
                name="date"
                className={
                  formik.touched.date && formik.errors.date
                    ? 'addForm__input input--error'
                    : 'addForm__input'
                }
              />
              <ErrorMessage
                name="date"
                component="p"
                className="addForm__errorMessage"
              />
            </label>
            <label className="addForm__label">
              <span>
                Čas <span className="formRequired">*</span>
              </span>
              <Field
                name="time"
                className={
                  formik.touched.date && formik.errors.date
                    ? 'addForm__input input--error'
                    : 'addForm__input'
                }
              />
              <ErrorMessage
                name="time"
                component="p"
                className="addForm__errorMessage"
              />
            </label>
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
            </label>{' '}
            <label className="addForm__label">
              <span>Adresa</span>
              <Field
                name="address"
                className={
                  formik.touched.address && formik.errors.address
                    ? 'addForm__input input--error'
                    : 'addForm__input'
                }
              />
              <ErrorMessage
                name="address"
                component="p"
                className="addForm__errorMessage"
              />
            </label>{' '}
            <label className="addForm__label">
              <span>Poznámka k adrese</span>
              <Field
                name="addressDetail"
                className={
                  formik.touched.addressDetail && formik.errors.addressDetail
                    ? 'addForm__input input--error'
                    : 'addForm__input'
                }
              />
              <ErrorMessage
                name="addressDetail"
                component="p"
                className="addForm__errorMessage"
              />
            </label>
            <div className="addForm__buttons ">
              <input
                type="submit"
                className="onClick__style button button--primary"
                value="Zapsat termín"
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
