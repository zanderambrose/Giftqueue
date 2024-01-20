import date from "date-and-time";

const currentYear = new Date().getFullYear();

export const formatCurrentYearDate = (date: string) => {
    return date.replace(/^.{4}/g, String(currentYear));
}

export const howMuchTimeUntil = (stringDate: string) => {
    const currentYearDate = formatCurrentYearDate(stringDate)
    const dateOfCelebration = new Date(currentYearDate);
    const timeInDays = date.subtract(dateOfCelebration, new Date()).toDays();
    return Math.ceil(timeInDays);
};

export const formatDateSending = (inputDate: Date) => {
    const formatDate = date.format(inputDate, "YYYY/MM/DD");
    return formatDate.replaceAll("/", "-");
};
