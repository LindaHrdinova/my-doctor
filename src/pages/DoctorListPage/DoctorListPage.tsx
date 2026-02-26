import type React from 'react';
import { Doctor } from '../../components/Doctor/Doctor';
import { BigButton } from '../../components/BigButton/BigButton';
import { FaPlus } from 'react-icons/fa';
import {
  useDoctorCurrentList,
  useDoctorPastList,
} from '../../util/doctorListHook/doctorListHook';

/* const doctorListData: doctorListDataProp[] = [
  {
    speciality: 'Stomatologie',
    name: 'MuDr. Petr Korunka',
    address: 'Pobřežní 24, 186 00, Praha',
    addressDetail: '2. patro',
    phone: '231231231',
    email: 'email@email.com',
    frequency: '{"unit":"months","amount":6}',
    reminder: '{"unit":"months","amount":1}',
    current: 0,
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
  },  {
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
];*/

export const DoctorList: React.FC = () => {
  const doctors = useDoctorCurrentList();
  const pastDoctors = useDoctorPastList();

  return (
    <>
      <h2>Seznam doktorů</h2>

      {pastDoctors && pastDoctors.length > 0 && (
        <BigButton
          urlButton="/doctors/past-doctors"
          textButton="Archivovaní doktoři"
          primaryButton={false}
        />
      )}

      {doctors &&
        doctors.length > 0 &&
        doctors?.map((doctor) => (
          <Doctor
            key={doctor.id}
            id={doctor.id}
            speciality={doctor.speciality}
            name={doctor.name}
            address={doctor.address}
            addressDetail={doctor.addressDetail}
            phone={doctor.phone}
            email={doctor.email}
            website={doctor.website}
            note={doctor.note}
            frequency={doctor.frequency}
            reminder={doctor.reminder}
            current={doctor.current}
            isDemo={doctor.isDemo}
          />
        ))}

      <BigButton
        urlButton="/new-doctor"
        textButton={<FaPlus />}
        primaryButton={true}
      />
      <BigButton urlButton="/" textButton="Domů" primaryButton={false} />
    </>
  );
};
