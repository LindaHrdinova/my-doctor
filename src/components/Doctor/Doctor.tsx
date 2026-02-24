import './style.css';
import { useState } from 'react';
import { Switcher } from '../Switcher/Switcher';
import { dbDoctorText } from '../../text/dbDoctorText';
import { Link } from 'react-router';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoMdArrowDropup } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import {
  useAppointmentsFutureList,
  useAppointmentsPastList,
} from '../../util/appointmentListHook/appointmentListHook';
import { humanDate } from '../../util/humanDate/humanDate';
import type { DoctorDataProp } from '../../db/db';
import { appointmentTextReminder } from '../../text/appointmentReminderText';

export const Doctor: React.FC<DoctorDataProp> = ({
  id,
  speciality,
  name,
  address,
  addressDetail,
  phone,
  email,
  website,
  note,
  frequency,
  reminder,
  current,
  isDemo,
}) => {
  const [detailHidden, setDetailHidden] = useState<boolean>(true);

  const appointmentsFuture = useAppointmentsFutureList();
  const appointmentPast = useAppointmentsPastList();
  console.log('isDemo');
  console.log(isDemo);

  const thisDocAppFuture = appointmentsFuture?.find(
    (app) => app.doctorId === id,
  );
  const thisDocAppPast = appointmentPast?.find((app) => app.doctorId === id);

  return (
    <div className="doctor">
      <h3
        className="doctor__title onClick__style"
        onClick={() => setDetailHidden(!detailHidden)}
      >
        {speciality}
        <span>
          {detailHidden ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
        </span>
      </h3>
      <ul
        className={
          detailHidden
            ? 'animation__data animation__data--hidden'
            : 'animation__data '
        }
      >
        {name ? (
          <li>
            <strong>Jméno: </strong> {name}
          </li>
        ) : null}
        {address ? (
          <li>
            <strong>Adresa:</strong>{' '}
            <a
              href={`https://mapy.cz/zakladni?q=${address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {address}
            </a>
          </li>
        ) : null}
        {addressDetail ? (
          <li>
            <strong>Poznámka k adrese:</strong> {addressDetail}
          </li>
        ) : null}
        {phone ? (
          <li>
            <strong>Telefon:</strong> <a href={`tel:${phone}`}>{phone}</a>
          </li>
        ) : null}
        {email ? (
          <li>
            <strong>E-mail:</strong> <a href={`mailto:${email}`}>{email}</a>
          </li>
        ) : null}
        {website ? (
          <li>
            <strong>Webové stránky:</strong> <a href={website}>{website}</a>
          </li>
        ) : null}
        {note ? (
          <li>
            <strong>Poznámka:</strong> <p>{note}</p>
          </li>
        ) : null}
        {frequency ? (
          <li>
            <strong>Pravidelnost prohlídek:</strong> {dbDoctorText(frequency)}
          </li>
        ) : null}
        {reminder ? (
          <li>
            <strong>Připomínka objednání: </strong>
            {appointmentTextReminder(reminder)}
          </li>
        ) : null}
        <li>
          <strong>Budoucí termín: </strong>
          {thisDocAppFuture ? (
            <>
              {humanDate(thisDocAppFuture.date)} {thisDocAppFuture.time}
            </>
          ) : (
            <>
              Nenastaveno.{' '}
              <Link to={`/new-appointment?doctorId=${id}`}>
                Nastavit příští termín
              </Link>
            </>
          )}
        </li>
        {thisDocAppPast ? (
          <li>
            <strong>Minulý termín: </strong>
            {humanDate(thisDocAppPast.date)} {thisDocAppPast.time}
          </li>
        ) : null}
        <li>
          <span className="doctor__menu">
            <Switcher current={current} id={id} />{' '}
            <Link to={`/doctors/${id}`}>
              <MdEdit
                className={
                  current === 0
                    ? 'doctor__icon'
                    : 'doctor__icon doctor__icon--inactive'
                }
              />
            </Link>
          </span>
        </li>
      </ul>
    </div>
  );
};
