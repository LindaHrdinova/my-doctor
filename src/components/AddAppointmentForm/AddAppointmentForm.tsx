import '../../form.css';
import { useState } from 'react';
import { Link } from 'react-router';
import { AutoComplete } from 'primereact/autocomplete';
import { db } from '../../db/db';
import type { AppointmentDataProp } from '../../db/db';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useLiveQuery } from 'dexie-react-hooks';

type AddAppointmentFormProps = {
  setAddAppointmentStatus: React.Dispatch<React.SetStateAction<string>>;
};

export const AddAppointmentForm = ({
  setAddAppointmentStatus,
}: AddAppointmentFormProps) => {
  type NewAppointmentData = Omit<AppointmentDataProp, 'id'>; //remove "id" from DoctorDataProp so I can leave it from "initialValues".

  //const [suggestDocSpec, setSuggestDocSpec] = useState<string[]>([]);
  const myDoctorList = useLiveQuery(() => db.doctors.toArray());
  const myDocSpecList = myDoctorList?.map((doc) => doc.speciality) ?? [];

  const [myDoctorListSpec, setMyDoctorListSpec] = useState<string[]>([]);

  //SPECIALITY autocomplete "našeptávač"
  const searchSpeciality = (e: { query: string }) => {
    const query = e.query.toLocaleLowerCase();
    const suggestion = myDocSpecList.filter((doc) =>
      doc.toLowerCase().startsWith(query),
    );
    setMyDoctorListSpec(suggestion);
  };

  //YUP validation
  const SignupSchema = Yup.object().shape({
    date: Yup.date().required('Povinné'),
    time: Yup.string().matches(
      /^(\d|[01]\d|2[0-3]):[0-5]\d$/,
      'Neplatný formát času',
    ),
    speciality: Yup.string().required('Povinné'),
  });

  const handleSubmitFormik = async (
    formData: NewAppointmentData,
    { resetForm }: FormikHelpers<NewAppointmentData>,
  ) => {
    try {
      await db.appointments.add(formData);
      setAddAppointmentStatus(`Nový termín byl přidán do diáře!`);

      resetForm();
    } catch (error) {
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
          doctorId: 0,
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
                type="date"
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
              <span>Čas</span>
              <Field
                name="time"
                type="time"
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
                suggestions={myDoctorListSpec}
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

            {formik.values.speciality.length > 2 &&
            myDoctorList &&
            myDoctorList?.filter((doc) =>
              doc.speciality
                .toLowerCase()
                .startsWith(formik.values.speciality.toLowerCase()),
            ).length >= 1 ? (
              <>
                <label className="addForm__label">Vyber doktora</label>
                <select>
                  {myDoctorList
                    ?.filter(
                      (doc) =>
                        doc.speciality
                          .toLowerCase()
                          .startsWith(formik.values.speciality.toLowerCase()) &&
                        formik.values.speciality.length > 2,
                    )
                    .map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.speciality} {doc.name && ' - ' + doc.name}
                      </option>
                    ))}
                </select>
              </>
            ) : null}

            {formik.values.speciality.length > 2 &&
            myDoctorList &&
            myDoctorList?.filter((doc) =>
              doc.speciality
                .toLowerCase()
                .startsWith(formik.values.speciality.toLowerCase()),
            ).length < 1 ? (
              <Link to="/new-doctor" className="onClick__style button">
                Žádný doktor nenalezen. Chcete přidat nového doktora?
              </Link>
            ) : null}

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
