import {IEvent, ModifiedEvent} from "../types/event";
import {daysDiff, sortEventByDate} from "./dateHelper";

export const addMinAmount = (acc: AccType, event: IEvent, i: number, arr: IEvent[] | ModifiedEvent[]): AccType => {
    let daysFromPrev = 0
    if (i < arr.length - 1){
        daysFromPrev = daysDiff( arr[i + 1].date, event.date)
    }
    let modifiedEvent = {...event, minAmount: acc.minAmount, daysFromPrev}
    acc.minAmount = event.amount + 1;
    acc.events.push(modifiedEvent)
    return acc
}

export const preparedEvents = (events: IEvent[]): ModifiedEvent[] => {
    if (events.length === 0) return []

    return events
        .sort(sortEventByDate)
        .reduce(addMinAmount, {minAmount: 1, events: []})
        .events
}


type AccType = {
    minAmount: number,
    events: ModifiedEvent[]
}