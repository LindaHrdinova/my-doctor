import { Appointment } from '../Appointment/Appointment';
import './style.css';

const appointmentList = [
  { day: 'St', date: '26.11.2025', time: '18:00', doctor: 'Frontentologie' },
  { day: 'Pá', date: '5.12.2025', time: '16:30', doctor: 'Rentgen' },
  { day: 'Po', date: '26.1.2026', time: '9:00', doctor: 'Endokrinologie' },
];

export const NextAppointment: React.FC = () => {
  return (
    <>
      {appointmentList.map((app, id) => {
        return (
          <Appointment
            key={id}
            day={app.day}
            date={app.date}
            time={app.time}
            speciality={app.doctor}
          />
        );
      })}
    </>
  );
};
