import React, {FC, useState} from 'react';
import Timeline from "./TimeLine/Timeline";
import ImageGallery from "./ImageGallery";
import {useTypedSelectors} from "../hooks/useTypedSelectors";
import {Stack} from "@mui/material";


const HomePage: FC = () => {
    const {events} = useTypedSelectors(state => state.event)
    const modifiedEvents = [...events].reverse()

    const [[activeEvent, direction], setEvent] = useState<[number, number]>([0, 0])

    const paginate = (newDirection: number) => {
        setEvent([activeEvent + newDirection, newDirection]);
    }

    if (events.length === 0){
        return <>
            <h1>Пока здесь нет ни одного события</h1>
        </>
    }

    return <>
        <Stack width={1200}>
            <Timeline
                active={activeEvent}
                setActive={setEvent}
                events={modifiedEvents}
            />
            <ImageGallery
                active={activeEvent}
                direction={direction}
                events={modifiedEvents}
                paginate={paginate}
            />
        </Stack>
    </>
};

export default HomePage;
