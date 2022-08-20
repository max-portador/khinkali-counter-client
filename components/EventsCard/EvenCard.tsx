import React, {FC, useState} from 'react';
import {ModifiedEvent} from "../../types/event";
import {Button, Grid, Stack, Typography} from "@mui/material";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import {serverURL} from "../../api/baseApi";
import {CardOptions, formatDate} from "../../utils/dateHelper";
import {DeleteButton, StyledCard, StyledImage} from "../common/styled";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

const days_label = (days_amount: number) => {

    let num = days_amount % 10
    let label = ' дней'
    if (num === 1) label = ' день'
    if (num >= 2 && num <= 4) label = ' дня'
    return  days_amount + label
}

const EvenCard: FC<PropsType> = ({event}) => {

    const [isEditMode, setEditMode] = useState<boolean>(false)
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)

    return (
        <Grid container justifyContent={'center'}>
            <EditDialog event={event} isOpen={isEditMode} setIsOpen={setEditMode}/>
            <DeleteDialog isOpen={isDeleteDialogOpen} setIsOpen={setDeleteDialogOpen} event={event}/>
            <StyledCard>
                <Stack padding={1} justifyContent={'center'} width={370}>

                    <Grid container pl={2} height={80} justifyContent={'center'}>
                        <Typography variant={'h4'} sx={{display: 'flex', alignItems: 'center'}}>
                            {formatDate(event.date, CardOptions)}
                        </Typography>
                    </Grid>

                    <Grid container pl={2} height={80} justifyContent={'center'}>
                        <Typography variant='h4' color={'steelblue'} noWrap={true}>
                            {`${event.amount} хинкали`}
                        </Typography>
                    </Grid>
                    {!!event.daysFromPrev &&
                        <Stack>
                            <div>{'Предыдущий был'}</div>
                            <div>{days_label(event.daysFromPrev)} назад</div>
                        </Stack>
                    }

                    <Stack direction="row" spacing={1} mt={4} ml={2} justifyContent={'center'}>

                        <Button variant="outlined"
                                endIcon={<ModeEditOutlinedIcon/>}
                                onClick={() => setEditMode(true)}>
                            Изменить
                        </Button>

                        <DeleteButton onClick={() => {
                            setDeleteDialogOpen(true)
                        }}>
                            Удалить
                        </DeleteButton>

                    </Stack>
                </Stack>
                <StyledImage src={`${serverURL}/${event.imageName}`}/>
            </StyledCard>
        </Grid>
    );
};

export default EvenCard;


type PropsType = {
    event: ModifiedEvent
}
