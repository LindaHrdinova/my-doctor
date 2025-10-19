import './style.css';
import { AddDoctorForm } from '../../components/AddDoctorForm/AddDoctorForm';

export const AddDoctorPage = () => {
  return (
    <>
      <h2>Přidat doktora do seznamu</h2>
      <AddDoctorForm />
      <p>Tady bude formulář pro přidávání nových doktorů.</p>
    </>
  );
};
