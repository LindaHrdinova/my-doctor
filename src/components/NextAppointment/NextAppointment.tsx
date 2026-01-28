import { useLiveQuery } from 'dexie-react-hooks';
import { Appointment } from '../Appointment/Appointment';
import './style.css';
import { db } from '../../db/db';

/*const appointmentList = [
  { day: 'St', date: '26.11.2025', time: '18:00', doctor: 'Frontentologie' },
  { day: 'Pá', date: '5.12.2025', time: '16:30', doctor: 'Rentgen' },
  { day: 'Po', date: '26.1.2026', time: '9:00', doctor: 'Endokrinologie' },
];*/

export const NextAppointment: React.FC = () => {
  const appointments = useLiveQuery(() =>
    db.appointments.orderBy('date').limit(3).toArray(),
  );

  return (
    <>
      {appointments?.map((appointment) => (
        <Appointment
          id={appointment.id}
          key={appointment.id}
          date={appointment.date}
          time={appointment.time}
          speciality={appointment.speciality}
          doctorId={appointment.doctorId}
        />
      ))}
    </>
  );
};
