import {createAsyncThunk} from "@reduxjs/toolkit";
import {eventsAPI} from "../../../api/eventsApi";
import {StatusCode} from "../../../types/req_res";

export const fetchEvents = createAsyncThunk(
    'events/get',
    async (_, thunkAPI) => {
        try {
            return await eventsAPI.fetchEvents()
        } catch (e) {
            return thunkAPI.rejectWithValue('Не удалось получить события')
        }
    }
)

export const createEvent = createAsyncThunk(
    'events/create',
    async ({formData} : {formData: FormData}, thunkAPI) => {
        try {
            return await eventsAPI.create(formData)
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)


export const updateEvent = createAsyncThunk(
    'events/create',
    async ({formData} : {formData: FormData}, thunkAPI) => {
        try {
            return await eventsAPI.update(formData)
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const deleteEvent = createAsyncThunk(
    'events/delete',
    async ({id} : {id: string}, thunkAPI) => {
        try {
            let status = await eventsAPI.delete(id)
            if (status === StatusCode.OK){
                return id
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('Произошла ошибка при удалении события')
        }
    }
)