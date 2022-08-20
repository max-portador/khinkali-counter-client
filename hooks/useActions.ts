import {createEvent, deleteEvent, fetchEvents, updateEvent} from "../store/slices/events/actionCreators";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store";
import {bindActionCreators} from "redux";
import {getMe, login, logout} from "../store/slices/auth/actionCreators";
import {authSlice} from "../store/slices/auth/authReducer";
import {eventsSlice} from "../store/slices/events/eventsReducer";

const ActionCreators = {
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    ...eventsSlice.actions,
    login,
    logout,
    ...authSlice.actions,
    getMe,
}

export const useActions = () => {
    const dispatch = useDispatch<AppDispatch>()
    return bindActionCreators(ActionCreators, dispatch)
}