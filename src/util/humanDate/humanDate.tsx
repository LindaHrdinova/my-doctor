import { Temporal } from '@js-temporal/polyfill';

export const humanDate = (dateString: string) => {
  //předělat do ts - ne nutné
  const date = Temporal.PlainDate.from(dateString);
  const weekday = date.toLocaleString('cs-CZ', {
    weekday: 'long',
  });
  const formattedDate = `${weekday} ${date.day}.${date.month}.${date.year}`;

  return formattedDate;
};
