import { type CalendarDate, today, getLocalTimeZone } from "@internationalized/date";

export function getAge(birthdate: CalendarDate): number
{
    const localDate = today(getLocalTimeZone());
    let age = localDate.year - birthdate.year - 1;

    if(localDate.month >= birthdate.month && localDate.day >= birthdate.day)
        age++;

    return age;
}
