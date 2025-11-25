import './style.css';
//import { useLiveQuery } from 'dexie-react-hooks';
//import { db } from '../../db/db';

interface appointmentDataProp {
  day: string;
  date: string;
  time: string;
  speciality: string;
}

export const Appointment: React.FC<appointmentDataProp> = ({
  day,
  date,
  time,
  speciality,
}) => {
  //const appointments = useLiveQuery(() => db.appointments.toArray());
  return (
    <div className="appointment">
      <h3 className="appointment__title">
        {day} {date} {time}
      </h3>
      <span>{speciality}</span>
    </div>
  );
};
