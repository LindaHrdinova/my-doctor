export const dbDoctorText = (docFrequencyValue: string) => {
  switch (docFrequencyValue) {
    case 'perYear4':
      docFrequencyValue = '4x ročně';
      break;
    case 'perYear2':
      docFrequencyValue = '2x ročně';
      break;
    case 'perYear1':
      docFrequencyValue = '1x ročně';
      break;
    case 'irregular':
      docFrequencyValue = 'nepravidelná';
      break;
    case 'other':
      docFrequencyValue = 'jiné';
      break;
  }
  return docFrequencyValue;
};
