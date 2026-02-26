import { useEffect, useState } from 'react';
import { BigButton } from '../../components/BigButton/BigButton';
import { NextAppointment } from '../../components/NextAppointment/NextAppointment';
import { TestDataFiller } from '../../components/TestDataFiller/TestDataFiller';
import { db } from '../../db/db';

export const HomePage: React.FC = () => {
  const [demoOn, setDemoOn] = useState<boolean>(false);
  const [addDoctorStatus, setAddDoctorStatus] = useState<string>('');
  useEffect(() => {
    const checkDemo = async () => {
      const count = await db.doctors
        .filter((doctor) => doctor.isDemo === true)
        .count();

      setDemoOn(count > 0);
    };

    checkDemo();
  }, []);

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

      <TestDataFiller
        setDemoOn={setDemoOn}
        demoOn={demoOn}
        setAddDoctorStatus={setAddDoctorStatus}
      />
      {addDoctorStatus}
    </main>
  );
};
