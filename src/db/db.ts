import Dexie, { type EntityTable } from 'dexie';

interface DoctorDataProp {
  id: number;
  speciality: string;
  name: string;
  address: string;
  addressDetail: string;
  phone: string;
  email: string;
  frequency: string;
  current: number /* 0 true, 1 false*/;
}

interface AppointmentDataProp {
  id: number;
  date: Date /* pouzit knihovnu Temporal */;
  time: string;
  speciality: string;
  address: string;
}

const db = new Dexie('myDoctor') as Dexie & {
  doctors: EntityTable<DoctorDataProp, 'id'>;
  appointment: EntityTable<AppointmentDataProp, 'id'>;
};
db.version(1).stores({
  doctors:
    'id++, speciality, name, address, addressDetail, phone, email, frequency, current',
  appointment: 'id++, date, time, speciality, address',
});

export type { DoctorDataProp };
export { db };
