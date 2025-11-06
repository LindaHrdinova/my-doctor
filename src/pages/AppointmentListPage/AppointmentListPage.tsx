import { FaPlus } from 'react-icons/fa';
import { BigButton } from '../../components/BigButton/BigButton';

export const AppointmentList = () => {
  return (
    <>
      <h2>Seznam termínů</h2>
      <p>Tady bude seznam termínů.</p>
      <BigButton
        textButton={<FaPlus />}
        urlButton="new-appointment"
        primaryButton={true}
      />
      <BigButton urlButton="../" textButton="Domů" primaryButton={false} />
    </>
  );
};
