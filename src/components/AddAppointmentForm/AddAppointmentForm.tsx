import '../../form.css';
import { useState } from 'react';
import { Link } from 'react-router';
import { AutoComplete } from 'primereact/autocomplete';
import { db } from '../../db/db';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { Temporal } from '@js-temporal/polyfill';
import { useDoctorList } from '../../util/doctorListHook/doctorListHook';
import { appointmentYupValidationSchema } from '../../validation/formSchemas';

type AddAppointmentFormProps = {
  setAddAppointmentStatus: React.Dispatch<React.SetStateAction<string>>;
};

type AppointmentFormValues = {
  date: string;
  time: string;
  doctorId: number;
  speciality: string; // just for <AutoComplete> and <select>
};

export const AddAppointmentForm = ({
  setAddAppointmentStatus,
}: AddAppointmentFormProps) => {
  const myDoctorList = useDoctorList();

  const myDocSpecList = myDoctorList?.map((doc) => doc.speciality) ?? [];

  const [myDoctorListSpec, setMyDoctorListSpec] = useState<string[]>([]);

  //SPECIALITY autocomplete "našeptávač"
  const searchSpeciality = (e: { query: string }) => {
    const query = e.query.toLowerCase().trim();

    const map = new Map<string, string>();

    myDocSpecList.forEach((doc) => {
      const normalized = doc.trim().toLowerCase();

      if (normalized.startsWith(query) && !map.has(normalized)) {
        map.set(normalized, doc.trim());
      }
    });

    setMyDoctorListSpec([...map.values()]);
  };

  //YUP validation
  const SignupSchema = appointmentYupValidationSchema;
  const handleSubmitFormik = async (
    formData: AppointmentFormValues,
    { resetForm }: FormikHelpers<AppointmentFormValues>,
  ) => {
    try {
      const { speciality, ...dataToSave } = formData;
      await db.appointments.add(dataToSave);
      setAddAppointmentStatus(`Nový termín byl přidán do diáře!`);

      resetForm();
    } catch (error) {
      console.log(error);
      setAddAppointmentStatus('Nepovedlo se přidat termín do diáře.');
    }
  };

  return (
    <>
      <Formik<AppointmentFormValues>
        initialValues={{
          date: Temporal.Now.plainDateISO().toString(),
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
                required
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
                suggestions={myDoctorListSpec}
                completeMethod={searchSpeciality}
                onChange={(e) => {
                  formik.setFieldValue('speciality', e.value);
                  formik.setFieldValue('doctorId', 0);
                }}
                onBlur={() => formik.setFieldTouched('speciality', true)}
                required
              />
              <ErrorMessage
                name="speciality"
                component="p"
                className="add
                Form__errorMessage"
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
                <label className="addForm__label">
                  Vyber doktora
                  <select
                    name="doctorId"
                    className="addForm__input"
                    value={formik.values.doctorId}
                    onChange={(e) =>
                      formik.setFieldValue('doctorId', Number(e.target.value))
                    }
                  >
                    <option value={0}>Vyber doktora</option>

                    {/* active doctors*/}
                    {myDoctorList &&
                      myDoctorList?.filter(
                        (doc) =>
                          doc.current === 0 &&
                          doc.speciality
                            .toLowerCase()
                            .startsWith(formik.values.speciality.toLowerCase()),
                      ).length >= 1 && (
                        <>
                          <optgroup label="Aktivní doktoři"></optgroup>
                          {myDoctorList
                            ?.filter(
                              (doc) =>
                                doc.current === 0 &&
                                doc.speciality
                                  .toLowerCase()
                                  .startsWith(
                                    formik.values.speciality.toLowerCase(),
                                  ) &&
                                formik.values.speciality.length > 2,
                            )
                            .map((doc) => (
                              <option key={doc.id} value={doc.id}>
                                {doc.speciality} {doc.name && ' - ' + doc.name}
                              </option>
                            ))}
                        </>
                      )}

                    {/* inactive doctors*/}
                    {myDoctorList &&
                      myDoctorList?.filter(
                        (doc) =>
                          doc.current === 1 &&
                          doc.speciality
                            .toLowerCase()
                            .startsWith(formik.values.speciality.toLowerCase()),
                      ).length >= 1 && (
                        <>
                          <optgroup label="Neaktivní doktoři"></optgroup>
                          {myDoctorList
                            ?.filter(
                              (doc) =>
                                doc.current === 1 &&
                                doc.speciality
                                  .toLowerCase()
                                  .startsWith(
                                    formik.values.speciality.toLowerCase(),
                                  ) &&
                                formik.values.speciality.length > 2,
                            )
                            .map((doc) => (
                              <option key={doc.id} value={doc.id}>
                                {doc.speciality} {doc.name && ' - ' + doc.name}
                              </option>
                            ))}
                        </>
                      )}
                  </select>
                </label>
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
            <div className="addForm__buttons">
              <input
                type="submit"
                className="onClick__style button button--primary"
                value="Zapsat termín"
                disabled={formik.values.doctorId === 0 ? true : false}
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
