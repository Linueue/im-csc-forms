import { type CalendarDate, today, getLocalTimeZone } from "@internationalized/date";

export function getAge(birthdate: CalendarDate): number
{
    const localDate = today(getLocalTimeZone());
    const diff = localDate.subtract({years: birthdate.year, months: birthdate.month, days: birthdate.day});
    return diff.year;
}
