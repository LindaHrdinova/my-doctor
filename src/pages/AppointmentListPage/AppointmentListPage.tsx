import { FaPlus } from 'react-icons/fa';
import { BigButton } from '../../components/BigButton/BigButton';
import { Appointment } from '../../components/Appointment/Appointment';

const appointmentList = [
  { day: 'St', date: '26.11.2025', time: '18:00', doctor: 'Frontentologie' },
  { day: 'Pá', date: '5.12.2025', time: '16:30', doctor: 'Rentgen' },
  { day: 'Po', date: '26.1.2026', time: '9:00', doctor: 'Endokrinologie' },
  { day: 'Čt', date: '22.1.2026', time: '7:45', doctor: 'Praktický lékař' },
];

export const AppointmentList = () => {
  return (
    <>
      <h2>Seznam termínů</h2>
      <p>Tady bude seznam termínů.</p>
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
      <BigButton
        textButton={<FaPlus />}
        urlButton="/new-appointment"
        primaryButton={true}
      />
      <BigButton urlButton="/" textButton="Domů" primaryButton={false} />
    </>
  );
};
