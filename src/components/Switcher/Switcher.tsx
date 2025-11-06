import './style.css';
import { db } from '../../db/db';

interface switchProp {
  id: number;
  current: number;
}

export const Switcher: React.FC<switchProp> = ({ id, current }) => {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={current === 0 ? true : false}
        onChange={async (e) => {
          await db.doctors.update(id, { current: e.target.checked ? 0 : 1 });
          console.log(e.target.checked);
        }}
      />
      <span className="slider"></span>
    </label>
  );
};
