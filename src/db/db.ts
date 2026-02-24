import Dexie, { type EntityTable } from 'dexie';

interface DoctorDataProp {
  id: number;
  speciality: string;
  name: string;
  address: string;
  addressDetail: string;
  phone: string;
  email: string;
  website: string;
  note: string;
  frequency: string;
  reminder: string;
  current: number /* 0 true, 1 false*/;
  isDemo: boolean;
}

type NewDoctorData = Omit<DoctorDataProp, 'id'>; //remove "id" from DoctorDataProp so I can leave it from

interface AppointmentDataProp {
  id: number;
  date: string /* use library Temporal */;
  time: string;
  doctorId: number;
}

const db = new Dexie('myDoctor') as Dexie & {
  doctors: EntityTable<DoctorDataProp, 'id'>;
  appointments: EntityTable<AppointmentDataProp, 'id'>;
};
db.version(1).stores({
  doctors:
    'id++, speciality, name, address, addressDetail, phone, email, website, note, frequency, reminder, current, isDemo, [current+speciality]',
  appointments: 'id++, date, time, doctorId, [date+time]',
});

export type { DoctorDataProp, AppointmentDataProp, NewDoctorData };
export { db };
