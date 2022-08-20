import {createAsyncThunk} from "@reduxjs/toolkit";
import {authApi} from "../../../api/authApi";
import {IUserDetail} from "../../../types/user";

export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}: { email: string; password: string; }, thunkAPI) => {
        try {
            return await authApi.login(email, password)
        } catch (e) {
            return thunkAPI.rejectWithValue('Не удалось авторизоваться в системе')
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async ({user}: { user: IUserDetail }, thunkAPI) => {
        try {
            return await authApi.logout(user)
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка во время выхода из акаунта')
        }
    }
)

export const getMe = createAsyncThunk(
    'auth/me',
    async (_, thunkAPI) => {
        try {
            return await authApi.me()
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка во время выхода из акаунта')
        }
    }
)