type appointmentReminder = { value: string; textCs: string };

export const appointmentReminderList: appointmentReminder[] = [
  { value: '', textCs: 'Vyberte možnost' },
  { value: '1week', textCs: '1 týden předem' },
  { value: '2weeks', textCs: '2 týdny předem' },
  { value: '3weeks', textCs: '3 týdny předem' },
  { value: '1month', textCs: '1 měsíc předem' },
  { value: '2months', textCs: '2 měsíce předem' },
  { value: '4months', textCs: '3 měsíce předem' },
  { value: 'other', textCs: 'jiné' },
  { value: 'no', textCs: 'nepřipomínat' },
];
