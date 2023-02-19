import date from "date-and-time";

export const howMuchTimeUntil = (stringDate: string) => {
  const currentYearDate = stringDate?.replace(/^.{4}/g, "2023");
  const dateOfCelebration = new Date(currentYearDate);
  const timeInDays = date.subtract(dateOfCelebration, new Date()).toDays();
  return Math.round(timeInDays);
};
