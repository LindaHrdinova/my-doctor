import './style.css';
import { Link } from 'react-router';

interface bigButtonProp {
  textButton: string;
  urlButton: string;
}

export const BigButton: React.FC<bigButtonProp> = ({
  textButton,
  urlButton,
}) => {
  return (
    <Link to={`./${urlButton}`}>
      <button className="bigButton onClick__style">{textButton}</button>
    </Link>
  );
};
