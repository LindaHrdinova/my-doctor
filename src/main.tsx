import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { AddDoctorPage } from './pages/AddDoctorPage/AddDoctorPage.tsx';
import { DoctorList } from './components/DoctorList/DoctorList.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <DoctorList />,
      },
      {
        path: '/addDoctor',
        element: <AddDoctorPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
