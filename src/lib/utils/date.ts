import { type CalendarDate, today, getLocalTimeZone, now, toCalendarDateTime } from "@internationalized/date";

export function getToday()
{
    return today(getLocalTimeZone());
}

export function getCurrentTime()
{
    const date = now(getLocalTimeZone());
    const time = toCalendarDateTime(date);
    return time.toDate(getLocalTimeZone()).toLocaleTimeString("en-GB");
}

export function getAge(birthdate: CalendarDate): number
{
    const localDate = today(getLocalTimeZone());
    let age = localDate.year - birthdate.year - 1;

    if(localDate.month >= birthdate.month && localDate.day >= birthdate.day)
        age++;

    return age;
}

export function formatDate(date: CalendarDate | Date | string | null)
{
    if(date === null || date === undefined)
        return "";

    let dateConverted: Date;

    if(date instanceof Date)
        dateConverted = date;
    else if(typeof date === "string")
        dateConverted = new Date(date);
    else
        dateConverted = date.toDate(getLocalTimeZone());

    const formatted = Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    }).format(dateConverted);

    return formatted;
}
