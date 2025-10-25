import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { AddDoctorPage } from './pages/AddDoctorPage/AddDoctorPage.tsx';
import { DoctorList } from './pages/DoctorListPage/DoctorListPage.tsx';
import { HomePage } from './pages/HomePage/HomePage.tsx';
import { AppointmentList } from './pages/AppointmentListPage/AppointmentListPage.tsx';
import { AddAppointmentPage } from './pages/AddAppointmentPage/AddAppointmentPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/doctors',
        element: <DoctorList />,
      },
      {
        path: '/new-doctor',
        element: <AddDoctorPage />,
      },
      {
        path: '/appointments',
        element: <AppointmentList />,
      },
      {
        path: '/new-appointment',
        element: <AddAppointmentPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
