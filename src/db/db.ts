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
  date: string /* use library Temporal */;
  time: string;
  speciality: string;
  doctorId: number;
}

const db = new Dexie('myDoctor') as Dexie & {
  doctors: EntityTable<DoctorDataProp, 'id'>;
  appointments: EntityTable<AppointmentDataProp, 'id'>;
};
db.version(1).stores({
  doctors:
    'id++, speciality, name, address, addressDetail, phone, email, frequency, current, [current+speciality]',
  appointments: 'id++, date, time, speciality, doctorId, [date+time]',
});

export type { DoctorDataProp, AppointmentDataProp };
export { db };
