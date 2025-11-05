import './style.css';
import { db } from '../../db/db';

interface switchProp {
  id: number;
  current: boolean;
}

export const Switcher: React.FC<switchProp> = ({ id, current }) => {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={current}
        onChange={async (e) => {
          await db.doctors.update(id, { current: e.target.checked });
        }}
      />
      <span className="slider"></span>
    </label>
  );
};
