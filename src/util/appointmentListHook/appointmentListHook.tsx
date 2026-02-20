import { db } from '../../db/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Temporal } from '@js-temporal/polyfill';
import type { AppointmentDataProp } from '../../db/db';

export const useAppointmentsList = (): AppointmentDataProp[] | undefined => {
  const appointments = useLiveQuery<AppointmentDataProp[]>(() =>
    db.appointments.orderBy('[date+time]').toArray(),
  );

  return appointments;
};

export const useAppointmentsFutureList = ():
  | AppointmentDataProp[]
  | undefined => {
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

export const useAppointmentsPastList = ():
  | AppointmentDataProp[]
  | undefined => {
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
