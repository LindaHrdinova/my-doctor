import './App.css';
import { Outlet } from 'react-router';

const App = () => {
  return (
    <>
      <h1>Můj doctor</h1>
      <Outlet />
    </>
  );
};

export default App;
