import './style.css';
//import { useLiveQuery } from 'dexie-react-hooks';
//import { db } from '../../db/db';

interface appointmentDataProp {
  date: Date;
  time: string;
  speciality: string;
}

export const Appointment: React.FC<appointmentDataProp> = ({
  date,
  time,
  speciality,
}) => {
  //const appointments = useLiveQuery(() => db.appointments.toArray());

  console.log(date);
  return (
    <div className="appointment">
      <h3 className="appointment__title">
        {date.toString()} {time}
      </h3>
      <span>{speciality}</span>
    </div>
  );
};
