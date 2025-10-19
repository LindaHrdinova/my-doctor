import { Link } from 'react-router';
import './style.css';

export const AddDoctorForm = () => {
  return (
    <>
      <h3>Přidat doktora</h3>
      <form className="addDoctorForm">
        <div className="addDoctorForm__column">
          <label>Specialista:</label>
          <input type="text" className="addDoctorForm__input" required />
        </div>
        <div className="addDoctorForm__column">
          <label>Jméno:</label>
          <input type="text" className="addDoctorForm__input" required />
        </div>
        <div className="addDoctorForm__column">
          <label>Adresa:</label>
          <input type="text" className="addDoctorForm__input" required />
        </div>
        <div className="addDoctorForm__column">
          <label>Telefon:</label>
          <input type="tel" className="addDoctorForm__input" />
        </div>
        <div className="addDoctorForm__column">
          <label>E-mail:</label>
          <input type="email" className="addDoctorForm__input" />
        </div>
        <div className="addDoctorForm__column">
          <label>Pravidelnost prohlídek:</label>
          <input type="text" className="addDoctorForm__input" required />
        </div>
        <div className="addDoctorForm__buttons">
          <input
            type="submit"
            className="addDoctorForm__buttons"
            value="Přidat doktora"
          />
          <Link to="/">
            <button className="onClick__style">Zpátky na hlavní stránku</button>
          </Link>
        </div>
      </form>
    </>
  );
};
