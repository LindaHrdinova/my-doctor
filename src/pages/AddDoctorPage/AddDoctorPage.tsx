import './style.css';
import { AddDoctorForm } from '../../components/AddDoctorForm/AddDoctorForm';

export const AddDoctorPage = () => {
  return (
    <>
      <h2>Přidat doktora do seznamu</h2>
      <p className="form__note">Pole označená * jsou povinná.</p>
      <AddDoctorForm />
    </>
  );
};
