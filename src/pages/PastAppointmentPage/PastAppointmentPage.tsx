import { Appointment } from '../../components/Appointment/Appointment';
import { useAppointmentsPastList } from '../../components/AppointmentLists/AppoitmentList';
import { BigButton } from '../../components/BigButton/BigButton';

export const PastAppointmentPage = () => {
  console.log(useAppointmentsPastList());

  const appointments = useAppointmentsPastList();

  return (
    <>
      <h2>Proběhlé termíny</h2>
      {appointments && appointments.length === 0 && (
        <p>Nemáte žádný proběhlý termín</p>
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
      <BigButton
        textButton="seznam termínů"
        urlButton="/appointments"
        primaryButton={true}
      />
      <BigButton urlButton="/" textButton="Domů" primaryButton={false} />
    </>
  );
};
