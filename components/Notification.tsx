import React, {FC, useEffect, useState} from "react";
import {Alert, Slide, SlideProps, Snackbar} from "@mui/material";
import {useTypedSelectors} from "../hooks/useTypedSelectors";
import {useActions} from "../hooks/useActions";


export const Notification: FC<NotificationProps> = ({setAlertIsOpen}) => {
    const [alertProps, setAlertProps]
        = useState<AlertPropsType>({severity: AlertSeverity.SUCCESS, message: AlertMessage.SUCCESS})

    const {isAuth, errors} = useTypedSelectors(state => ({
        isAuth: state.auth.isAuth,
        errors: state.event.errors
    }))

    const {clearErrors} = useActions();

    useEffect(() => {
        if (!isAuth) {
            setAlertProps({
                severity: AlertSeverity.ERROR,
                message: AlertMessage.Unauthorized
            })

        }
        else if(errors.length === 0) {
            setAlertProps({
                severity: AlertSeverity.SUCCESS,
                message: AlertMessage.SUCCESS
            })
        } else {
            setAlertProps({
                severity: AlertSeverity.ERROR,
                message: AlertMessage.ERROR
            })
        }
        clearErrors()
    }, [])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertIsOpen(false);
    };


    return <>
        <Snackbar anchorOrigin={{vertical:'top', horizontal: 'right'}}
                  TransitionComponent={TransitionUp}
                  open={true}
                  autoHideDuration={6000}
                  onClose={handleClose}>
                    <Alert severity={alertProps.severity}
                    sx={{
                        width: '100%',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        marginTop: "3vh",
                        borderColor: alertProps.severity === AlertSeverity.SUCCESS ? 'darkgreen' : 'darkred'
                    }}
                    >
                        {alertProps.message}
                    </Alert>
        </Snackbar>
    </>
}


type NotificationProps = {
    setAlertIsOpen: Function,
}

type AlertPropsType = {
    severity: AlertSeverity
    message: AlertMessage
}

enum AlertSeverity {
    'SUCCESS' = "success",
    'ERROR' = "error"
}

enum AlertMessage {
    'SUCCESS' = "Событие успешно сохранено",
    'ERROR' = "Произошла ошибка во время сохранения события",
    'Unauthorized' = "Для данного действия требуется авторизация"
}


function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up"/>;
}

type TransitionProps = Omit<SlideProps, 'direction'>;