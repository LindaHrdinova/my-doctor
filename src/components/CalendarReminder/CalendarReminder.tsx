import type React from 'react';
import { SiGooglecalendar } from 'react-icons/si';
import { Temporal } from '@js-temporal/polyfill';
import { google } from 'calendar-link';

interface calendarReminder {
  speciality?: string;
  name?: string;
  address?: string;
  date: string;
  time: string;
}

export const CalendarReminder: React.FC<calendarReminder> = ({
  speciality,
  name,
  address,
  date,
  time,
}) => {
  const timeEnd: string | null = time
    ? Temporal.PlainTime.from(time).add({ hours: 1 }).toString()
    : null;

  const timeStart = time ? time + ':00' : null;

  const baseEvent = {
    title: speciality ?? `Kontrola ${speciality}`,
    description: `Kontrola u doktora ${name ?? ''}`,
  };

  const plain = Temporal.PlainDate.from(date);

  const formatForGoogle = (d: Temporal.PlainDate) =>
    d.toString().replaceAll('-', '');

  const event = {
    ...baseEvent,
    ...(time
      ? {
          start: `${date}T${timeStart}`,
          end: `${date}T${timeEnd}`,
        }
      : {
          start: formatForGoogle(plain.add({ days: 1 })),
          end: formatForGoogle(
            plain.add({ days: 2 }),
          ) /* allDay needs end a day later*/,
          allDay: true,
        }),
    ...(address && { location: address }),
  };

  const googleUrl = google(event);

  return (
    <>
      <a href={googleUrl} target="_blank">
        <SiGooglecalendar className="doctor__icon" />
      </a>
    </>
  );
};
