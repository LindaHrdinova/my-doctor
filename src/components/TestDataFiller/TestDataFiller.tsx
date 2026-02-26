import './style.css';
import type { NewDoctorData } from '../../db/db';
import { db } from '../../db/db';

interface testDataFiller {
  setDemoOn: any;
  demoOn: boolean;
  setAddDoctorStatus: any;
}

export const TestDataFiller: React.FC<testDataFiller> = ({
  setDemoOn,
  demoOn,
  setAddDoctorStatus,
}) => {
  const demoDoctorList: NewDoctorData[] = [
    {
      speciality: 'Stomatologie',
      name: 'MuDr. Petr Korunka',
      address: 'Pobřežní 24, 186 00, Praha',
      addressDetail: '2. patro',
      phone: '231231231',
      email: 'zuby@email.com',
      website: '',
      note: 'Příjemná sestřička',
      frequency: '{"unit":"months","amount":6}',
      reminder: '{"unit":"months","amount":1}',
      current: 0,
      isDemo: true,
    },
    {
      speciality: 'Stomatologie',
      name: 'MUDr. Jana Stoličková',
      address: 'Vinohradská 123 Praha',
      addressDetail: '3. patro',
      phone: '',
      email: 'zuby@stolicka.cz',
      website: '',
      note: '',
      frequency: '{"unit":"months","amount":6}',
      reminder: '{"unit":"months","amount":1}',
      current: 1,
      isDemo: true,
    },
    {
      speciality: 'Dermatologie',
      name: 'MUDr. Klára Kožená',
      address: 'Hradeckých 882/5, 140 00, Praha',
      addressDetail: '',
      phone: '200525200',
      email: 'mail@kozni.com',
      website: '',
      note: 'Dlouhá objednací doba',
      frequency: '{"unit":"weeks","amount":2}',
      reminder: '{"unit":"weeks","amount":1}',
      current: 0,
      isDemo: true,
    },
    {
      speciality: 'Kardiologie',
      name: 'MuDr. Marta Srdečná',
      address: 'Petržílková 2, 158 00, Praha',
      addressDetail: 'Špatná dostupnost MHD',
      phone: '300232300',
      email: 'srdecna@doktorka.com',
      website: 'https://mudr-srdecna.cz',
      note: '',
      frequency: '{"unit":"months","amount":4}',
      reminder: '{"unit":"months","amount":1}',
      current: 0,
      isDemo: true,
    },
    {
      speciality: 'Frontentologie',
      name: 'ReactGirls',
      address: 'nám. I. P. Pavlova 5, 120 00 Vinohrady',
      addressDetail: '',
      phone: '245501660',
      email: '',
      website: 'https://reactgirls.com/',
      note: '',
      frequency: 'irregular',
      reminder: '',
      current: 0,
      isDemo: true,
    },
  ];

  const handleDemoDataFill = async (demoDoctorList: NewDoctorData[]) => {
    try {
      if (demoOn) {
        await db.doctors.filter((doctor) => doctor.isDemo === true).delete();
        setDemoOn(false);
      } else {
        await db.doctors.bulkAdd(demoDoctorList);
        setAddDoctorStatus(`Demo doctoři nastaveny`);
        setDemoOn(true);
      }
    } catch (error) {
      console.log(error);
      setAddDoctorStatus('Demo se nenačetlo');
    }
  };

  return (
    <>
      <button
        className={`testButton  onClick__style`}
        onClick={async () => {
          await handleDemoDataFill(demoDoctorList);
        }}
      >
        {demoOn ? 'Vypnout demo' : 'Zapnout demo'}
      </button>
    </>
  );
};
