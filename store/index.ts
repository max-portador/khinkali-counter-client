import {AnyAction, combineReducers, Dispatch, Store} from "redux";
import {Context, createWrapper, HYDRATE} from "next-redux-wrapper";
import {ThunkDispatch} from "redux-thunk";
import eventsReducer from "./slices/events/eventsReducer";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authReducer";
import actionsCreators from "../types/actionsCreators";


export const rootReducer = combineReducers( {
    event: eventsReducer,
    auth: authReducer,
})

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        if (state.count) nextState.count = state.count; // preserve count value on client side navigation
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};

// create a makeStore function
const makeStore = (context: Context) => configureStore({ reducer })

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, {
    debug: true,
    serializeState: (state) => JSON.stringify(state),
    deserializeState: (state) => JSON.parse(state),
});

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = Dispatch<AllActions> & ThunkDispatch<RootState, void, AllActions>
export type InferActionsType<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never
export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>
export type AllActions = InferActionsType<typeof actionsCreators>