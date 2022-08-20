import {IEvent, ModifiedEvent} from "../../../types/event";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createEvent, deleteEvent, fetchEvents, updateEvent} from "./actionCreators";
import {preparedEvents} from "../../../utils/events";

const initialState = {
    events: [] as ModifiedEvent[],
    errors: [] as string[]
}

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEvents: (state, action: PayloadAction<ModifiedEvent[]>) => {
            state.events = action.payload
        },

        clearErrors: (state) => {
            state.errors = []
        }
    },
    extraReducers: {
        [fetchEvents.fulfilled.type]: (state, action: PayloadAction<ModifiedEvent[]>) => {
            state.events = action.payload
        },

        [createEvent.fulfilled.type]: (state, action: PayloadAction<IEvent>) => {
            state.events = preparedEvents([...state.events, action.payload])
        },

        [createEvent.rejected.type]: (state, action: PayloadAction<string>) => {
            state.errors = [action.payload]
        },

        [updateEvent.fulfilled.type]: (state, action: PayloadAction<IEvent>) => {
            let updatedEvent = action.payload
            const filteredEvents = state.events.filter(event => event._id !== updatedEvent._id)
            state.events = preparedEvents([...filteredEvents, updatedEvent])
        },

        [updateEvent.rejected.type]: (state, action: PayloadAction<string>) => {
            state.errors = [action.payload]
        },

        [deleteEvent.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.events = state.events.filter(event => event._id !== action.payload)
        },

    }
})

export default eventsSlice.reducer
export type EventsStateType = typeof initialState
