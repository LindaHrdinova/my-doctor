import './style.css';

const appointmentList = [
  { date: '3.11.2025', time: '8:00', doctor: 'Rehabilitace' },
  { date: '3.11.2025', time: '16:30', doctor: 'Rentgen' },
  { date: '27.1.2026', time: '9:00', doctor: 'Endokrinologie' },
];

export const NextAppointment: React.FC = () => {
  return (
    <div className="nextAppointment">
      Tady budou nejbližší termíny.
      {appointmentList.map((app, id) => {
        return (
          <div key={id}>
            <h3>{app.date}</h3>
            <p>
              {app.time} {app.doctor}
            </p>
          </div>
        );
      })}
    </div>
  );
};
