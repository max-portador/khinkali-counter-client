import React from 'react';
import HomePage from "../components/HomePage";
import MainLayout from "../layout/MainLayout";
import {NextThunkDispatch, wrapper} from "../store";
import {eventsAPI} from "../api/eventsApi";
import {authSlice} from "../store/slices/auth/authReducer";
import {eventsSlice} from "../store/slices/events/eventsReducer";
import {authApi} from "../api/authApi";

const Index = () => {

    return <MainLayout marginLeft={0}>
        <HomePage/>
    </MainLayout>
}

export default Index


export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req, res}) => {

        const dispatch = store.dispatch as NextThunkDispatch

        try {
            let events = await eventsAPI.fetchEventsSSR(req, res)
            if (events?.length ) {
                dispatch(eventsSlice.actions.setEvents(events))
            }
        } catch (fetchEventError) {
            console.log(fetchEventError?.message)
        }

        try {
            if (!store.getState().auth.user?.name) {
                const user = await authApi.meSSR(req, res)
                dispatch(authSlice.actions.setUser(user))
            }
        } catch (getUserError) {
            console.log(getUserError?.message)
        }

        return null
    })