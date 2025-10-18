import './App.css';
import { DoctorList } from './components/DoctorList/DoctorList';
import { AddDoctorPage } from './pages/AddDoctorPage/AddDoctorPage';
const App = () => {
  return (
    <>
      <h1>Můj doctor</h1>
      <DoctorList />
    </>
  );
};

export default App;
