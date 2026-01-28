import { FaPlus } from 'react-icons/fa';
import { BigButton } from '../../components/BigButton/BigButton';
import { Appointment } from '../../components/Appointment/Appointment';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/db';

export const AppointmentList: React.FC = () => {
  const appointments = useLiveQuery(() =>
    db.appointments.orderBy('date').toArray(),
  );
  return (
    <>
      <h2>Seznam termínů</h2>
      {appointments &&
        appointments.length > 0 &&
        appointments?.map((appointment) => (
          <Appointment
            id={appointment.id}
            key={appointment.id}
            date={appointment.date}
            time={appointment.time}
            speciality={appointment.speciality}
            doctorId={appointment.doctorId}
          />
        ))}
      {appointments && appointments.length === 0 && (
        <p>Nemáte naplánovaný žádný termín.</p>
      )}
      <BigButton
        textButton={<FaPlus />}
        urlButton="/new-appointment"
        primaryButton={true}
      />
      <BigButton urlButton="/" textButton="Domů" primaryButton={false} />
    </>
  );
};
