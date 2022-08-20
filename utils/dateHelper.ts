import {IEvent} from "../types/event";

export const CardOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
} as const;

export const EditOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
} as const;

export const formatDate = (date: string, options:  Intl.DateTimeFormatOptions) =>
    new Date(date).toLocaleString("ru", options)


export const sortEventByDate = (a: IEvent, b: IEvent) => - Number(new Date(a.date)) + Number(new Date(b.date))

export const daysDiff = (first: string, second: string): number => {

    const ms = new Date(second).getTime() - new Date(first).getTime()
    let days = Math.ceil(ms / (3600 * 24 * 1000))
    return days
}

