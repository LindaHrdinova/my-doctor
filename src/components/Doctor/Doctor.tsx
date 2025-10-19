import './style.css';
import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoMdArrowDropup } from 'react-icons/io';

interface doctorDataProp {
  speciality: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  frequency: string;
}

export const Doctor: React.FC<doctorDataProp> = ({
  speciality,
  name,
  address,
  phone,
  email,
  frequency,
}) => {
  const [detailHidden, setDetailHidden] = useState<boolean>(true);
  return (
    <div className="doctor">
      <h3
        className="doctor__title onClick__style"
        onClick={() => setDetailHidden(!detailHidden)}
      >
        {speciality}
        <span>
          {detailHidden ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
        </span>
      </h3>

      <ul
        className={
          detailHidden ? 'doctor__data doctor__data--hidden' : 'doctor__data '
        }
      >
        <li>
          <strong>Jméno: </strong> {name}
        </li>
        <li>
          <strong>Ordinace:</strong> {address}
        </li>
        <li>
          <strong>Telefon:</strong> <a href={`tel:${phone}`}>{phone}</a>
        </li>
        <li>
          <strong>E-mail:</strong> <a href={`mailto:${email}`}>{email}</a>
        </li>
        <li>
          <strong>Pravidelnost prohlídek:</strong> {frequency}
        </li>
      </ul>
    </div>
  );
};
