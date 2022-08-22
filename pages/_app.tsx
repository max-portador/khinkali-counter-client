import React, {Component} from 'react';
import {AppProps} from 'next/app';
import {NextThunkDispatch, wrapper} from '../store'
import '../styles/global.css'
import {authApi} from "../api/authApi";
import {authSlice} from "../store/slices/auth/authReducer";


function WrappedApp ({Component, pageProps}: AppProps) {
    return  <Component {...pageProps}/>
}

WrappedApp.getInitialProps = wrapper.getInitialAppProps(
    (store) => async ({Component, ctx}) => {

        const dispatch = store.dispatch as NextThunkDispatch
        const {req, res} = ctx

        try {
            if (!store.getState().auth.user?.name) {
                const user = await authApi.meSSR(req, res)
                dispatch(authSlice.actions.setUser(user))
            }
        } catch (getUserError) {
            console.log('Авторизированный пользователь отсутствует')
        }

        return {
                pageProps: {
                    ...Component.getInitialProps
                        ? await Component.getInitialProps({...ctx, store})
                        : {}
                },
            }
    })

export default wrapper.withRedux(WrappedApp)
