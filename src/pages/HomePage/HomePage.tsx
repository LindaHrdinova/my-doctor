import { BigButton } from '../../components/BigButton/BigButton';
import { NextAppointment } from '../../components/NextAppointment/NextAppointment';

export const HomePage: React.FC = () => {
  return (
    <main>
      <h2>Homepage</h2>
      <NextAppointment />
      <BigButton
        textButton="Seznam termínů"
        urlButton="/appointments"
        primaryButton={true}
      />
      <BigButton
        textButton="Přidat termín"
        urlButton="/new-appointment"
        primaryButton={true}
      />
      <BigButton
        textButton="Seznam doktorů"
        urlButton="/doctors"
        primaryButton={true}
      />
      <BigButton
        textButton="Přidat doktora"
        urlButton="/new-doctor"
        primaryButton={true}
      />
    </main>
  );
};
