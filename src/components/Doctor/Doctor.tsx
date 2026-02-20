import './style.css';
import { useState } from 'react';
import { Switcher } from '../Switcher/Switcher';
import { dbDoctorText } from '../../text/dbDoctorText';
import { Link } from 'react-router';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoMdArrowDropup } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';

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
          detailHidden
            ? 'animation__data animation__data--hidden'
            : 'animation__data '
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
            <strong>Pravidelnost prohlídek:</strong> {dbDoctorText(frequency)}
          </li>
        ) : null}
        <li>Budoucí termín</li>
        <li>Minulý termín</li>
        <li>
          <span className="doctor__menu">
            <Switcher current={current} id={id} />{' '}
            <Link to={`/doctors/${id}`}>
              <MdEdit
                className={
                  current === 0
                    ? 'doctor__icon'
                    : 'doctor__icon doctor__icon--inactive'
                }
              />
            </Link>
          </span>
        </li>
      </ul>
    </div>
  );
};
