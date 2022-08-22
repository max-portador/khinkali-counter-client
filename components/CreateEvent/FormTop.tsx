import React, {FC} from 'react';
import {Button, TextField} from "@mui/material";
import ImgUrlDialog from "../ImgURLDialog";
import StyledDatePicker from "../StyledDatePicker";
import {CenteredStack} from "../../pages/events/create";

const FormTop:FC<PropsType> = ({amount, setAmount, eventDate, setEventDate, setPicture}) => {

    const [isOpenURL, setIsOpenURL] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value)
        setAmount(val < 1 ? 1 : val)
    }

    return (
        <CenteredStack direction={'row'} spacing={3}>

            <TextField
                value={amount}
                type='number'
                onChange={handleChange}
                variant="outlined"
                label="Количество хинкали"
                color="primary"
            />

            <Button variant={'outlined'} onClick={()=> setIsOpenURL(true)}>
                Загрузить изображение по ссылке из Twitter
            </Button>
            <ImgUrlDialog isOpen={isOpenURL} setIsOpen={setIsOpenURL} setFile={setPicture}/>

            <StyledDatePicker eventDate={eventDate} setEventDate={setEventDate}/>
        </CenteredStack>
    );
};

type PropsType = {
    amount: number,
    setAmount:  React.Dispatch<React.SetStateAction<number>>,
    eventDate: Date,
    setEventDate: React.Dispatch<React.SetStateAction<Date>>,
    setPicture: React.Dispatch<React.SetStateAction<Blob>>
}


export default FormTop;