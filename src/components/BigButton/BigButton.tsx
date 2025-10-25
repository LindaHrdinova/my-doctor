import './style.css';
import { Link } from 'react-router';

interface bigButtonProp {
  textButton: string;
  urlButton: string;
  primaryButton: boolean;
}

export const BigButton: React.FC<bigButtonProp> = ({
  textButton,
  urlButton,
  primaryButton,
}) => {
  return (
    <Link to={`../${urlButton}`}>
      <button
        className={`bigButton ${
          primaryButton ? ' bigButton--primary' : null
        } onClick__style`}
      >
        {textButton}
      </button>
    </Link>
  );
};
