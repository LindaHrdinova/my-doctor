import './style.css';
import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoMdArrowDropup } from 'react-icons/io';
import { Switcher } from '../Switcher/Switcher';

interface doctorDataProp {
  id: number;
  speciality: string;
  name: string;
  address: string;
  addressDetail: string;
  phone: string;
  email: string;
  frequency: string;
  current: number;
}

export const Doctor: React.FC<doctorDataProp> = ({
  id,
  speciality,
  name,
  address,
  addressDetail,
  phone,
  email,
  frequency,
  current,
}) => {
  const [detailHidden, setDetailHidden] = useState<boolean>(true);
  return (
    <div className={current === 0 ? 'doctor' : 'doctor doctor--inactive'}>
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
        {name ? (
          <li>
            <strong>Jméno: </strong> {name}
          </li>
        ) : null}
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
        <li>
          <Switcher current={current} id={id} />
        </li>
      </ul>
    </div>
  );
};
