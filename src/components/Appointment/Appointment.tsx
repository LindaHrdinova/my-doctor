import './style.css';
//import { useLiveQuery } from 'dexie-react-hooks';
//import { db } from '../../db/db';

export const Appointment = () => {
  //const appointments = useLiveQuery(() => db.appointments.toArray());
  return (
    <div className="card">
      <h3>Pá 16. 12. 2025 8:30</h3>
      <span>Rentgen</span>
    </div>
  );
};
