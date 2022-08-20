import React, {FC} from 'react';
import {Grid} from "@mui/material";
import {CenteredStack} from "../../pages/events/create";
import EvenCard from "../EventsCard/EvenCard";
import {ModifiedEvent} from "../../types/event";

const EventsList: FC<Props> = ({events, eventsRendered}) => {
    return (
        <Grid container justifyContent='center'>
            <CenteredStack width={1200}>

                <Grid container justifyContent='center' p={4}>
                    <h1>Список событий</h1>
                </Grid>

                <CenteredStack direction='column' gap={3}>
                    {
                        events.length && events.filter((_, i) => i < eventsRendered)
                            .map(event => <EvenCard key={event._id} event={event}/>)
                    }
                </CenteredStack>

            </CenteredStack>
        </Grid>
    );
};

type Props = {
    events: ModifiedEvent[],
    eventsRendered: number
}


export default EventsList;