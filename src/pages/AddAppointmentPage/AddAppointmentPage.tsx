import { AddAppointmentForm } from '../../components/AddAppointmentForm/AddAppointmentForm';
import { BigButton } from '../../components/BigButton/BigButton';

export const AddAppointmentPage = () => {
  return (
    <>
      <h2>Přidat termín</h2>
      <p>Tady bude formulář pro přidání návštěvy.</p>
      <AddAppointmentForm />
      <BigButton urlButton="../" textButton="Domů" primaryButton={false} />
    </>
  );
};
