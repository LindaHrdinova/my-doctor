import { db } from '../../db/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Temporal } from '@js-temporal/polyfill';

export const useAppointmentsList = () => {
  const appointments = useLiveQuery(() =>
    db.appointments.orderBy('[date+time]').toArray(),
  );

  return appointments;
};

export const useAppointmentsFutureList = () => {
  const appointments = useAppointmentsList();
  const todayDate = Temporal.Now.plainDateISO();

  const futureAppointments = appointments?.filter(
    (app) =>
      Temporal.PlainDate.compare(
        Temporal.PlainDate.from(app.date),
        todayDate,
      ) >= 0,
  );

  return futureAppointments;
};

export const useAppointmentsPastList = () => {
  const appointments = useAppointmentsList();
  const todayDate = Temporal.Now.plainDateISO();

  const pastAppointments = appointments
    ?.filter(
      (app) =>
        Temporal.PlainDate.compare(
          Temporal.PlainDate.from(app.date),
          todayDate,
        ) < 0,
    )
    .reverse();

  return pastAppointments;
};
