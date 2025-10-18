import { Link } from 'react-router';

export const AddDoctorPage = () => {
  return (
    <>
      <h2>Přidat doktora do seznamu</h2>
      <p>Tady bude formulář pro přidávání nových doktorů.</p>
      <Link to="/">
        <button>Zpátky na hlavní stránku</button>
      </Link>
    </>
  );
};
