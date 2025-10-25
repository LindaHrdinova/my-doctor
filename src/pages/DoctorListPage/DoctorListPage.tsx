import type React from 'react';
import { Link } from 'react-router';
import { Doctor } from '../../components/Doctor/Doctor';
import { BigButton } from '../../components/BigButton/BigButton';
import { FaPlus } from 'react-icons/fa';

interface doctorListDataProp {
  speciality: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  frequency: string;
}

const doctorListData: doctorListDataProp[] = [
  {
    speciality: 'Stomatologie',
    name: 'MuDr. Petr Korunka',
    address: 'Pobřežní 24, 186 00, Praha',
    phone: '231 231 231',
    email: 'email@email.com',
    frequency: '2x ročně',
  },
  {
    speciality: 'Dermatologie',
    name: 'MuDr. Klára Kožená',
    address: 'Hradeckých 822/5, 140 00, Praha',
    phone: '200 525 200',
    email: 'mail@kozni.com',
    frequency: 'nepravidelné',
  },
  {
    speciality: 'Kardiologie',
    name: 'MuDr. Marta Srdečná',
    address: 'Petržílková 2, 158 00, Praha',
    phone: '300 232 300',
    email: 'srdecna@doktorka.com',
    frequency: '4x ročně',
  },
];

export const DoctorList: React.FC = () => (
  <>
    <h2>Seznam doktorů</h2>
    {doctorListData.map((doctor, index) => (
      <Doctor
        key={index}
        speciality={doctor.speciality}
        name={doctor.name}
        address={doctor.address}
        phone={doctor.phone}
        email={doctor.email}
        frequency={doctor.frequency}
      />
    ))}

    <Link to="../new-doctor">
      <button className="doctorList__newDoctor onClick__style">
        <FaPlus />
      </button>
    </Link>
    <BigButton urlButton="../" textButton="Domů" primaryButton={false} />
  </>
);
