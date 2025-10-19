import { Link } from 'react-router';

export const AddDoctorPage = () => {
  return (
    <>
      <h2>Přidat doktora do seznamu</h2>
      <p>Tady bude formulář pro přidávání nových doktorů.</p>
      <Link to="/">
        <button className="onClick__style">Zpátky na hlavní stránku</button>
      </Link>
    </>
  );
};
