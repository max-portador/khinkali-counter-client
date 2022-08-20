import {Button} from '@mui/material';
import React, {ChangeEvent, useEffect, useState} from 'react';
import MainLayout from "../../layout/MainLayout";
import {useTypedSelectors} from "../../hooks/useTypedSelectors";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import styled from "styled-components";
import {useRouter} from "next/router";
import EventsList from "../../components/EventsList/EventsList";


const EventList = () => {
    const {events} = useTypedSelectors(state => state.event)
    const router = useRouter()

    const [eventsRendered, setEventsRendered] = useState(3)
    const [isFetching, setIsFetching] = useState(false)

    const scrollHandler = (e) => {
        const pageHeight = e.target.documentElement.scrollHeight;
        const scrollPosition = e.target.documentElement.scrollTop;
        if (pageHeight - 10 < scrollPosition + window.innerHeight) {
            setIsFetching(true)
        }
    }

    const clickButtonHandler = async (e: ChangeEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        await router.push('events/create')
    }

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    useEffect(() => {
        if (isFetching && eventsRendered <= events.length) {
            setEventsRendered((prev) => prev + 3)
            setIsFetching(false)
        }
    }, [isFetching])

    return (
        <MainLayout>
            <EventsList events={events} eventsRendered={eventsRendered}/>
            <AddButton onClick={clickButtonHandler}>
                Добавить событие
            </AddButton>
        </MainLayout>
    );
};

// export const getServerSideProps = wrapper.getServerSideProps(store => async ({req, res}) => {
//     const dispatch = store.dispatch as NextThunkDispatch
//
//     try {
//         if (store.getState().event.events.length === 0) {
//             let events = await eventsAPI.fetchEventsSSR(req, res)
//             if (events?.length) {
//                 dispatch(eventsSlice.actions.setEvents(events))
//             }
//         }
//     } catch (e) {
//         console.log(e?.message)
//     }
//     return null
// })

export default EventList;



const AddButton = styled((props) => <Button size='small' variant={'contained'}
                                            {...props} startIcon={<AddCircleIcon/>}/>)`
  position: fixed;
  right: 3em;
  bottom: 10%;
  line-height: 30px;
  border-radius: 10px;
`


