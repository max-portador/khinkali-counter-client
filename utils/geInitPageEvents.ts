import {NextThunkDispatch, wrapper} from "../store";
import {eventsAPI} from "../api/eventsApi";
import {eventsSlice} from "../store/slices/events/eventsReducer";

export const fetchAndHydrateEvents = wrapper.getInitialPageProps(
    (store) => async ({req, res}) => {

        const dispatch = store.dispatch as NextThunkDispatch

        try {
            let events = await eventsAPI.fetchEventsSSR(req, res)
            if (events?.length ) {
                dispatch(eventsSlice.actions.setEvents(events))
            }
        } catch (fetchEventError) {
            console.log("Не удалось получить события")
        }

        return null
    })