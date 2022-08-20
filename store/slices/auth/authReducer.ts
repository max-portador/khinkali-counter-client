import {IUserDetail} from "../../../types/user";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getMe, login, logout} from "./actionCreators";

const initialState = {
    user: {
        name: null as string | null,
        id: null as string | null
    },
    isAuth: false,
    isLoading: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUserDetail>) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuth = true
        },

        clearUser: (state) => {
            state.isLoading = false;
            state.user = initialState.user
            state.isAuth = false
        }
    },

    extraReducers: {
        [login.fulfilled.type]: (state, action: PayloadAction<IUserDetail>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload
        },

        [login.pending.type]: (state) => {
            state.isLoading = true
        },

        [login.rejected.type]: (state) => {
            state.isLoading = false;
        },

        [logout.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.isAuth = false;
            state.user = initialState.user
        },

        [logout.pending.type]: (state) => {
            state.isLoading = true
        },

        [getMe.fulfilled.type]:(state, action: PayloadAction<IUserDetail>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload
        },


        [getMe.rejected.type]:(state) => {
            state.isLoading = false;
            state.isAuth = false;
            state.user = initialState.user
        },

    }
})


export type AuthStateType = typeof initialState
export default authSlice.reducer
