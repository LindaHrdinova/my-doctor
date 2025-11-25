import { FaPlus } from 'react-icons/fa';
import { BigButton } from '../../components/BigButton/BigButton';
import { Appointment } from '../../components/Appointment/Appointment';

export const AppointmentList = () => {
  return (
    <>
      <h2>Seznam termínů</h2>
      <p>Tady bude seznam termínů.</p>
      <Appointment
        day={'St'}
        date={'26.11.2025'}
        time={'18:00'}
        speciality={'Frontentologie'}
      />
      <BigButton
        textButton={<FaPlus />}
        urlButton="new-appointment"
        primaryButton={true}
      />
      <BigButton urlButton="../" textButton="Domů" primaryButton={false} />
    </>
  );
};
