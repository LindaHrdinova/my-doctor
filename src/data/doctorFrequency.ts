type doctorFrequency = { value: string; textCs: string };

export const doctorFrequencyList: doctorFrequency[] = [
  { value: '', textCs: 'Vyberte možnost' },
  {
    value: JSON.stringify({ unit: 'weeks', amount: 2 }),
    textCs: 'každých 14 dní',
  },
  {
    value: JSON.stringify({ unit: 'months', amount: 1 }),
    textCs: '1x měsíčně',
  },
  {
    value: JSON.stringify({ unit: 'months', amount: 3 }),
    textCs: '4x ročně',
  },
  {
    value: JSON.stringify({ unit: 'months', amount: 4 }),
    textCs: '3x ročně',
  },
  {
    value: JSON.stringify({ unit: 'months', amount: 6 }),
    textCs: '2x ročně',
  },
  { value: JSON.stringify({ unit: 'years', amount: 1 }), textCs: '1x ročně' },
  { value: 'irregular', textCs: 'nepravidelná' },
  { value: 'other', textCs: 'jiné' },
];
