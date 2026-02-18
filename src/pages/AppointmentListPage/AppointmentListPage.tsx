import { FaPlus } from 'react-icons/fa';
import { BigButton } from '../../components/BigButton/BigButton';
import { Appointment } from '../../components/Appointment/Appointment';
import { useAppointmentsFutureList } from '../../components/AppointmentLists/AppoitmentList';
import { useAppointmentsPastList } from '../../components/AppointmentLists/AppoitmentList';

export const AppointmentList: React.FC = () => {
  const appointmentsPast = useAppointmentsPastList();
  const appointments = useAppointmentsFutureList();
  return (
    <>
      <h2>Seznam Past termínů</h2>
      {appointmentsPast &&
        appointmentsPast.length > 0 &&
        appointmentsPast?.map((appointment) => (
          <Appointment
            id={appointment.id}
            key={appointment.id}
            date={appointment.date}
            time={appointment.time}
            speciality={appointment.speciality}
            doctorId={appointment.doctorId}
          />
        ))}
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
