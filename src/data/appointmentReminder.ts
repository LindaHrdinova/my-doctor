type appointmentReminder = { value: string; textCs: string };

export const appointmentReminderList: appointmentReminder[] = [
  { value: '', textCs: 'Vyberte možnost' },
  {
    value: JSON.stringify({ unit: 'weeks', amount: 1 }),
    textCs: '1 týden předem',
  },
  {
    value: JSON.stringify({ unit: 'weeks', amount: 2 }),
    textCs: '2 týdny předem',
  },
  {
    value: JSON.stringify({ unit: 'weeks', amount: 3 }),
    textCs: '3 týdny předem',
  },
  {
    value: JSON.stringify({ unit: 'weeks', amount: 6 }),
    textCs: '6 týdnů předem',
  },
  {
    value: JSON.stringify({ unit: 'months', amount: 1 }),
    textCs: '1 měsíc předem',
  },
  {
    value: JSON.stringify({ unit: 'months', amount: 2 }),
    textCs: '2 měsíce předem',
  },
  {
    value: JSON.stringify({ unit: 'months', amount: 3 }),
    textCs: '3 měsíce předem',
  },
  { value: 'other', textCs: 'jiné' },
  { value: 'no', textCs: 'nepřipomínat' },
];
