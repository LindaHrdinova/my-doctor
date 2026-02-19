import { FaPlus } from 'react-icons/fa';
import { BigButton } from '../../components/BigButton/BigButton';
import { Appointment } from '../../components/Appointment/Appointment';
import { useAppointmentsFutureList } from '../../components/AppointmentLists/AppointmentList';
import { useAppointmentsPastList } from '../../components/AppointmentLists/AppointmentList';

export const AppointmentList: React.FC = () => {
  const appointments = useAppointmentsFutureList();
  const pastAppointments = useAppointmentsPastList();
  return (
    <>
      <h2>Seznam termínů</h2>
      {pastAppointments && pastAppointments.length > 0 && (
        <BigButton
          textButton="Proběhlé termíny"
          urlButton="/appointments/past-appoitments"
          primaryButton={false}
        />
      )}
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
