import { db } from '../../db/db';
import { useLiveQuery } from 'dexie-react-hooks';
import type { DoctorDataProp } from '../../db/db';

export const useDoctorList = (): DoctorDataProp[] | undefined => {
  const doctors = useLiveQuery<DoctorDataProp[]>(() =>
    db.doctors.orderBy('[current+speciality]').toArray(),
  );
  return doctors;
};

export const useDoctorCurrentList = (): DoctorDataProp[] | undefined => {
  const doctors = useDoctorList();
  const currentDoctors = doctors?.filter((doc) => doc.current === 0);
  return currentDoctors;
};

export const useDoctorPastList = (): DoctorDataProp[] | undefined => {
  const doctors = useDoctorList();
  const pastDoctors = doctors?.filter((doc) => doc.current === 1);
  return pastDoctors;
};
