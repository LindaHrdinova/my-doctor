import { BigButton } from '../../components/BigButton/BigButton';
import { Doctor } from '../../components/Doctor/Doctor';
import { useDoctorPastList } from '../../util/doctorListHook/doctorListHook';

export const PastDoctorPage: React.FC = () => {
  const pastDoctors = useDoctorPastList();

  return (
    <>
      <h2>Archív doktorů</h2>
      {pastDoctors && pastDoctors.length === 0 && (
        <p>Nemáte žádného bývalého doktora</p>
      )}
      {pastDoctors &&
        pastDoctors.length > 0 &&
        pastDoctors?.map((doctor) => (
          <Doctor
            key={doctor.id}
            id={doctor.id}
            speciality={doctor.speciality}
            name={doctor.name}
            address={doctor.address}
            addressDetail={doctor.addressDetail}
            phone={doctor.phone}
            email={doctor.email}
            frequency={doctor.frequency}
            reminder={doctor.reminder}
            current={doctor.current}
          />
        ))}
      <BigButton
        textButton="Seznam doktorů"
        urlButton="/doctors"
        primaryButton={true}
      />
      <BigButton urlButton="/" textButton="Domů" primaryButton={false} />
    </>
  );
};
