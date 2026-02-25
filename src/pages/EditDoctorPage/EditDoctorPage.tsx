import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { AutoComplete } from 'primereact/autocomplete';
import { specialityList } from '../../data/specialityList';
import { db } from '../../db/db';
import type { NewDoctorData } from '../../db/db';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { doctorFrequencyList } from '../../data/doctorFrequency';
import { useDoctorList } from '../../util/doctorListHook/doctorListHook';
import { appointmentReminderList } from '../../data/appointmentReminder';
import { doctorYupValidationSchema } from '../../validation/formSchemas';

export const EditDoctorPage: React.FC = () => {
  const { idDoctor } = useParams();

  const doctors = useDoctorList();
  const doctorData = doctors?.find((doc) => doc.id === Number(idDoctor));

  const [suggestDocSpec, setSuggestDocSpec] = useState<string[]>([]);
  const [editDoctorStatus, setEditDoctorStatus] = useState<string>('');

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

  if (!doctorData) {
    return <p>Načítám…</p>;
  } else
    return (
      <>
        <h2>Editace doktora</h2>
        {editDoctorStatus && <p>{editDoctorStatus}</p>}
        <Formik<NewDoctorData>
          enableReinitialize={true}
          initialValues={{
            speciality: doctorData.speciality ?? '',
            name: doctorData.name ?? '',
            address: doctorData.address ?? '',
            addressDetail: doctorData.addressDetail ?? '',
            phone: doctorData.phone ?? '',
            email: doctorData.email ?? '',
            website: doctorData.website ?? '',
            note: doctorData.note ?? '',
            reminder: doctorData.reminder ?? '',
            frequency: doctorData.frequency ?? '',
            current: doctorData.current ?? 0,
            isDemo: doctorData.isDemo ?? false,
          }}
          validationSchema={signupSchema}
          onSubmit={async (formData) => {
            try {
              const validatedData = await signupSchema.validate(formData, {
                stripUnknown: true,
              });

              await db.doctors.update(Number(idDoctor), validatedData);
              setEditDoctorStatus(`Údaje byly úspěšně uloženy!`);
            } catch (error) {
              setEditDoctorStatus(`Došlo k chybě a údaje se neuložily.`);
              console.log(error);
            }
          }}
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
                  type="string"
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
                  {' '}
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
              <div className="addForm__buttons ">
                <input
                  type="submit"
                  className="onClick__style button button--primary"
                  value="Uložit změny"
                  disabled={!formik.isValid || !formik.dirty}
                />
                <Link to="/doctors" className="onClick__style button">
                  Zpátky na seznam doktorů
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
};
