import { Temporal } from '@js-temporal/polyfill';

export const humanDate = (dateString: string) => {
  //magic that transform string to Temporal.date
  const date = Temporal.PlainDate.from(dateString);
  const weekday = date.toLocaleString('cs-CZ', {
    weekday: 'long',
  });
  const formattedDate = `${weekday} ${date.day}.${date.month}.${date.year}`;

  return formattedDate;
};
