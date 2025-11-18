import './style.css';
import { AddDoctorForm } from '../../components/AddDoctorForm/AddDoctorForm';
import { useState } from 'react';

export const AddDoctorPage = () => {
  const [addDoctorStatus, setAddDoctorStatus] = useState<string>('');

  return (
    <>
      <h2>Přidat doktora do seznamu</h2>
      <p className="form__note">Pole označená * jsou povinná.</p>

      {addDoctorStatus && <p>{addDoctorStatus}</p>}

      <AddDoctorForm setAddDoctorStatus={setAddDoctorStatus} />
    </>
  );
};
