import { BigButton } from '../../components/BigButton/BigButton';
import { NextAppointment } from '../../components/NextAppointment/NextAppointment';

export const HomePage = () => {
  return (
    <main>
      <h2>Homepage</h2>
      <NextAppointment />
      <BigButton textButton="Seznam termínů" urlButton="appointments" />
      <BigButton textButton="Přidat termín" urlButton="new-appointment" />
      <BigButton textButton="Seznam doktorů" urlButton="doctors" />
      <BigButton textButton="Přidat doktora" urlButton="new-doctor" />
    </main>
  );
};
