import { AddAppointmentForm } from '../../components/AddAppointmentForm/AddAppointmentForm';
import { useState } from 'react';

export const AddAppointmentPage: React.FC = () => {
  const [addAppointmentStatus, setAddAppointmentStatus] = useState<string>('');

  return (
    <>
      <h2>Přidat termín</h2>
      <p className="form__note">Pole označená * jsou povinná.</p>

      {addAppointmentStatus && <p>{addAppointmentStatus}</p>}

      <AddAppointmentForm setAddAppointmentStatus={setAddAppointmentStatus} />
    </>
  );
};
