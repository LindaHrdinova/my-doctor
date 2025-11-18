import './style.css';
import { AddDoctorForm } from '../../components/AddDoctorForm/AddDoctorForm';
import { useState } from 'react';

const [addDoctorStatus, setAddDoctorStatus] = useState<string>('');

export const AddDoctorPage = () => {
  return (
    <>
      <h2>Přidat doktora do seznamu</h2>
      <p className="form__note">Pole označená * jsou povinná.</p>

      {addDoctorStatus && <p>{addDoctorStatus}</p>}

      <AddDoctorForm setAddDoctorStatus={setAddDoctorStatus} />
    </>
  );
};
