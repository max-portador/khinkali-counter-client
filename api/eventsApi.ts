import {IEvent, ModifiedEvent} from "../types/event";
import {fetcher, instance} from "./baseApi";
import {fetcherSSR} from "./fetcherSSR";
import {RequestFunc, StatusCode} from "../types/req_res";
import {preparedEvents} from "../utils/events";

export const eventsAPI = {
    fetchEventsSSR: async (req, res): Promise<ModifiedEvent[]> => {
        let [errors, events] = await fetcherSSR.get<IEvent[]>(req, res, 'events')
        if (!errors && events) {
            return preparedEvents(events)
        } else {
            throw errors
        }
    },

    fetchEvents: async (): Promise<ModifiedEvent[]> => {
        const request: RequestFunc = () => instance.get('events')
        let [errors, events] = await fetcher<IEvent[]>(request)

        if (!errors && events) {
            return preparedEvents(events)
        } else {
            throw errors
        }
    },

    create: async (formData: FormData): Promise<IEvent> => {
        const request: RequestFunc = () => instance.post<IEvent>('/events', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })

        const [errors, event] = await fetcher<IEvent>(request)


        if (!errors && event) {
            return event
        } else {
            throw errors
        }
    },

    update: async (formData: FormData): Promise<IEvent> => {
        const request: RequestFunc = () => instance.put<IEvent>('/events', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })

        const [errors, event] = await fetcher<IEvent>(request)

        if (!errors && event) {
            return event
        } else {
            throw errors
        }
    },

    delete: async (id: string): Promise<StatusCode> => {
        const request: RequestFunc = () => instance.delete<string>(`/events/${id}`)
        const [errors, removed_id] = await fetcher<string>(request)


        if (!errors && removed_id) {
            return StatusCode.OK
        } else {
            throw errors
        }
    }
}