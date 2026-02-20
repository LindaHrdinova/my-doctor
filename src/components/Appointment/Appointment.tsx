import './style.css';
import { useState } from 'react';
import { Link } from 'react-router';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { MdEdit, MdDelete } from 'react-icons/md';
import { db } from '../../db/db';
import type { AppointmentDataProp, DoctorDataProp } from '../../db/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { dbDoctorText } from '../../text/dbDoctorText';
import { humanDate } from '../../util/humanDate/humanDate';
import { Temporal } from '@js-temporal/polyfill';

export const Appointment: React.FC<AppointmentDataProp> = ({
  id,
  date,
  time,
  speciality,
  doctorId,
}) => {
  const [detailHidden, setDetailHidden] = useState<boolean>(true);
  console.log(speciality);

  const todayDate = Temporal.Now.plainDateISO();
  const tommorow = todayDate.add({ days: 1 });

  let appoitmentClass;
  if (date === todayDate.toString()) {
    appoitmentClass = 'appointment appointment--today';
  } else if (date === tommorow.toString()) {
    appoitmentClass = 'appointment appointment--tomorrow';
  } else {
    appoitmentClass = 'appointment';
  }

  let isToday;
  if (date === todayDate.toString()) {
    isToday = '!!! DNES !!! - ';
  } else if (date === tommorow.toString()) {
    isToday = '! ZÍTRA ! - ';
  }

  //doctor data
  const doctors = useLiveQuery<DoctorDataProp[]>(() => db.doctors.toArray());
  const doctorData = doctors?.find((doctor) => doctor.id === doctorId);

  return (
    <div className={appoitmentClass}>
      <div onClick={() => setDetailHidden(!detailHidden)}>
        <h3 className="appointment__title">
          {isToday}
          {humanDate(date)} {time}
        </h3>
        <span className="onClick__style">
          {doctorData?.speciality}
          {detailHidden ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
        </span>
        <ul
          className={
            detailHidden
              ? 'animation__data animation__data--hidden'
              : 'animation__data '
          }
        >
          {doctorData?.name ? (
            <li>
              <strong>Jméno: </strong> {doctorData?.name}
            </li>
          ) : null}
          {doctorData?.address ? (
            <li>
              <strong>Adresa:</strong> {doctorData?.address}
            </li>
          ) : null}
          {doctorData?.addressDetail ? (
            <li>
              <strong>Poznámka k adrese:</strong> {doctorData?.addressDetail}
            </li>
          ) : null}
          {doctorData?.phone ? (
            <li>
              <strong>Telefon:</strong>{' '}
              <a href={`tel:${doctorData?.phone}`}>{doctorData?.phone}</a>
            </li>
          ) : null}
          {doctorData?.email ? (
            <li>
              <strong>E-mail:</strong>{' '}
              <a href={`mailto:${doctorData?.email}`}>{doctorData?.email}</a>
            </li>
          ) : null}
          {doctorData?.frequency ? (
            <li>
              <strong>Pravidelnost prohlídek:</strong>{' '}
              {dbDoctorText(doctorData?.frequency)}
            </li>
          ) : null}
          <span className="doctor__menu">
            <Link to={`/appointments/${id}`}>
              <MdEdit className="doctor__icon" />
            </Link>
            <MdDelete
              className="doctor__icon"
              onClick={async () => {
                const confirmed = window.confirm(
                  'Opravdu chcete smazat tento termín? Tato akce je nevratná.',
                );

                if (confirmed) {
                  await db.appointments.delete(id);
                }
              }}
            />
          </span>
        </ul>
      </div>
    </div>
  );
};
