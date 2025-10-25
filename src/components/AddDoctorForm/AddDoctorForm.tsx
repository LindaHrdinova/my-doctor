import { useState } from 'react';
import { Link } from 'react-router';
import { AutoComplete } from 'primereact/autocomplete';
import { specialityList } from '../../data/specialityList';
import './style.css';

export const AddDoctorForm = () => {
  const [specialistValue, setSpecialistValue] = useState('');
  const [suggestDocSpec, setSuggestDocSpec] = useState<string[]>([]);

  const searchSpeciality = (e: { query: string }) => {
    const query = e.query.toLocaleLowerCase();

    const suggestion = specialityList.filter((specialist) =>
      specialist.toLowerCase().startsWith(query),
    );

    setSuggestDocSpec(suggestion);
  };

  return (
    <>
      <form className="addDoctorForm">
        <div className="addDoctorForm__column">
          <label htmlFor="docSpeciality">Specialista:</label>
          <AutoComplete
            inputId="docSpeciality"
            className="addDoctor__autoComplete"
            value={specialistValue}
            suggestions={suggestDocSpec}
            completeMethod={searchSpeciality}
            onChange={(e) => setSpecialistValue(e.value)}
            required
          />
        </div>
        <div className="addDoctorForm__column">
          <label>Jméno:</label>
          <input type="text" className="addDoctorForm__input" required />
        </div>
        <div className="addDoctorForm__column">
          <label>Adresa:</label>
          <input type="text" className="addDoctorForm__input" />
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
          <input type="text" className="addDoctorForm__input" />
        </div>
        <div className="addDoctorForm__buttons">
          <input
            type="submit"
            className="addDoctorForm__buttons onClick__style"
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
