import {AnyAction, combineReducers} from "redux";
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import {ThunkDispatch} from "redux-thunk";
import eventsReducer from "./slices/events/eventsReducer";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authReducer";


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
const makeStore = () => configureStore({ reducer })
export const store = makeStore()



export type RootStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<RootStore['getState']>
export type AppDispatch = typeof store.dispatch
export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>

// export an assembled wrapper
export const wrapper = createWrapper<RootStore>(makeStore, {
    debug: true,
    // serializeState: (state) => JSON.stringify(state),
    // deserializeState: (state) => JSON.parse(state),
});


// export type InferActionsType<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never
// export type AllActions = InferActionsType<typeof actionsCreators>
