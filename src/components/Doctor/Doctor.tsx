import './style.css';
import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoMdArrowDropup } from 'react-icons/io';

interface doctorDataProp {
  speciality: string;
  name: string;
  address: string;
  addressDetail: string;
  phone: string;
  email: string;
  frequency: string;
}

export const Doctor: React.FC<doctorDataProp> = ({
  speciality,
  name,
  address,
  addressDetail,
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
        {address ? (
          <li>
            <strong>Adresa:</strong> {address}
          </li>
        ) : null}
        {addressDetail ? (
          <li>
            <strong>Poznámka k adrese:</strong> {addressDetail}
          </li>
        ) : null}
        {phone ? (
          <li>
            <strong>Telefon:</strong> <a href={`tel:${phone}`}>{phone}</a>
          </li>
        ) : null}
        {email ? (
          <li>
            <strong>E-mail:</strong> <a href={`mailto:${email}`}>{email}</a>
          </li>
        ) : null}
        {frequency ? (
          <li>
            <strong>Pravidelnost prohlídek:</strong> {frequency}
          </li>
        ) : null}
      </ul>
    </div>
  );
};
