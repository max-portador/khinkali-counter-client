import React, {ChangeEvent, FC, useState} from 'react';
import {Field, Form, Formik} from "formik";
import {serverURL} from "../../api/baseApi";
import {Dialog, Grid, LinearProgress, Stack, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import DropArea from "../DropArea";
import {CancelButton, SaveButton, StyledCard} from "../common/styled";
import {IEvent} from "../../types/event";
import {useActions} from "../../hooks/useActions";
import {Box} from "@mui/system";
import {Notification} from "../Notification";

const EditDialog:FC<PropsType> = ({event, isOpen, setIsOpen}) => {

    const {updateEvent} = useActions();
    const [isUpdating, setIsUpdating] = useState(false)
    const [alertIsOpen, setAlertIsOpen] = React.useState(false);

    const formats = {
        normalDate: "dd.MM.yyyy",
        keyboardDate: "dd.MM.yyyy",
    };

    const submitHandler = async (values: FormValues) => {
        let formData = createFormData(values)

        setIsUpdating(true)
        await updateEvent({formData})
        setIsUpdating(false)
        setIsOpen(false)
        setAlertIsOpen(true)
    }

    const createFormData = (values: FormValues): FormData => {
        const {date, amount, image} = values
        let formData = new FormData();

        formData.append('_id', event._id)
        formData.append('date', date);
        formData.append('amount', String(amount));
        if (typeof image !== 'string'){
            formData.append('image', image)
        }

        return  formData
    }


    return (
        <>
            <Dialog maxWidth='xl' open={isOpen} onClose={() => setIsOpen(false)}>
                <Formik initialValues={{
                    date: event.date,
                    amount: event.amount,
                    image: `${serverURL}/${event.imageName}`,
                }}
                        onSubmit={submitHandler}
                >
                    {({values, setFieldValue}) => (
                        <Form>
                            <StyledCard>
                                <Stack padding={1} justifyContent={'center'} width={600}>
                                    <Grid container height={80}
                                          justifyContent={'center'}
                                          alignItems={'center'} >
                                        <LocalizationProvider dateAdapter={AdapterDateFns}
                                                              dateFormats={formats}>
                                            <Field name='date' id='date'
                                                   label='Дата'
                                                   min={1}
                                                   value={values.date}
                                                   component={DatePicker}
                                                   onChange={(val) => {
                                                       setFieldValue('date', val)
                                                   }}

                                                   renderInput={(params) => <TextField
                                                       variant="filled" {...params}/>}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid container height={80}
                                          justifyContent={'center'}
                                          alignItems={'center'}
                                    >
                                        <Field name='amount' id='amount'
                                               label='Количество хинкалей'
                                               component={TextField}
                                               noWrap={true}
                                               variant="filled"
                                               sx={{width: 227}}
                                               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                   let val = Number(e.target.value)
                                                   setFieldValue('amount', val < event.minAmount ? event.minAmount : val)
                                               }}
                                               value={values.amount}
                                               type={'number'}

                                        />
                                    </Grid>
                                    <Stack direction="row" spacing={1} mt={4} ml={2} justifyContent={'center'}>
                                        <SaveButton type='submit'>
                                            Сохранить
                                        </SaveButton>
                                        <CancelButton onClick={() => { setIsOpen(false) }} >
                                            Отмена
                                        </CancelButton>
                                    </Stack>
                                    <Grid container
                                          position={'relative'}
                                          bottom={'-10px'}
                                          justifyContent={'center'}
                                    >
                                        <Box sx={{ width: '90%', height: 10 }}>
                                            { isUpdating &&
                                                <LinearProgress />
                                            }
                                        </Box>
                                    </Grid>
                                </Stack>

                                <Grid container mt={2} mb={2}>
                                    <Field picture={values.image}
                                           id='image' name='image'
                                           text='Кликните на зону или перетащите изображение сюда'
                                           minHeight='300px'
                                           component={DropArea}
                                           setPicture={(file: Blob) => {
                                               setFieldValue('image', file)
                                           }}/>
                                </Grid>
                            </StyledCard>
                        </Form>
                    )
                    }
                </Formik>
            </Dialog>
            {alertIsOpen && <Notification setAlertIsOpen={setAlertIsOpen}/> }
        </>

    );
};

export default EditDialog;

type PropsType = {
    isOpen: boolean,
    setIsOpen: Function,
    event: IEvent & {minAmount: number},
}

type FormValues = {
    date: string,
    amount: number,
    image: string | Blob
}
