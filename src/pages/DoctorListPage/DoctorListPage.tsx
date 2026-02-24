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
    phone: '231 231 231',
    email: 'email@email.com',
    frequency: '2x ročně',
    current: 0,
  },
  {
    speciality: 'Dermatologie',
    name: 'MuDr. Klára Kožená',
    address: 'Hradeckých 882/5, 140 00, Praha',
    addressDetail: '',
    phone: '200 525 200',
    email: 'mail@kozni.com',
    frequency: 'nepravidelné',
    current: 0,
  },
  {
    speciality: 'Kardiologie',
    name: 'MuDr. Marta Srdečná',
    address: 'Petržílková 2, 158 00, Praha',
    addressDetail: 'Špatná dostupnost MHD',
    phone: '300 232 300',
    email: 'srdecna@doktorka.com',
    frequency: '4x ročně',
    current: 1,
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
