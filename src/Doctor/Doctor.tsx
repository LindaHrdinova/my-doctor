import './style.css';

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
  return (
    <div className="doctor">
      <h3 className="doctor__title">{speciality}</h3>
      <ul className="doctor__data">
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
