import './App.css';
import { Outlet } from 'react-router';

const App = () => {
  return (
    <>
      <span className="title">
        <img src="/favicon.svg" className="title__logo" />
        <h1>Můj doctor</h1>
      </span>
      <Outlet />
    </>
  );
};

export default App;
