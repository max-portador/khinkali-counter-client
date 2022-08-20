import React, {FC, useEffect} from 'react';
import {AppProps} from 'next/app';
import {wrapper} from '../store'
import '../styles/global.css'
import {useTypedSelectors} from "../hooks/useTypedSelectors";
import {useActions} from "../hooks/useActions";


const WrappedApp: FC<AppProps> = ({Component, pageProps}) => {
    const {isAuth} = useTypedSelectors(state => state.auth)
    const {getMe} = useActions()

    useEffect(() => {
        if (!isAuth){
          getMe()
        }
    }, [])

    return  <Component {...pageProps}/>
}

export default wrapper.withRedux(WrappedApp)
