import { appointmentReminderList } from '../data/appointmentReminder';

export const appointmentTextReminder = (appReminderValue: string) => {
  return (
    appointmentReminderList.find((appRem) => appRem.value === appReminderValue)
      ?.textCs ?? appReminderValue
  );
};
