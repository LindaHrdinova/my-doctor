import { BigButton } from '../../components/BigButton/BigButton';

export const AppointmentList = () => {
  return (
    <>
      <h2>Seznam termínů</h2>
      <p>Tady bude seznam termínů.</p>
      <BigButton
        textButton="Přidat termín"
        urlButton="new-appointment"
        primaryButton={false}
      />
      <BigButton urlButton="../" textButton="Domů" primaryButton={false} />
    </>
  );
};
