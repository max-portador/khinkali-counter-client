import React, {useState} from 'react';
import MainLayout from "../../layout/MainLayout";
import {Button, Stack} from "@mui/material";
import styled from "styled-components";
import DropArea from "../../components/DropArea";
import {Notification} from "../../components/Notification";
import {useActions} from "../../hooks/useActions";
import {createFileFromURL} from "../../utils/helpers";
import FormTop from "../../components/CreateEvent/FormTop";
import {useTypedSelectors} from "../../hooks/useTypedSelectors";

const CreateEvent = () => {

    const [isPosting, setIsPosting] = useState(false);
    const {createEvent} = useActions();
    const {isAuth} = useTypedSelectors(state => state.auth)

    const [eventDate, setEventDate] = useState<Date>(new Date());
    const [amount, setAmount] = useState<number>(1)
    const [picture, setPicture] = useState<Blob | null>(null)

    const [alertIsOpen, setAlertIsOpen] = React.useState(false);

    const createFormData = async (): Promise<FormData> => {
        const formData = new FormData()
        formData.append('amount', String(amount))
        formData.append('date', String(eventDate))

        if (typeof picture === "string"){
            let file = await createFileFromURL(picture)
            formData.append('image', file)
        }
        else {
            formData.append('image', picture)
        }

        return formData;
    };

    const onSubmit = async () => {
        const formData = await createFormData();
        setIsPosting(true)

        await createEvent({formData})

        if (isAuth) {
            setPicture(null)
        }

        setIsPosting(false)
        setAlertIsOpen(true)
    }

    return (
        <MainLayout>
            <Form direction={"column"} spacing={2}>
                <FormTop amount={amount}
                         setAmount={setAmount}
                         eventDate={eventDate}
                         setEventDate={setEventDate}
                         setPicture={setPicture}
                />
                <DropArea picture={picture} setPicture={setPicture}/>
                <SubmitButton disabled={!picture && !isPosting} onClick={onSubmit}>Отправить</SubmitButton>
                {alertIsOpen && <Notification setAlertIsOpen={setAlertIsOpen}/> }
            </Form>
        </MainLayout>
    );
};

export default CreateEvent;

const Form = styled(Stack)`
  width: 60vw;
  padding: 20px;
  border: 1px solid steelblue;
  border-radius: 10px;
  
`

export const CenteredStack = styled(Stack)`
  display: flex;
  align-content: center;
  justify-content: center;
  text-align: center;
`

const SubmitButton = styled((props) => <Button variant={"contained"} {...props}/>)`
  width: 30%;
  align-self: center;

`


