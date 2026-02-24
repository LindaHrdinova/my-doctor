import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { AutoComplete } from 'primereact/autocomplete';
import { specialityList } from '../../data/specialityList';
import { db } from '../../db/db';
import type { DoctorDataProp } from '../../db/db';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { doctorFrequencyList } from '../../data/doctorFrequency';
import { useDoctorList } from '../../util/doctorListHook/doctorListHook';
import { appointmentReminderList } from '../../data/appointmentReminder';

type NewDoctorData = Omit<DoctorDataProp, 'id'>; //remove "id" from DoctorDataProp so I can leave it from "initialValues".

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
            reminder: doctorData.reminder ?? '',
            frequency: doctorData.frequency ?? '',
            current: doctorData.current ?? 0,
          }}
          validationSchema={SignupSchema}
          onSubmit={async (formData) => {
            try {
              await db.doctors.update(Number(idDoctor), formData);
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
                  Připomínka objednání dalšího termínu:
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
