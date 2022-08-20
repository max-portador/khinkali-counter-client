import {eventsSlice} from "../store/slices/events/eventsReducer";
import {authSlice} from "../store/slices/auth/authReducer";

export default {...eventsSlice.actions, ...authSlice.actions}