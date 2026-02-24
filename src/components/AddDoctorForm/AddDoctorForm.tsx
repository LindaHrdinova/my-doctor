import { useState } from 'react';
import { Link } from 'react-router';
import { AutoComplete } from 'primereact/autocomplete';
import { specialityList } from '../../data/specialityList';
import { doctorFrequencyList } from '../../data/doctorFrequency';
import { db } from '../../db/db';
import type { NewDoctorData } from '../../db/db';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { appointmentReminderList } from '../../data/appointmentReminder';
import { doctorYupValidationSchema } from '../../validation/formSchemas';

type AddDoctorFormProps = {
  setAddDoctorStatus: React.Dispatch<React.SetStateAction<string>>;
};

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
  const signupSchema = doctorYupValidationSchema;

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
          website: '',
          note: '',
          frequency: '',
          reminder: '',
          current: 0,
          isDemo: false,
        }}
        validationSchema={signupSchema}
        onSubmit={handleSubmitFormik}
      >
        {(formik) => (
          <Form className="addForm">
            <label className="addForm__label">
              <span>
                Specializace <span className="formRequired">*</span>
              </span>
              <AutoComplete
                className={
                  formik.touched.speciality && formik.errors.speciality
                    ? 'addForm__autoComplete input--error'
                    : 'addForm__autoComplete'
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
                className="addForm__errorMessage"
              />
            </label>
            <label className="addForm__label">
              Jméno
              <Field
                name="name"
                className={
                  formik.touched.name && formik.errors.name
                    ? 'addForm__input input--error'
                    : 'addForm__input'
                }
              />
              <ErrorMessage
                name="name"
                component="p"
                className="addForm__errorMessage"
              />
            </label>
            <label className="addForm__label">
              Adresa
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
            </label>
            <label className="addForm__label">
              Detail adresy
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
            <label className="addForm__label">
              Telefon
              <Field
                name="phone"
                className={
                  formik.touched.phone && formik.errors.phone
                    ? 'addForm__input input--error'
                    : 'addForm__input'
                }
              />
              <ErrorMessage
                name="phone"
                component="p"
                className="addForm__errorMessage"
              />
            </label>
            <label className="addForm__label">
              E-mail
              <Field
                name="email"
                type="email"
                className={
                  formik.touched.email && formik.errors.email
                    ? 'addForm__input input--error'
                    : 'addForm__input'
                }
              />
              <ErrorMessage
                name="email"
                component="p"
                className="addForm__errorMessage"
              />
            </label>
            <label className="addForm__label">
              Webové stránky
              <Field
                name="website"
                type="url"
                className={
                  formik.touched.website && formik.errors.website
                    ? 'addForm__input input--error'
                    : 'addForm__input'
                }
              />
              <ErrorMessage
                name="website"
                component="p"
                className="addForm__errorMessage"
              />
            </label>
            <label className="addForm__label">
              Poznámka
              <Field
                name="note"
                as="textarea"
                className={
                  formik.touched.note && formik.errors.note
                    ? 'addForm__input input--error'
                    : 'addForm__input'
                }
              />
              <ErrorMessage
                name="note"
                component="p"
                className="addForm__errorMessage"
              />
            </label>
            <label className="addForm__label">
              <span>
                Pravidelnost prohlídek <span className="formRequired">*</span>
              </span>
              <Field
                name="frequency"
                as="select"
                className={
                  formik.touched.frequency && formik.errors.frequency
                    ? 'addForm__input input--error'
                    : 'addForm__input'
                }
                required
              >
                {doctorFrequencyList.map((doctorFrequency) => (
                  <option
                    value={doctorFrequency.value}
                    key={doctorFrequency.value}
                  >
                    {doctorFrequency.textCs}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="frequency"
                component="p"
                className="addForm__errorMessage"
              />
            </label>
            {/* TO DO formik.values.frequency === 'other' ? <p>jiné</p> : null*/}
            {!(
              formik.values.frequency === 'irregular' ||
              formik.values.frequency === 'other' ||
              formik.values.frequency === ''
            ) ? (
              <label className="addForm__label">
                <span>
                  Připomínka objednání dalšího termínu
                  <span className="formRequired"> *</span>
                </span>
                <Field
                  name="reminder"
                  as="select"
                  className={
                    formik.touched.reminder && formik.errors.reminder
                      ? 'addForm__input input--error'
                      : 'addForm__input'
                  }
                >
                  {appointmentReminderList.map((appReminder) => (
                    <option value={appReminder.value} key={appReminder.value}>
                      {appReminder.textCs}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="reminder"
                  component="p"
                  className="addForm__errorMessage"
                />
              </label>
            ) : null}
            <div className="addForm__buttons">
              <input
                type="submit"
                className="onClick__style button button--primary"
                value="Přidat doktora"
                disabled={!formik.isValid || !formik.dirty}
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
