import { doctorFrequencyList } from '../data/doctorFrequency';

export const dbDoctorText = (docFrequencyValue: string) => {
  return (
    doctorFrequencyList.find(
      (frequency) => frequency.value === docFrequencyValue,
    )?.textCs ?? docFrequencyValue
  );
};
