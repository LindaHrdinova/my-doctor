type doctorFrequency = { value: string; textCs: string };

export const doctorFrequencyList: doctorFrequency[] = [
  { value: '', textCs: 'Vyberte možnost' },
  { value: 'perYear24', textCs: '2x měsíčně' },
  { value: 'perYear12', textCs: '1x měsíčně' },
  { value: 'perYear4', textCs: '4x ročně' },
  { value: 'perYear2', textCs: '2x ročně' },
  { value: 'perYear1', textCs: '1x ročně' },
  { value: 'irregular', textCs: 'nepravidelná' },
  { value: 'other', textCs: 'jiné' },
];
