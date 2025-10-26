import type React from 'react';
import { Link } from 'react-router';
import { Doctor } from '../../components/Doctor/Doctor';
import { BigButton } from '../../components/BigButton/BigButton';
import { FaPlus } from 'react-icons/fa';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/db';

interface doctorListDataProp {
  speciality: string;
  name: string;
  address: string;
  addressDetail: string;
  phone: string;
  email: string;
  frequency: string;
}

const doctorListData: doctorListDataProp[] = [
  {
    speciality: 'Stomatologie',
    name: 'MuDr. Petr Korunka',
    address: 'Pobřežní 24, 186 00, Praha',
    addressDetail: '2. patro',
    phone: '231 231 231',
    email: 'email@email.com',
    frequency: '2x ročně',
  },
  {
    speciality: 'Dermatologie',
    name: 'MuDr. Klára Kožená',
    address: 'Hradeckých 822/5, 140 00, Praha',
    addressDetail: '',
    phone: '200 525 200',
    email: 'mail@kozni.com',
    frequency: 'nepravidelné',
  },
  {
    speciality: 'Kardiologie',
    name: 'MuDr. Marta Srdečná',
    address: 'Petržílková 2, 158 00, Praha',
    addressDetail: 'Špatná dostupnost MHD',
    phone: '300 232 300',
    email: 'srdecna@doktorka.com',
    frequency: '4x ročně',
  },
];
/*
export const DoctorListFromDB = () => {
  return (
    <ul>
      {doctors?.map((doctor) => (
        <li key={doctor.id}>
          {doctor.speciality} {doctor.name}
        </li>
      ))}
    </ul>
  );
};
*/
export const DoctorList: React.FC = () => {
  const doctors = useLiveQuery(() => db.doctors.toArray());
  return (
    <>
      <h2>Seznam doktorů</h2>
      {doctors?.map((doctor) => (
        <Doctor
          key={doctor.id}
          speciality={doctor.speciality}
          name={doctor.name}
          address={doctor.address}
          addressDetail={doctor.addressDetail}
          phone={doctor.phone}
          email={doctor.email}
          frequency={doctor.frequency}
        />
      ))}
      {doctorListData.map((doctor, index) => (
        <Doctor
          key={index}
          speciality={doctor.speciality}
          name={doctor.name}
          address={doctor.address}
          addressDetail={doctor.addressDetail}
          phone={doctor.phone}
          email={doctor.email}
          frequency={doctor.frequency}
        />
      ))}

      <Link
        to="../new-doctor"
        className="button button--primary doctorList__newDoctor onClick__style"
      >
        <FaPlus />
      </Link>
      <BigButton urlButton="../" textButton="Domů" primaryButton={false} />
    </>
  );
};
