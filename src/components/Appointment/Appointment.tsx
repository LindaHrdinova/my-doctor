import './style.css';
import { useState } from 'react';
import { Link } from 'react-router';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { MdEdit, MdDelete } from 'react-icons/md';
import { db } from '../../db/db';
import { useLiveQuery } from 'dexie-react-hooks';

interface appointmentDataProp {
  id: number;
  date: Date;
  time: string;
  speciality: string;
  doctorId: number;
}

export const Appointment: React.FC<appointmentDataProp> = ({
  id,
  date,
  time,
  speciality,
  doctorId,
}) => {
  //const appointments = useLiveQuery(() => db.appointments.toArray());
  const [detailHidden, setDetailHidden] = useState<boolean>(true);

  //doctor data
  const doctors = useLiveQuery(() => db.doctors.toArray());
  const doctorData = doctors?.find((doctor) => doctor.id === doctorId);

  console.log(doctorData);

  return (
    <div className="appointment">
      <div onClick={() => setDetailHidden(!detailHidden)}>
        <h3 className="appointment__title">
          {date.toString()} {time}
        </h3>
        <span className="onClick__style">
          {speciality}
          {detailHidden ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
        </span>
        <ul
          className={
            detailHidden
              ? 'animation__data animation__data--hidden'
              : 'animation__data '
          }
        >
          <li>
            <span className="doctor__menu">
              <Link to={`/appointments/${id}`}>
                <MdEdit className="doctor__icon" />
              </Link>
              <MdDelete
                className="doctor__icon"
                onClick={async () => await db.appointments.delete(id)}
              />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
