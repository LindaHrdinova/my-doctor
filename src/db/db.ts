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
}

const db = new Dexie('myDoctor') as Dexie & {
  doctors: EntityTable<DoctorDataProp, 'id'>;
};
db.version(1).stores({
  doctors:
    'id++, speciality, name, address, addressDetail, phone, email, frequency',
});

export type { DoctorDataProp };
export { db };
