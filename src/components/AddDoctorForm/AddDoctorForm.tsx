import { useState } from 'react';
import { Link } from 'react-router';
import { AutoComplete } from 'primereact/autocomplete';
import { specialityList } from '../../data/specialityList';
import { db } from '../../db/db';
import './style.css';

export const AddDoctorForm = () => {
  const [suggestDocSpec, setSuggestDocSpec] = useState<string[]>([]);
  /*
  id: number;
  speciality: string;
  name: string;
  address: string;
  addressDetail: string;
  phone: string;
  email: string;
  frequency: string;*/

  const [speciality, setSpeciality] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState('');
  const [status, setStatus] = useState('');

  const addDoctor = async () => {
    try {
      const id = await db.doctors.add({
        speciality,
        name,
        address,
        addressDetail,
        phone,
        email,
        frequency,
      });

      setStatus(
        `Doctor ${name ? name : speciality} successfully added. Got id ${id}`,
      );
      setSpeciality('');
      setName('');
      setAddress('');
      setAddressDetail('');
      setPhone('');
      setEmail('');
      setFrequency('');
    } catch (error) {
      setStatus(`Failed to add ${name ? name : speciality}: ${error}`);
    }
  };

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
            value={speciality}
            suggestions={suggestDocSpec}
            completeMethod={searchSpeciality}
            onChange={(e) => {
              setSpeciality(e.value);
            }}
            required
          />
        </div>
        <div className="addDoctorForm__column">
          <label htmlFor="docName">Jméno:</label>
          <input
            id="docName"
            type="text"
            className="addDoctorForm__input"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="addDoctorForm__column">
          <label htmlFor="docAddress">Adresa:</label>
          <input
            id="docAddress"
            type="text"
            className="addDoctorForm__input"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="addDoctorForm__column">
          <label htmlFor="docAddressDetail">Detail adresy:</label>
          <input
            id="docAddressDetail"
            type="text"
            className="addDoctorForm__input"
            onChange={(e) => setAddressDetail(e.target.value)}
          />
        </div>
        <div className="addDoctorForm__column">
          <label htmlFor="docPhone">Telefon:</label>
          <input
            id="docPhone"
            type="tel"
            className="addDoctorForm__input"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="addDoctorForm__column">
          <label htmlFor="docEmail">E-mail:</label>
          <input
            id="docEmail"
            type="email"
            className="addDoctorForm__input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="addDoctorForm__column">
          <label htmlFor="docFrequency">Pravidelnost prohlídek:</label>
          <input
            id="docFrequency"
            type="text"
            className="addDoctorForm__input"
            onChange={(e) => setFrequency(e.target.value)}
          />
        </div>
        <div className="addDoctorForm__buttons ">
          <input
            type="submit"
            className="onClick__style button button--primary"
            value="Přidat doktora"
            onClick={() => {
              addDoctor;
              console.log(status);
            }}
          />
          <Link to="/" className="onClick__style button">
            Domů
          </Link>
        </div>
      </form>
    </>
  );
};
